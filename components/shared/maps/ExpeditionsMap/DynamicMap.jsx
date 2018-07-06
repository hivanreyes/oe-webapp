import React, { Component } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { convex, featureCollection } from '@turf/turf'
import supercluster from 'supercluster'
import DisclaimerControl from '../plugins/DisclaimerControl'
import ExpeditionTooltip from '../plugins/ExpeditionTooltip'

const {
  AttributionControl,
  GeolocateControl,
  Map,
  NavigationControl,
} = mapboxgl

class DynamicMap extends Component {
  constructor(props) {
    super(props)
    mapboxgl.accessToken = props.accessToken
    this.tooltip = new ExpeditionTooltip('unclustered-point', 480)
  }

  async componentWillMount() {
    const { actionFetch, clusterRadius, clusterMaxZoom } = this.props
    const features = await actionFetch()

    // Create the clusters
    this.cluster = supercluster({
      cluster: clusterRadius,
      maxZoom: clusterMaxZoom,
    })
    this.cluster.load(features)

    // Mouse hover effect
    this.geojson = { type: 'FeatureCollection', features }
  }

  componentDidMount() {
    this.map = this.createMap()

    const onLoad = () => {
      this.addMapSources()
      this.addMapLayers()
      this.tooltip.attachTo(this.map)
    }

    this.map.on('load', onLoad)
    this.previousClusterId = undefined
    this.clusterId = undefined

    this.map.on('mousemove', this.onMouseMove.bind(this))
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

  onMouseMove(event) {
    const zoom = Math.floor(Number(this.map.getZoom()))
    const clusterFeatures = this.map.queryRenderedFeatures(event.point, {
      layers: ['clusters'],
    })

    if (!clusterFeatures.length) {
      const unclusteredFeatures = this.map.queryRenderedFeatures(event.point, {
        layers: ['unclustered-point'],
      })

      // eslint-disable-next-line no-param-reassign
      if (!unclusteredFeatures.length) {
        this.map.getCanvas().style.cursor = ''
      } else {
        this.map.getCanvas().style.cursor = 'pointer'
      }
      this.map.getSource('polygon').setData(featureCollection([]))
      this.previousClusterId = undefined
      return
    }

    this.map.getCanvas().style.cursor = 'pointer'
    const feat = clusterFeatures[0]

    // Lookup the hovered cluster features underlying data points
    // This operation is due that mapboxgl does not encode zoom
    // into the cluster id.
    this.clusterId = (feat.properties.cluster_id << 5) + (zoom + 1)
    if (this.clusterId === this.previousClusterId) {
      return
    }

    const allFeatures = this.cluster.getLeaves(this.clusterId, Infinity)

    // Generate the on hover polygon
    if (allFeatures.length > 1) {
      const polygon = convex(featureCollection(allFeatures))
      console.log(polygon)
      this.map.getSource('polygon').setData(polygon)
    }
    this.previousClusterId = this.clusterId
  }

  createMap() {
    const { scrollZoom, controls, mapStyle, ...mapProps } = this.props

    const map = new Map({
      container: this.mapContainer,
      style: `mapbox://styles/${mapStyle}`,
      attributionControl: false,
      ...mapProps
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

      return map
    }
  }

  addMapSources() {
    const { clusterRadius, clusterMaxZoom } = this.props
    // Expedition points
    this.map.addSource('expeditions', {
      type: 'geojson',
      data: this.geojson,
      cluster: true,
      clusterRadius,  // Radius of each cluster when clustering points
      clusterMaxZoom, // Max zoom to cluster points on
    })

    // Cluster's mouse hover polygon effect
    this.map.addSource('polygon', {
      type: 'geojson',
      data: featureCollection([]),
    })
  }

  addMapLayers() {
    const { clusterColor } = this.props

    // Render layer for cluster's mouse hover polygon
    this.map.addLayer({
      id: 'hover-polygon',
      type: 'fill',
      source: 'polygon',
      paint: {
        'fill-color': '#0000ff',
        'fill-outline-color': '#00BCD4',
        'fill-opacity': 0.25,
      },
    })

    // Render layer for expeditions clusters
    this.map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'expeditions',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': clusterColor,
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          12,
          15,
          15,
          18,
          18,
        ],
      },
    })

    // Render layer for clusters' labels
    this.map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'expeditions',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
    })

    // Render layer for expedition points
    this.map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'expeditions',
      filter: ['!has', 'point_count'],
      paint: {
        'circle-color': [
          'match',
          ['get', 'type', ['object', ['get', 'stage']]],
          'preparation', '#e7ce2a',
          'underway', '#96be40',
          'debriefing', '#26ade4',
          '#646464',
        ],
        'circle-radius': 13.5,
      },
    })

    // Render layer for expedition points icons
    this.map.addLayer({
      id: "unclustered-point-icon",
      type: "symbol",
      source: "expeditions",
      filter: ["!has", "point_count"],
      layout: {
        "icon-allow-overlap": true,
        "icon-image": [
          "match",
          ["get", "type", ["object", ["get", "stage"]]],
          "preparation", "check",
          "underway", "flag",
          "debriefing", "book",
          "compass",
        ],
        "icon-size": 0.025,
      },
    })
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
  clusterColor: PropTypes.string,
  clusterRadius: PropTypes.number,
  clusterMaxZoom: PropTypes.number,
  scrollZoom: PropTypes.bool,
  actionFetch: PropTypes.func.isRequired,
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
  clusterColor: '#96be40',
  clusterRadius: 40,
  clusterMaxZoom: 14,
  scrollZoom: false,
  mapStyle: 'mapbox/streets-v9',
  zoom: 1,
}

export default DynamicMap
