import React, { Component } from 'react'
import FilterCards from './filterCards.jsx'

class FilterPopular extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popular: [],
    }
    this.getByTag = this.getByTag.bind(this)
  }

  componentDidMount = async () =>{
    const { actionFetch } = this.props
    const expeditions = await actionFetch('popular', 'all', '20')
    this.setState({ popular: expeditions })
  }

  getByTag = async (tag) => {
    const { actionFetch } = this.props
    let newPopular = await actionFetch('popular', tag, '20')
    this.setState({ popular: newPopular })
  }

  render() {
    const { popular } = this.state

    return(
      <FilterCards
        expeditions={popular}
        actions={this.getByTag}
        showAt={1200}
        title={'Popular Expeditions'}
      />
    )
  }
}

export default FilterPopular
