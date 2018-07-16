import React from 'react'
import dynamic from 'next/dynamic'
import Button from './Button'
import FollowButton from './FollowButton'

const FollowButtonPlaceHolder = () => <Button label={'Follow'} />

const DynamicFollowButton = dynamic({
  ssr: false,
  modules: () => ({ FollowButton: import('./FollowButton') }),
  loading: () => <FollowButtonPlaceHolder />,
  render: (props, { FollowButton }) => <FollowButton {...props} />
})

DynamicFollowButton.propTypes = FollowButton.propTypes

export default DynamicFollowButton
