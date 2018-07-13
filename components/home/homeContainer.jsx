import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Carousel from './carousel.jsx'
import { inject, observer } from 'mobx-react'
import ExpeditionsMap from '../shared/maps/ExpeditionsMap'

@inject('homeStore') @observer
class HomeContainer extends Component {
  render() {
    return (
      <Container className="image-container">
        <Carousel />
        <ExpeditionsMap actionFetch={this.props.homeStore.fetchJson} />
      </Container>
    )
  }
}

export default HomeContainer
