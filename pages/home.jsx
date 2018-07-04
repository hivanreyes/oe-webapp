import React, { Component } from 'react'
import getConfig from 'next/config'
import Layout from '../components/shared/Layout'
import HomeContainer from '../components/home/homeContainer'
import Header from '../components/shared/Header'
import { Provider } from 'mobx-react'
import { initHomeStore } from '../stores'

const { publicRuntimeConfig } = getConfig()


class Home extends Component {
  constructor(props) {
    super(props)
    this.homeStore = initHomeStore()
  }

  render() {
    return (
      <Provider homeStore={this.homeStore}>
        <Layout>
          <Header />
          <HomeContainer />
        </Layout>
      </Provider>
    )
  }
}

export default Home
