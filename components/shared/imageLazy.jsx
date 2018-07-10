import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from '../../styles/imageLazy.scss'
import imgLogo from '../../static/img/logo.png'

class ImageLazy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: props.lazyLoad ? imgLogo : (imgLogo || props.image)
    }

    this.load = this.load.bind(this)
  }

  componentDidMount() {
    if (this.props.autoLoad) this.load()
  }

  componentWillUnmount() {
    if (this.img) {
      this.img.onload = null
      this.img = null
    }
  }

  load() {
    const { image } = this.props
    if (image && this.state.image !== image) {
      const img = this.img = new Image()
      img.onload = () => {
        this.setState({ image })
      }
      img.src = image
      if (img.complete) img.onload()
    }
  }

  render() {
    const { width, image, attributes, children, title, className } = this.props

    const style = {}

    if (width) style.width = width
    if (this.state.image) style.backgroundImage = `url('${this.state.image}')`

    const mainClass = classNames(
      'imgRs',
      className, {
      'imgLoaded': this.state.image === image,
    })

    return (
      <div
        className={mainClass}
        style={style}
        title={title}
        {...attributes}
      >
        {children}
      </div>
    )
  }
}

ImageLazy.propTypes = {
  className: PropTypes.string,
  attributes: PropTypes.object,
  autoLoad: PropTypes.bool,
  width: PropTypes.number,
  image: PropTypes.string,
  defaultImage: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  lazyLoad: PropTypes.bool,
  data: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array, PropTypes.object
  ]),
}

ImageLazy.defaultProps = {
  title: '',
  attributes: {},
  autoLoad: true,
  lazyLoad: true,
  data: {},
}

export default ImageLazy
