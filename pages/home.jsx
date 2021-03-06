import React, { Component } from 'react'
import Header from '../components/shared/Header'
import Layout from '../components/shared/Layout'
import {
  Container,
  Image,
  Divider,
  Feed,
} from 'semantic-ui-react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

class Home extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <Header username={this.props.username} />
        <Container className="image-container">
          Aqui nomas
        </Container>
      </Layout>
    )

  }
}

export default Home
