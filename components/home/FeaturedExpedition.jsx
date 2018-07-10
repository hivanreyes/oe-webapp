import React from 'react'
import PropTypes from 'prop-types'
import style from './featuredExpedition.scss'
import Button from '../shared/Button'

const FeaturedExpedition = ({
  imgSrc,
  imgAlt,
  metadata,
  title,
  description,
}) => (
  <div className={style.featuredExpedition}>
    <div className={style.container}>
      <img src={imgSrc} className={style.image} alt={imgAlt} />
      <div className={style.left}>
        <div className={style.metadata}>{metadata}</div>
        <div className={style.title}>{title}</div>
        <div className={style.subtitle}>{description}</div>
        <Button label="Follow" />
      </div>
    </div>
  </div>
)

FeaturedExpedition.propTypes = {
  metadata: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
}

export default FeaturedExpedition
