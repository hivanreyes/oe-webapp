import React, { Component } from 'react'
import Layout from '../components/shared/Layout'
import HomeContainer from '../components/home/homeContainer'
import Header from '../components/shared/Header'
import { autorun } from 'mobx'
import { Provider } from 'mobx-react'
import { initHomeStore, initSessionStore } from '../stores'

class Home extends Component {
  constructor(props) {
    super(props)
    this.homeStore = initHomeStore()
    this.sessionStore = initSessionStore('production')
    this.state = { isAuthenticated: !!this.sessionStore.sessionId }
  }

  componentDidMount() {
    autorun(() => {
      this.setState({ isAuthenticated: !!this.sessionStore.sessionId })
    })
  }

  render() {
    return (
      <Provider homeStore={this.homeStore} sessionStore={this.sessionStore}>
        <Layout>
          <Header />
          <HomeContainer />
        </Layout>
      </Provider>
    )
  }
}

export default Home
