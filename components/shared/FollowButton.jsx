import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import redirect from '../../utils/redirect'

class FollowButton extends Component {
  constructor(props) {
    super(props)
    this.state = { isFollower: props.isFollower }
  }

  render() {
    const { subdomain, follow, unfollow, isAuthenticated } = this.props
    const { isFollower } = this.state
    return (
      <Button
        /* eslint-disable no-console */
        onClick={() => {
          if (isAuthenticated) {
            if (isFollower) {
              unfollow(subdomain)
                .then(response => {
                  if (response.success) {
                    this.setState({ isFollower: false })
                  }
                })
                .catch(console.error)
            } else {
              follow(subdomain)
                .then(response => {
                  if (response.success) {
                    this.setState({ isFollower: true })
                  }
                })
                .catch(console.error)
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
