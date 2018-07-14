import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Carousel from './carousel.jsx'
import PopularExpeditions from './popularExpeditions.jsx'
import RecentExpeditions from './recentExpeditions.jsx'
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
        <ExpeditionsMap actionFetch={homeStore.fetchJson} />
        <PopularExpeditions actionFetch={homeStore.fetcheFilter} />
        <RecentExpeditions actionFetch={homeStore.fetcheFilter} />
        <FeaturedExpedition
          fetchAction={this.props.homeStore.fetchFeaturedExpedition}
        />
      </Container>
    )
  }
}

export default HomeContainer
