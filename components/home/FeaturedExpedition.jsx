import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TruncateMarkup from 'react-truncate-markup'
import style from './featuredExpedition.scss'
import Button from '../shared/Button'

class FeaturedExpedition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        banner: '',
        name: '',
        firstLocation: '',
        duration: '',
        description: '',
      }
    }
  }

  async componentDidMount() {
    const data = await this.props.fetchAction()
    this.setState({ data: data[0] })
  }

  render() {
    const {
      banner,
      name,
      firstLocation,
      duration,
      description,
    } = this.state.data
    return (
      <div className={style.featuredExpedition}>
        <div className={style.container}>
          <img src={banner} className={style.image} alt={name} />
          <div className={style.left}>
            <div className={style.metadata}>{`${firstLocation}, ${duration}`}</div>
            <div className={style.title}>{name}</div>
            <TruncateMarkup lines={5}>
              <div>
                <span className={style.subtitle}>
                  {description.replace(/<(?:.|\n)*?>/gm, '')}
                  </span>
              </div>
            </TruncateMarkup>
            <br />
            <Button label="Follow" />
          </div>
        </div>
      </div>
    )
  }
}

FeaturedExpedition.propTypes = {
  fetchAction: PropTypes.func.isRequired
}

export default FeaturedExpedition
