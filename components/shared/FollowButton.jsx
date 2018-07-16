import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import redirect from '../../utils/redirect'

class FollowButton extends Component {
  constructor(props) {
    super(props)
    this.state = { isFollower: props.isFollower }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFollower !== this.props.isFollower) {
      this.setState({ isFollower: nextProps.isFollower })
    }
  }

  render() {
    const { subdomain, follow, unfollow, isAuthenticated } = this.props
    const { isFollower } = this.state
    return (
      <Button
        /* eslint-disable no-console */
        onClick={async () => {
          if (isAuthenticated) {
            if (isFollower) {
              const res = await unfollow(subdomain)
              if (res.status === 200) {
                this.setState({ isFollower: false })
              }
            } else {
              const res = await follow(subdomain)
              if (res.status === 200) {
                this.setState({ isFollower: true })
              }
            }
          } else {
            // TODO: redirect to mmdb login.
            redirect('/')
          }
        }}
        label={isFollower ? 'Following' : 'Follow'}
      />
    )
  }
}

FollowButton.propTypes = {
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  subdomain: PropTypes.string.isRequired,
  isFollower: PropTypes.bool,
}

FollowButton.defaultProps = {
  isFollower: false,
}

export default FollowButton
