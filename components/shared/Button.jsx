import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import style from './styles/button.scss'

const TYPE = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
}

const SIZE = {
  BIG: 'BIG',
  SMALL: 'SMALL',
}

const getButtonClassNames = ({ buttonType, size }) =>
  cx({
    [style.button]: true,
    [style.primary]: buttonType === TYPE.PRIMARY,
    [style.secondary]: buttonType === TYPE.SECONDARY,
    [style.big]: size === SIZE.BIG,
    [style.small]: size === SIZE.SMALL,
  })

const WrappedButton = props => {
  const { label } = props
  const buttonClassNames = getButtonClassNames(props)
  return <button className={buttonClassNames}>{label}</button>
}

WrappedButton.defaultProps = {
  buttonType: TYPE.PRIMARY,
  size: SIZE.SMALL,
}

WrappedButton.propTypes = {
  label: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  size: PropTypes.string,
}

export default WrappedButton
