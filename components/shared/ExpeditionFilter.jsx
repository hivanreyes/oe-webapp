import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import _ from 'lodash'
import style from './styles/filter.scss'
import '../../node_modules/@fortawesome/fontawesome-free/js/all.js'
import '../../node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss'

const TAGS = {
  ALL: 'all',
  AIR: 'air',
  LAND: 'land',
  SEA: 'sea',
  URBAN: 'urban',
  BACKYARD: 'backyard',
}


class ExpeditionFilter extends Component {
  constructor(props) {
    super(props)
    this.active = TAGS.ALL
    this.onClickTag = this.filterClickTag.bind(this)
    this.getClassTag = this.getClass.bind(this)
  }

  filterClickTag(tag) {
    const { filterByTag } = this.props
    this.active = tag
    filterByTag(tag)
  }

  getClass(type) {
    return cn({
      'fas': true,
      [style.icon]: true,
      'fa-globe': type === TAGS.ALL,
      'fa-cloud': type === TAGS.AIR,
      'fa-leaf': type === TAGS.LAND,
      'fa-anchor': type === TAGS.SEA,
      'fa-building': type === TAGS.URBAN,
      'fa-home': type === TAGS.BACKYARD,
    })
  }

  render() {
    const { title } = this.props

    return (
      <div className={style.containerFilter}>
        <div className={style.filter}>
          <div className={style.titleFilter}>
            <span className={style.title}>{title}</span>
            <span className={style.link}>Show All</span>
          </div>
          <div className={style.tagsFilter}>
            <span
              onClick={() => this.onClickTag(TAGS.ALL)}
              className={cn({[style.active]: this.active === TAGS.ALL})}
            >
              <i className={this.getClassTag(TAGS.ALL)}></i>
              All
            </span>
            <span
              onClick={() => this.onClickTag(TAGS.AIR)}
              className={cn({[style.active]: this.active === TAGS.AIR})}
            >
              <i className={this.getClassTag(TAGS.AIR)}></i>
              Air
            </span>
            <span
              onClick={() => this.onClickTag(TAGS.LAND)}
              className={cn({[style.active]: this.active === TAGS.LAND})}
            >
              <i className={this.getClassTag(TAGS.LAND)}></i>
              Land
            </span>
            <span
              onClick={() => this.onClickTag(TAGS.SEA)}
              className={cn({[style.active]: this.active === TAGS.SEA})}
            >
              <i className={this.getClassTag(TAGS.SEA)}></i>
              Sea
            </span>
            <span
              onClick={() => this.onClickTag(TAGS.URBAN)}
              className={cn({[style.active]: this.active === TAGS.URBAN})}
            >
              <i className={this.getClassTag(TAGS.URBAN)}></i>
              Urban
            </span>
            <span
              onClick={() => this.onClickTag(TAGS.BACKYARD)}
              className={cn({[style.active]: this.active === TAGS.BACKYARD})}
            >
              <i className={this.getClassTag(TAGS.BACKYARD)}></i>
              Backyard
            </span>
          </div>
        </div>
      </div>
    )
  }
}

ExpeditionFilter.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ExpeditionFilter
