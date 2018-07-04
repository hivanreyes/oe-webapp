import React from 'react'
import PropTypes from 'prop-types'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faGlobe,
  faCloud,
  faLeaf,
  faAnchor,
  faBuilding,
  faHome,
} from '@fortawesome/fontawesome-free-solid'
import style from './styles/filter.scss'

fontawesome.library.add(faGlobe, faCloud, faLeaf, faAnchor, faBuilding, faHome)

const ExpeditionFilter = ({ title: something }) => (
  <div className={style.containerFilter}>
    <div className={style.filter}>
      <div className={style.titleFilter}>
        <span className={style.title}>{something}</span>
        <span className={style.link}>Show All</span>
      </div>
      <div className={style.tagsFilter}>
        <span className={style.active}>
          <FontAwesomeIcon icon="globe" />
          All
        </span>
        <span>
          <FontAwesomeIcon icon="cloud" />
          Air
        </span>
        <span>
          <FontAwesomeIcon icon="leaf" />
          Land
        </span>
        <span>
          <FontAwesomeIcon icon="anchor" />
          Sea
        </span>
        <span>
          <FontAwesomeIcon icon="building" />
          Urban
        </span>
        <span>
          <FontAwesomeIcon icon="home" />
          Backyard
        </span>
      </div>
    </div>
  </div>
)

ExpeditionFilter.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ExpeditionFilter
