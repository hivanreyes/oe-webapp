import React, { Component } from 'react'
import FilterCards from './filterCards.jsx'

class RecentExpeditions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recent: [],
    }
    this.getByTag = this.getByTag.bind(this)
  }

  componentDidMount = async () =>{
    const { actionFetch } = this.props
    const expeditions = await actionFetch('created', 'all', '20')
    this.setState({ recent: expeditions })
  }

  getByTag = async (tag) => {
    const { actionFetch } = this.props
    let newRecent = await actionFetch('created', tag, '20')
    this.setState({ recent: newRecent })
  }

  render() {
    const { recent } = this.state

    return(
      <FilterCards
        expeditions={recent}
        actions={this.getByTag}
        showAt={1200}
        title={'Recent Expeditions'}
      />
    )
  }
}

export default RecentExpeditions
