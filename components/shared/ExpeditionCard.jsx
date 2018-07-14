import React from 'react'
import PropTypes from 'prop-types'
import TruncateMarkup from 'react-truncate-markup'
import Button from './Button'
import style from './styles/expeditionCard.scss'

const ExpeditionCard = ({ data }) => {
  let postLabel = 'post'
  //TODO remove this hardcoded data add those ones on BE
  const count = Math.floor(Math.random() * 10) + 1
  if (count !== 1) postLabel = 'posts'
  const firstLocation = 'Oaxaca de 1 de enero a 2 de febrero'
  return (
    <div className={style.containerExpCard}>
      <img className={style.headerImg} src={data.banner} alt={data.name} />
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
          <span className={style.number}>{count}</span>
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
  }),
}

export default ExpeditionCard
