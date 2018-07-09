import React, { Component } from 'react'
import Slider from 'react-slick'
import style from '../../styles/sliderExpeditions.scss'

var SETTINGS = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  initialSlide: 0,
  slidesToShow: 3,
  lazyLoad: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false
      }
    }
  ]
};

const CarouselWrapper = ({ children }) => (
  <Slider {...SETTINGS} className={style.slider}>
    { children }
  </Slider>
)

export default CarouselWrapper