import React from 'react'
import PropTypes from 'prop-types'
import TruncateMarkup from 'react-truncate-markup'
import Button from './Button'
import Lazy from './imageLazy'
import style from './styles/expeditionCard.scss'
import LazyLoad from 'react-lazyload'

const ExpeditionCard = ({ data }) => {
  let postLabel = 'post'
  if (data.postCount !== 1) postLabel = 'posts'
  const firstLocation = `${data.firstLocation} ${data.duration}`
  return (
    <div className={style.containerExpCard}>
      <Lazy image={data.banner} />
      <div className={style.detailsCard}>
        <div className={style.titleCard}>
          <TruncateMarkup lines={1}>
            <div>{data.name}</div>
          </TruncateMarkup>
        </div>
        <div className={style.subTitle}>
          <TruncateMarkup lines={1}>
            <div>
              <span>{firstLocation}</span>
            </div>
          </TruncateMarkup>
        </div>
        <div className={style.description}>
          <TruncateMarkup lines={8}>
            <div>
              <span>{data.description.replace(/<(?:.|\n)*?>/gm, '')}</span>
            </div>
          </TruncateMarkup>
        </div>
        <div className={style.post}>
          <span className={style.number}>{data.postCount}</span>
          <span className={style.postText}>{postLabel}</span>
        </div>
        <div className={style.buttons}>
          <Button label="Follow" />
        </div>
      </div>
    </div>
  )
}

ExpeditionCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    postCount: PropTypes.number.isRequired,
    firstLocation: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }),
}

export default ExpeditionCard
