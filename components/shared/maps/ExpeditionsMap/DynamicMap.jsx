import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import turf from '@turf/turf'
import supercluster from 'supercluster'
import DisclaimerControl from '../plugins/DisclaimerControl'

const {
  AttributionControl,
  GeolocateControl,
  LngLat,
  Map,
  NavigationControl,
} = mapboxgl

class DynamicMap extends React.Component {
  constructor(props) {
    super(props)
    mapboxgl.accessToken = props.accessToken
  }

  componentDidMount() {
    const {
      controls,
      center,
      scrollZoom,
      mapStyle,
      zoom,
      ...mapProps
    } = this.props
    const map = new Map({
      container: this.mapContainer,
      style: `mapbox://styles/${mapStyle}`,
      attributionControl: false,
      ...mapProps,
    })

    if (!scrollZoom) {
      map.scrollZoom.disable()
    }
    const attrControl = new AttributionControl({
      compact: controls.compactAttribution,
    })
    map.addControl(attrControl)
    if (controls.navigation) {
      map.addControl(new NavigationControl())
    }
    if (controls.geolocate) {
      map.addControl(new GeolocateControl())
    }
    if (controls.disclaimer) {
      const disclaimer = new DisclaimerControl({
        position: 'bottom-center',
        disclaimerText: '© NGP, Content may not reflect ',
        link: {
          href:
            'https://www.nationalgeographic.com/maps/cartographic-policies/?beta=true',
          text: "National Geographic's current map policy",
        },
      })
      map.addControl(disclaimer)
    }

    function onLoad() {
      map.setCenter(new LngLat(center[0], center[1]), undefined)
      map.setZoom(zoom)
    }

    map.on('load', onLoad)
  }

  render() {
    return (
      <div
        style={{
          backgroundSize: 'cover',
          width: '100%',
          height: '520px',
        }}
        ref={el => {
          this.mapContainer = el
        }}
      />
    )
  }
}

DynamicMap.propTypes = {
  accessToken: PropTypes.string.isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
  controls: PropTypes.shape({
    compactAttribution: PropTypes.bool,
    disclaimer: PropTypes.bool,
    geolocate: PropTypes.bool,
    navigation: PropTypes.bool,
  }),
  scrollZoom: PropTypes.bool,
  mapStyle: PropTypes.string.isRequired,
  zoom: PropTypes.number,
}

DynamicMap.defaultProps = {
  center: [0, 0],
  controls: {
    compactAttribution: true,
    disclaimer: true,
    geolocate: true,
    navigation: true,
  },
  scrollZoom: false,
  mapStyle: 'mapbox/v9-streets',
  zoom: 0,
}

export default DynamicMap
