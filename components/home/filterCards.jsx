import React, { Component } from 'react'
import _ from 'lodash'
import { ExpeditionCard } from '../shared'
import { FilterTags } from '../shared'
import { CarouselWrapp } from '../shared'
import style from '../../styles/filterPopular.scss'

const FilterCards = ({ expeditions, actions, showAt }) => {
  let sliders = null

  if (expeditions.length) {
    sliders = expeditions.map(item => (
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
        <FilterTags
          title={'Popular Expeditions'}
          filterByTag={actions}
        />
      </div>
      <div className={style.cardSection}>
        <CarouselWrapp>
          {sliders}
        </CarouselWrapp>
      </div>
    </div>
  )
}

export default FilterCards
