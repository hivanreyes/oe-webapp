import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TruncateMarkup from 'react-truncate-markup'
import style from './featuredExpedition.scss'
import FollowButton from '../shared/DynamicFollowButton'

class FeaturedExpedition extends Component {
  constructor(props) {
    super(props)
    const { banner, name, firstLocation, duration, description, isFollower } = props

    if (banner && name && firstLocation && duration && description) {
      this.state = { banner, name, firstLocation, duration, description, isFollower }
    } else {
      this.state = {
        banner: '',
        name: '',
        subdomain: '',
        firstLocation: '',
        duration: '',
        description: '',
        isFollower: false,
      }
    }
  }

  async componentDidMount() {
    if (this.props.fetchAction) {
      const data = await this.props.fetchAction()
      this.setState(data)
    }
  }

  render() {
    const {
      banner,
      name,
      subdomain,
      firstLocation,
      duration,
      description,
      isFollower,
    } = this.state
    const { isAuthenticated, follow, unfollow } = this.props
    return (
      <div className={style.featuredExpedition}>
        <div className={style.container}>
          <img src={banner} className={style.image} alt={name} />
          <div className={style.left}>
            <div className={style.metadata}>
              {`${firstLocation}, ${duration}`}
            </div>
            <div className={style.title}>{name}</div>
            <TruncateMarkup lines={5}>
              <div>
                <span className={style.subtitle}>
                  {description.replace(/<(?:.|\n)*?>/gm, '')}
                </span>
              </div>
            </TruncateMarkup>
            <br />
            <FollowButton
              follow={follow}
              unfollow={unfollow}
              isAuthenticated={isAuthenticated}
              isFollower={isFollower}
              subdomain={subdomain}
            />
          </div>
        </div>
      </div>
    )
  }
}

FeaturedExpedition.propTypes = {
  banner: PropTypes.string,
  name: PropTypes.string,
  subdomain: PropTypes.string,
  firstLocation: PropTypes.string,
  duration: PropTypes.string,
  description: PropTypes.string,
  isFollower: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  fetchAction: (props, propName) => {
    const { banner, name, firstLocation, duration, description } = props
    if (
      !(banner && name && firstLocation && duration && description) &&
      (props[propName] === undefined || typeof props[propName] !== 'function')
    ) {
      const msg = 'fetchAction function is required if no data is provided.'
      return new Error(msg)
    }
    return null
  },
}

FeaturedExpedition.defaultProps = {
  isFollower: false,
}

export default FeaturedExpedition
