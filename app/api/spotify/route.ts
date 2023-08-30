import { NextResponse } from 'next/server'
import { getNowPlaying } from '@/lib/spotify.server'
import type { SpotifyNowPlayingData } from '@/types/server'

export async function GET(req: Request) {
  const response = await getNowPlaying()
  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ isPlaying: false })
  }

  const data = await response.json()
  if (data?.currently_playing_type === 'episode') {
    return NextResponse.json({
      isPlaying: true,
      title: data.item.name,
      songUrl: data.item.external_urls.spotify,
    })
  }
  const songData: SpotifyNowPlayingData = {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists.map((art: { name: string }) => art.name).join(', '),
    album: data.item.album.name,
    albumImageUrl: data.item.album.images[0]?.url,
    songUrl: data.item.external_urls.spotify,
  }

  return NextResponse.json(songData)
}
