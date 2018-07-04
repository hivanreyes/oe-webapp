import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Carousel from './carousel.jsx'
import { inject, observer } from 'mobx-react'

@inject('homeStore') @observer
class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.getJson = this.getGeoJson.bind(this)
  }

  async getGeoJson() {
    const { homeStore } = this.props
    await homeStore.fetchJson()
  }

  render() {
    const { geoJson } = this.props.homeStore
    this.getJson();

    // TODO here is the evidence now is fetching the data from the api
    console.log(geoJson)

    return (
      <Container className="image-container">
        <Carousel json={this.geoJson} />
      </Container>
    )
  }
}

export default HomeContainer
