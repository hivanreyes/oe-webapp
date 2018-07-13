import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import style from './styles/button.scss'

export const TYPE = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
}

export const SIZE = {
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

const Button = props => {
  const { label, onClick } = props
  const buttonClassNames = getButtonClassNames(props)
  return (
    <button onClick={onClick} className={buttonClassNames}>
      {label}
    </button>
  )
}

Button.defaultProps = {
  buttonType: TYPE.PRIMARY,
  size: SIZE.SMALL,
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  buttonType: PropTypes.oneOf([TYPE.PRIMARY, TYPE.SECONDARY]),
  size: PropTypes.oneOf([SIZE.SMALL, SIZE.BIG]),
  onClick: PropTypes.func,
}

export default Button
