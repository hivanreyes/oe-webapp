import React, { Component } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import DisclaimerControl from './plugins/DisclaimerControl'

const {
  AttributionControl,
  GeolocateControl,
  Map,
  NavigationControl,
} = mapboxgl

class MapboxMap extends Component {
  constructor(props) {
    super(props)
    mapboxgl.accessToken = props.accessToken
    console.log(props)
  }

  componentDidMount() {
    this.map = this.createMap()
    const { onClick, onMouseMove, plugins } = this.props

    const onLoad = () => {
      this.loadSources()
      this.loadLayers()
      if (onClick) {
        this.map.on('click', onClick.bind(this.map))
      }
      if (onMouseMove) {
        this.map.on('mousemove', this.onMouseMove.bind(this.map))
      }
      if (plugins) {
        plugins.forEach(plugin => {
          this.addPlugin(plugin)
        })
      }
    }

    this.map.on('load', onLoad)
  }

  render() {
    return (
      <div
        style={this.props.style}
        ref={el => {
          this.mapContainer = el
        }}
      />
    )
  }

  addPlugin(plugin) {
    plugin.attachTo(this.map)
  }

  createMap() {
    const { scrollZoom, controls, mapStyle, ...mapProps } = this.props
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
      const disclaimer = new DisclaimerControl(controls.disclaimer)
      map.addControl(disclaimer)
    }
    return map
  }

  loadSources() {
    const { sources } = this.props
    console.log(sources)
    if (sources) {
      // Expedition points
      sources.forEach(({ id, ...data }) => {
        this.map.addSource(id, data)
      })
    }
  }

  loadLayers() {
    const { layers } = this.props
    console.log(layers)
    layers.forEach(layer => {
      this.map.addLayer(layer)
    })
  }
}

MapboxMap.propTypes = {
  accessToken: PropTypes.string.isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
  controls: PropTypes.shape({
    compactAttribution: PropTypes.bool,
    disclaimer: PropTypes.shape({
      position: PropTypes.string,
      disclaimerText: PropTypes.string,
      link: {
        href: PropTypes.string,
        text: PropTypes.string,
      },
    }),
    geolocate: PropTypes.bool,
    navigation: PropTypes.bool,
  }),
  plugins: PropTypes.arrayOf(PropTypes.object),
  layers: PropTypes.array,
  scrollZoom: PropTypes.bool,
  sources: PropTypes.array,
  style: PropTypes.object,
  mapStyle: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onMouseMove: PropTypes.func,
  zoom: PropTypes.number,
}

MapboxMap.defaultProps = {
  center: [0, 0],
  controls: {
    compactAttribution: false,
    geolocate: false,
    navigation: false,
  },
  scrollZoom: false,
  style: {
    backgroundSize: 'cover',
    width: '100%',
    height: '520px',
  },
  mapStyle: 'mapbox/streets-v9',
  zoom: 1.5,
}

export default MapboxMap
