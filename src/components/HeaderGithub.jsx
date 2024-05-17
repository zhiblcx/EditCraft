import React from 'react'
import IconGithub from './IconGithub.jsx'

export default function GlobalHeader() {
  return (
    <div>
      <a
        href="https://github.com/zhiblcx/EditCraft"
        target="_blank" rel="noreferrer"
      >
        <span className="sr-only">GitHub</span>
        <IconGithub className="h-5 w-5" />
      </a>
    </div>
  )
}
