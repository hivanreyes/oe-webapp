import React, { Component } from 'react'
import getConfig from 'next/config'
import { Container, Image, Divider, Feed, } from 'semantic-ui-react'
import Layout from '../components/shared/Layout.jsx'
import Carousel from '../components/home/carousel.jsx'
import Header from '../components/shared/Header.jsx'

const { publicRuntimeConfig } = getConfig()

class Home extends Component {
  render() {
    return (
      <Layout>
        <Header username={this.props.username} />
        <Container className="image-container">
          <Carousel />
        </Container>
      </Layout>
    )
  }
}

export default Home
