import React, { Component } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { convex, featureCollection } from '@turf/turf'
import supercluster from 'supercluster'
import MapboxMap from '../MapboxMap'
import ExpeditionTooltip from '../plugins/ExpeditionTooltip'

const {
  LngLatBounds,
} = mapboxgl

class DynamicMap extends Component {
  constructor(props) {
    super(props)
    this.tooltip = new ExpeditionTooltip('unclustered-point', 480)
    this.cluster = undefined
    this.previousClusterId = undefined
    this.clusterId = undefined
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
    this.geojson = { type: 'FeatureCollection', features }
  }

  onClick(event) {
    const clusterFeatures = this.queryRenderedFeatures(event.point, {
      layers: ['clusters'],
    })
    if (clusterFeatures.length) {
      const zoom = Math.floor(Number(this.getZoom()))
      const clusterId = clusterFeatures[0].properties.cluster_id
      const allFeatures = this.cluster.getLeaves(clusterId, zoom, Infinity)
      const bounds = new LngLatBounds()
      allFeatures.forEach(feature => {
        bounds.extend(feature.geometry.coordinates)
      })
      const screenWidth =
        // eslint-disable-next-line no-undef
        window.innerWidth > 0 ? window.innerWidth : window.screen.width
      this.fitBounds(bounds, { padding: screenWidth / 10 })
    }
  }

  onMouseMove(event) {
    const zoom = Math.floor(Number(this.getZoom()))
    const clusterFeatures = this.queryRenderedFeatures(event.point, {
      layers: ['clusters'],
    })

    if (!clusterFeatures.length) {
      const unclusteredFeatures = this.queryRenderedFeatures(event.point, {
        layers: ['unclustered-point'],
      })

      // eslint-disable-next-line no-param-reassign
      if (!unclusteredFeatures.length) {
        this.getCanvas().style.cursor = ''
      } else {
        this.getCanvas().style.cursor = 'pointer'
      }
      this.getSource('polygon').setData(featureCollection([]))
      this.previousClusterId = undefined
      return
    }

    this.getCanvas().style.cursor = 'pointer'
    const feat = clusterFeatures[0]

    // Lookup the hovered cluster features underlying data points
    // This operation is due that mapboxgl does not encode zoom
    // into the cluster id.
    this.clusterId = feat.properties.cluster_id
    if (this.clusterId === this.previousClusterId) {
      return
    }

    const allFeatures = this.cluster.getLeaves(this.clusterId, zoom, Infinity)
    // Generate the on hover polygon
    if (allFeatures.length > 1) {
      const polygon = convex(featureCollection(allFeatures))
      this.getSource('polygon').setData(polygon)
    }
    this.previousClusterId = this.clusterId
  }

  render() {
    const {clusterRadius, clusterMaxZoom, layers, mapStyle } = this.props
    return (
      <MapboxMap
        accessToken={this.props.accessToken}
        controls={{
          compactAttribution: true,
          geolocate: true,
          navigation: true,
          disclaimer: {
            position: 'bottom-center',
            disclaimerText: '© NGP, Content may not reflect ',
            link: {
              href:
                'https://www.nationalgeographic.com/maps/cartographic-policies/?beta=true',
              text: "National Geographic's current map policy",
            },
          }
        }}
        plugins={[this.tooltip]}
        layers={layers}
        mapStyle={mapStyle}
        sources={[
          {
            id: 'expeditions',
            type: 'geojson',
            data: this.geojson,
            cluster: true,
            clusterRadius,
            clusterMaxZoom,
          },
          {
            id: 'polygon',
            type: 'geojson',
            data: featureCollection([]),
          }
        ]}
      />
    )
  }
}

DynamicMap.propTypes = {
  accessToken: PropTypes.string.isRequired,
  clusterRadius: PropTypes.number,
  clusterMaxZoom: PropTypes.number,
  actionFetch: PropTypes.func.isRequired,
  mapStyle: PropTypes.string.isRequired,
}

DynamicMap.defaultProps = {
  center: [0, 0],
  clusterRadius: 40,
  clusterMaxZoom: 14,
  mapStyle: 'mapbox/streets-v9',
}

export default DynamicMap
