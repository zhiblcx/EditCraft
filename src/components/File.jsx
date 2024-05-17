import React, { Component } from 'react'

export default class FileTest extends Component {
  render() {
    return (
      <figure className="@@@ bg-slate-100 rounded-xl dark:bg-slate-800 @@@ @@@">
        <img className="w-24 h-24 @@@ @@@ @@@ @@@ @@@" src={require('../images/wolf.jpg')} alt="Wolf" width="384" height="512" />
        <div className="pt-6 space-y-4 @@@ @@@ @@@">
          <blockquote>
            <p className="text-lg @@@">
              “Tailwind CSS is the only framework that I've seen scale
              on large teams. It’s easy to customize, adapts to any design,
              and the build size is tiny.”
            </p>
          </blockquote>
          <figcaption className="@@@">
            <div className="@@@">
              Sarah Dayan
            </div>
            <div className="@@@">
              Staff Engineer, Algolia
            </div>
          </figcaption>
        </div>
      </figure>
    )
  }
}
