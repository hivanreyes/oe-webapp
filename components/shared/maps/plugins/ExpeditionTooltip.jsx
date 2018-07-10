import React from 'react'
import { renderToString } from 'react-dom/server'
import mapboxgl from 'mapbox-gl'
import cx from 'classnames'
import './_mapboxglTooltip.css'

class ExpeditionTooltip {
  constructor(layerName, screenSizeBreakPoint, basePath = 'expedition') {
    // See https://www.mapbox.com/mapbox-gl-js/api/#Popup
    this.popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      anchor: 'top',
    })
    this.layer = layerName
    this.breakPoint = screenSizeBreakPoint
    this.basePath = basePath
  }

  attachTo(map) {
    map.on('click', event => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: [this.layer],
      })

      // If mouse is not over the layer
      if (!features.length) {
        this.popup.remove()
      } else {
        const { properties, geometry } = features[0]
        this.popup
          .setLngLat(geometry.coordinates)
          .setHTML(this.build(properties))
          .addTo(map)
      }
    })
  }

  build(props) {
    // eslint-disable-next-line camelcase
    const { id, name, duration, lastLocation, photo_l } = props
    const path = `/${this.basePath}/${id}`
    const screenWidth =
      // eslint-disable-next-line no-undef
      window.innerWidth > 0 ? window.innerWidth : window.screen.width
    const element = (
      <div className={cx(['featuredMarker', `marker-${id}`])}>
        {screenWidth <= this.breakPoint ? (
          <div className="featuredMarkerInfo" style={{ textAlign: 'center' }}>
            <a href={path} className="smallBoldLabel">
              {name}
            </a>
          </div>
        ) : (
          <div>
            <a
              href={path}
              className="featuredMarkerImage"
              // eslint-disable-next-line camelcase
              style={{ backgroundImage: `url(${photo_l})` }}
            />
            <div className="featuredMarkerInfo">
              <a href={path} className="smallBoldLabel">
                {name}
              </a>
              <div className="featuredMarkerSmallDetail">
                {lastLocation && <a href={path}>{lastLocation}</a>}
                <a href={path}>{duration}</a>
              </div>
            </div>
          </div>
        )}
      </div>
    )

    return renderToString(element)
  }
}

export default ExpeditionTooltip
