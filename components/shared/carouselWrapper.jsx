import React, { Component } from 'react'
import Slider from 'react-slick'
import style from '../../styles/carouselWrapper.scss'

var SETTINGS = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  initialSlide: 0,
  slidesToShow: 3,
  lazyLoad: true,
  rows: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        arrows: false,
        dots: false
      }
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: false
      }
    },
    {
      breakpoint: 438,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false
      }
    }
  ]
};

const MESSAGE = '(swipe left or right for more)'

class CarouselWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleHelp: false,
    }
    this.updateVisibleHelp = this.updateVisibleHelp.bind(this)
  }

  updateVisibleHelp(){
    const { showSwipeAt } = this.props
    const { visibleHelp } = this.state
    const wh = window.innerWidth

    if(wh <= showSwipeAt && !visibleHelp) {
      this.setState({ visibleHelp : true })
    }

    if (wh >= showSwipeAt && showSwipeAt){
      this.setState({ visibleHelp : false })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateVisibleHelp);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateVisibleHelp);
  }

  render() {
    const { visibleHelp } = this.state
    const { children } = this.props
    let help = null
    if(visibleHelp) {
      help = (
        <div className={style.swipeHelp}>{MESSAGE}</div>
      )
    }

    return(
      <div>
        <Slider {...SETTINGS} className={style.slider}>
          { children }
        </Slider>
        { help }
      </div>
    )
  }
}

export default CarouselWrapper