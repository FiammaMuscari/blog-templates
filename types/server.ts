export type TOC = {
  value: string
  depth: number
  url: string
}[]

export interface SpotifyNowPlayingData {
  isPlaying: boolean
  songUrl?: string
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
}
