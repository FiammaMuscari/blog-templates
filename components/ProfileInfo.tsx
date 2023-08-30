import { Backpack, Github, Linkedin, Mail, MapPin, Twitter } from 'lucide-react'
import { Twemoji } from '@/components/Twemoji'
import siteMetadata from '@/data/siteMetadata'

export function ProfileCardInfo() {
  return (
    <div className="hidden py-4 xl:block xl:px-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Thomas Liu</h3>
      <h5 className="py-2 text-gray-700 dark:text-gray-400">Learner | Builder</h5>
      <div className="mb-2 mt-4 space-y-4">
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <Backpack strokeWidth={1} size={20} />
          <p className="flex items-center px-2 space-x-1">
            <span>CTO & Co-Founder</span>
            <span>@</span>
            <a
              target="_blank"
              href="https://luncherp.cn"
              rel="noreferrer"
              className="hover:underline"
            >
              Lunchsoft
            </a>
          </p>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <MapPin strokeWidth={1} size={20} />
          <p className="px-2">
            [::1]:443 - Shenzhen,
            <span className="absolute ml-1 inline-flex pt-px">
              <Twemoji emoji="flag-china" />
            </span>
          </p>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <Mail strokeWidth={1} size={20} />
          <a className="px-2" href={`mailto:${siteMetadata.email}`}>
            {siteMetadata.email}
          </a>
        </div>
        <div className="flex gap-2.5 items-center text-gray-700 dark:text-gray-200">
          <a
            target="_blank"
            href={siteMetadata.github}
            rel="noreferrer"
            className="hover:underline text-sm flex items-center"
            data-umami-event="profile-card-github"
          >
            <Github size={20} strokeWidth={1} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">liunice</span>
          </a>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <a
            target="_blank"
            href={siteMetadata.linkedin}
            rel="noreferrer"
            className="hover:underline text-sm flex items-center"
            data-umami-event="profile-card-linkedin"
          >
            <Linkedin size={20} strokeWidth={1} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">liunice</span>
          </a>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <a
            target="_blank"
            href={siteMetadata.twitter}
            rel="noreferrer"
            className="hover:underline text-sm flex items-center"
            data-umami-event="profile-card-x"
          >
            <Twitter strokeWidth={1} size={20} />
            <span className="ml-px text-gray-500">/</span>
            <span className="ml-0.5">liunicer</span>
          </a>
        </div>
      </div>
    </div>
  )
}
