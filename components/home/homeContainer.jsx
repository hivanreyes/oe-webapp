import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Carousel from './carousel.jsx'
import Popular from './popularExpeditions.jsx'
import { inject, observer } from 'mobx-react'
import ExpeditionsMap from '../shared/maps/ExpeditionsMap'
import FeaturedExpedition from './FeaturedExpedition'

@inject('homeStore') @observer
class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popular: []
    }
    this.getPopular = this.getPopularFe.bind(this)
  }

  componentWillMount() {
    this.getPopular();
  }

  getPopularFe = async () => {
    const { homeStore } = this.props
    const expeditions = await homeStore.fetchPopular()
    this.setState({ popular: expeditions })
  }

  render() {
    const { popular } = this.state

    return (
      <Container className="image-container">
        <Carousel json={this.geoJson} />
        <Popular expeditions={ popular } />
        <ExpeditionsMap actionFetch={this.props.homeStore.fetchJson} />
        <FeaturedExpedition
          fetchAction={this.props.homeStore.fetchFeaturedExpedition}
        />
      </Container>
    )
  }
}

export default HomeContainer
