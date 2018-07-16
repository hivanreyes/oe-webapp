import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Carousel from './carousel.jsx'
import { inject, observer } from 'mobx-react'
import ExpeditionsMap from '../shared/maps/ExpeditionsMap'
import FeaturedExpedition from './FeaturedExpedition'
import Api from '../../api/api'

@inject('homeStore', 'sessionStore') @observer
class HomeContainer extends Component {
  render() {
    const { sessionStore: sessionId } = this.props
    return (
      <Container className="image-container">
        <Carousel />
        <ExpeditionsMap actionFetch={this.props.homeStore.fetchJson} />
        <FeaturedExpedition
          isAuthenticated={!!sessionId}
          follow={Api.expedition.follow}
          unfollow={Api.expedition.unfollow}
          fetchAction={this.props.homeStore.fetchFeaturedExpedition}
        />
      </Container>
    )
  }
}

export default HomeContainer
