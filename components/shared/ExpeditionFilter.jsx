import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import style from './styles/filter.scss'

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
  }

  filterClickTag(tag) {
    const { filterByTag } = this.props
    this.active = tag
    filterByTag(tag)
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
              All
            </span>
            <span
              onClick={() => this.onClickTag(TAGS.AIR)}
              className={cn({[style.active]: this.active === TAGS.AIR})}
            >
              Air
            </span>
            <span
              onClick={() => this.onClickTag(TAGS.LAND)}
              className={cn({[style.active]: this.active === TAGS.LAND})}
            >
              Land
            </span>
            <span
              onClick={() => this.onClickTag(TAGS.SEA)}
              className={cn({[style.active]: this.active === TAGS.SEA})}
            >
              Sea
            </span>
            <span
              onClick={() => this.onClickTag(TAGS.URBAN)}
              className={cn({[style.active]: this.active === TAGS.URBAN})}
            >
              Urban
            </span>
            <span
              onClick={() => this.onClickTag(TAGS.BACKYARD)}
              className={cn({[style.active]: this.active === TAGS.BACKYARD})}
            >
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
