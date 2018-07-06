import React, { Component } from 'react'
import _ from 'lodash'
import Slider from 'react-slick'
import { ExpeditionCard } from '../shared'
import { ExpeditionFilter } from '../shared'
import style from '../../styles/sliderExpeditions.scss'
import styleFilter from '../../styles/filterPopular.scss'

const settings = {
  dots: false,
  infinite: false,
  lazyLoad: true,
  slidesToShow: 3,
  slidesToScroll: 1,
}

class FilterPopular extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popular: []
    }
    this.getPopular = this.getPopularExpeditions.bind(this)
  }

  componentWillMount(){
    this.getPopular();
  }

  getPopularExpeditions = async () => {
    const { store } = this.props
    const expeditions = await store.fetchPopular()
    this.setState({ popular: expeditions })
  }

  getByTag = async (tag) => {
    const { store } = this.props
    let newPopular = []
    switch(tag) {
      case 'all':
        newPopular = await store.popularAll
        break
      case 'air':
        newPopular = await store.popularAir
        break
      case 'land':
        newPopular = await store.popularLand
        break
      case 'sea':
        newPopular = await store.popularSea
        break
      case 'urban':
        newPopular = await store.popularUrban
        break
      case 'backyard':
        newPopular = await store.popularBackyard
        break
    }
    this.setState({ popular: newPopular })
  }

  render() {
    const { popular } = this.state
    let sliders = <div>No results</div>

    if (popular.length) {
      sliders = popular.map(item => (
        <div key={_.uniqueId('slider-')}>
          <ExpeditionCard
            key={_.uniqueId('slider-')}
            data={item} />
        </div>
      ))
    }

    return (
      <div className={style.sliderExpeditions}>
        <div>
          <ExpeditionFilter
            title={'Popular Expeditions'}
            filterByTag={this.getByTag}
          />
        </div>
        <div className={styleFilter.cardSection}>
          <Slider {...settings} className={style.slider}>
            {sliders}
          </Slider>
        </div>
      </div>
    )
  }
}

export default FilterPopular
