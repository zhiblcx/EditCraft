import React from 'react'
import HeaderGithub from './HeaderGithub'

export default function GlobalHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/75 bg-gray-900 text-sm font-medium text-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <span>
          <img className="h-8 w-8 mr-2" src={require('../images/favicon.png')} alt="" />
        </span>
        <span>EditCraft</span>
        <div className="flex-grow" />
        <HeaderGithub />
      </div>
    </header>
  )
}
