import React from 'react'
import TruncateMarkup from 'react-truncate-markup'
import style from './styles/observationCard.scss'
import PropTypes from 'prop-types'

const ObservationCard = ({ data }) => {
  let postLabel = 'post'
  if (data.commentsCount !== 1) postLabel = 'posts'
  return (
    <div className={style.containerObsCard}>
      <div className={style.content}>
        <div className={style.titleCard}>
          <TruncateMarkup lines={1}>
            <div>{data.name}</div>
          </TruncateMarkup>
        </div>
        <div className={style.subTitle}>
          <TruncateMarkup lines={1}>
            <div>
              <span>{data.locationName}</span>
            </div>
          </TruncateMarkup>
        </div>
        <div className={style.description}>
          <TruncateMarkup lines={4}>
            <div>
              <span>{data.shareText.replace(/<(?:.|\n)*?>/gm, '')}</span>
            </div>
          </TruncateMarkup>
        </div>
        <img className={style.image} src={data.media} alt={data.name} />
        <div className={style.post}>
          <span className={style.number}>{data.commentsCount}</span>
          <span className={style.postText}>{postLabel}</span>
        </div>
      </div>
    </div>
  )
}

ObservationCard.propTypes = {
  data: PropTypes.shape({
    commentsCount: PropTypes.number.isRequired,
    locationName: PropTypes.string.isRequired,
    shareText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
  }),
}

export default ObservationCard
