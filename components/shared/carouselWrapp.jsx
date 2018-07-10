import React, { Component } from 'react'
import Carousel from 'nuka-carousel'

class CarouselWrapp extends Component {
  render() {
    const { children } = this.props
    return(
      <Carousel
        slidesToShow={3}
        renderBottomCenterControls={false}
      >
        { children }
      </Carousel>
    )
  }
}

export default CarouselWrapp


