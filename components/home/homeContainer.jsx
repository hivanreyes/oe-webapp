import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Carousel from './carousel.jsx'
import FilterPopular from './filterPopular.jsx'
import { inject, observer } from 'mobx-react'
import ExpeditionsMap from '../shared/maps/ExpeditionsMap'
import FeaturedExpedition from './FeaturedExpedition'

@inject('homeStore') @observer
class HomeContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { homeStore } = this.props

    return (
      <Container className="image-container">
        <Carousel json={this.geoJson} />
        <ExpeditionsMap actionFetch={this.props.homeStore.fetchJson} />
        <FeaturedExpedition
          fetchAction={this.props.homeStore.fetchFeaturedExpedition}
        />
        <FilterPopular store={homeStore} />
      </Container>
    )
  }
}

export default HomeContainer
