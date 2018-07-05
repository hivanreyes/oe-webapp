/* eslint-disable no-underscore-dangle,no-undef */
import React from 'react'
import ReactDOM from 'react-dom'
import registerControlPosition from './RegisterControl'
import './_mapboxglBottomCenter.css'

class DisclaimerControl {
  constructor({
    position = 'bottom-center',
    disclaimerText = 'Content may not reflect our current map policy',
    link = {},
  }) {
    this.position = position
    this.disclaimerText = disclaimerText
    this.link = link
  }

  onAdd(map) {
    this.map = map
    registerControlPosition(map, this.position)

    const element = (
      <div className={'mapboxgl-map-policy'}>
        {this.disclaimerText}
        {this.link.lineBreak && <br />}
        <a href={this.link.href || '#'} target={this.link.target || '_blank'}>
          {this.link.text || this.link.href || ''}
        </a>
        {'.'}
      </div>
    )
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl'
    ReactDOM.render(element, this._container)
    return this._container
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container)
    this.map = undefined
  }

  getDefaultPosition() {
    return this.position
  }
}

export default DisclaimerControl
