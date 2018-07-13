import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
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
    console.log('auth:', isAuthenticated)
    return (
      <Button
        onClick={() => {
          if (isAuthenticated) {
            if (isFollower) {
              unfollow(subdomain)
                .then(response => {
                  console.log(response)
                  if (response.success) {
                    this.setState({ isFollower: true })
                  }
                })
                .catch(cosas => console.log('cosas', cosas.message))
            } else {
              follow(subdomain)
                .then(response => {
                  console.log(response)
                  if (response.success) {
                    this.setState({ isFollower: false })
                  }
                })
                .catch(cosas => console.log('cosas', cosas.message))
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
