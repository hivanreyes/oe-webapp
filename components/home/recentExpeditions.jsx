/*import React, { Component } from 'react'
import FilterCards from './filterCards.jsx'

class RecentExpeditions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recent: [],
    }
    this.getByTag = this.getByTag.bind(this)
  }

  componentWillMount = async () =>{
    const { store } = this.props
    const expeditions = await store.fetchRecent()
    this.setState({ recent: expeditions })
  }

  getByTag = async (tag) => {
    const { store } = this.props
    let newRecent = []
    switch(tag) {
      case 'all':
        newRecent = await store.recentAll
        break
      case 'air':
        newRecent = await store.recentAir
        break
      case 'land':
        newRecent = await store.recentLand
        break
      case 'sea':
        newRecent = await store.recentSea
        break
      case 'urban':
        newRecent = await store.recentUrban
        break
      case 'backyard':
        newRecent = await store.recentBackyard
        break
    }
    this.setState({ recent: newRecent })
  }

  render() {
    const { recent } = this.state
    console.log(recent)

    return(
      <FilterCards
        expeditions={recent}
        actions={this.getByTag}
        showAt={1200}
      />
    )
  }
}

export default RecentExpeditions*/
