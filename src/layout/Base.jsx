import React from 'react'
import GlobalHeader from '../components/GlobalHeader'
import CodeMirrorDemo from '../components/CodeMirrorDemo'
import ContentBanner from '../components/ContentBanner'

export default function Base() {
  return (
    <div>
      <div className="flex min-h-screen flex-col justify-between bg-gray-900">
        <GlobalHeader />
        <main>
          <ContentBanner title="TailwindCSS Motion Maker" subtitle="A Full-featured Animation Generator for TailwindCSS with Framer Motion">
            Design, create, and bring to life your custom Tailwind CSS animations. From simple to complex scenarios, leverage the power of Framer Motion to easily generate smooth and professional animations. Develop dynamic user interfaces that stand out and enhance your Tailwind CSS projects'
            usability and appeal.
          </ContentBanner>
          <div className="dark">
            <CodeMirrorDemo />
          </div>
        </main>
      </div>
    </div>
  )
}
