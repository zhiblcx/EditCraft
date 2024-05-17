import React from 'react'

export default function ContentBanner({ title, subtitle, children }) {
  return (
    <div>
      <section className="relative text-center">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto flex max-w-3xl flex-col">
            <h1 className="mt-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold uppercase tracking-tighter text-transparent sm:text-5xl lg:text-7xl">{title}</h1>
            <h2 className="order-first bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-medium tracking-wide text-transparent">{subtitle}</h2>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-xl font-medium text-white">{children}</p>
        </div>
      </section>
    </div>
  )
}
