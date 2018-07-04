import React from 'react'
import Slider from 'react-slick'
import _ from 'lodash'
import { ExpeditionCard } from '../shared'
import style from '../../styles/sliderExpeditions.scss'

const settings = {
  dots: false,
  infinite: false,
  lazyLoad: true,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const Popular = ({ expeditions }) => {
  let sliders = <div>No results</div>

  if (expeditions.length) {
    sliders = expeditions.map(item => (
      <div
        key={_.uniqueId('slider-')}
      >
        <ExpeditionCard
          key={_.uniqueId('slider-')}
          data={item} />
      </div>
    ))
  }

  return (
    <div className={style.sliderExpeditions}>
      <Slider {...settings} className={style.slider}>
        {sliders}
      </Slider>
    </div>
  )
}

export default Popular
