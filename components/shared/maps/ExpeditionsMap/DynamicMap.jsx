import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import style from './expeditionsMap.scss'

const {
  AttributionControl,
  GeolocateControl,
  Map,
  NavigationControl,
} = mapboxgl

mapboxgl.accessToken =
  'pk.eyJ1IjoiamVsZGVyIiwiYSI6ImNqY2psMDU4ZzB5aHUyd25zajlqeHNhdGEifQ.SgWQ-I8Xg7xbiI6AYtjTTg' // config.get('mapboxgl.accessToken')
const mapStyle = 'jelder/cjiuzcajb6to92smm7vz0ucfk' // config.get('mapboxgl.style') || 'mapbox/streets-v9'

class DynamicMap extends React.Component {
  componentDidMount() {
    const { controls, scrollZoom, ...mapProps } = this.props
    const map = new Map({
      container: this.mapContainer,
      style: `mapbox://styles/${mapStyle}`,
      attributionControl: false,
      ...mapProps,
    })

    if (!scrollZoom) {
      map.scrollZoom.disable();
    }
    map.addControl(new AttributionControl({ compact: controls.compactAttribution }))
    if (controls.geolocate) {
      map.addControl(new GeolocateControl())
    }
    if (controls.navigation) {
      map.addControl(new NavigationControl())
    }
    console.error(style.expeditionsMap)
  }

  render() {
    return (
        <div
          className={style.expeditionsMap}
          ref={el => {
            this.mapContainer = el
          }}
        />
    )
  }
}

DynamicMap.propTypes = {
  scrollZoom: PropTypes.bool,
  controls: PropTypes.shape({
    compactAttribution: PropTypes.bool,
    disclaimer: PropTypes.bool,
    geolocate: PropTypes.bool,
    navigation: PropTypes.bool,
  }),
}

DynamicMap.defaultProps = {
  scrollZoom: false,
  controls: {
    attribution: false,
    disclaimer: true,
    geolocate: true,
    navigation: true,
  },
}

export default DynamicMap
