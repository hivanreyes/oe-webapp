import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Carousel from './carousel.jsx'
import FilterPopular from './filterPopular.jsx'
import { inject, observer } from 'mobx-react'

@inject('homeStore') @observer
class HomeContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { homeStore } = this.props

    return (
      <Container className="image-container">
        <Carousel />
        <FilterPopular store={homeStore} />
      </Container>
    )
  }
}

export default HomeContainer
