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
    const expeditions = await actionFetch()
    this.setState({ popular: expeditions })
  }

  getByTag = async (tag) => {
    const { store } = this.props
    let newPopular = []
    switch(tag) {
      case 'all':
        newPopular = await store.popularAll
        break
      case 'air':
        newPopular = await store.popularAir
        break
      case 'land':
        newPopular = await store.popularLand
        break
      case 'sea':
        newPopular = await store.popularSea
        break
      case 'urban':
        newPopular = await store.popularUrban
        break
      case 'backyard':
        newPopular = await store.popularBackyard
        break
    }
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
