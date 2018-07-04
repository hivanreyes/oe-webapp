import React, { Component } from 'react'
import getConfig from 'next/config'
import { Container } from 'semantic-ui-react'
import Layout from '../components/shared/Layout'
import Carousel from '../components/home/carousel'
import Header from '../components/shared/Header'
import Filter from '../components/shared/Filter'
import ObservationCard from '../components/shared/ObservationCard'

const { publicRuntimeConfig } = getConfig()

class Home extends Component {
  render() {
    return (
      <Layout>
        <Header username={this.props.username} />
        <Container className="image-container">
          <Carousel />
        </Container>
        <Filter title={'Sopotamadre'}/>
        <ObservationCard
          data={{
            name: 'MPA Watch',
            media:
              'https://s3-us-west-2.amazonaws.com/openexplorer-media-assets/images/f63576f8-e537-4d1c-8af7-b6fc3c9a714b-large.jpg?v=x',
            shareText:
              'Thrity oinfweoin weoinfweonfiowenfoiewnfioewnfoiwenfwieo noiwnfwoienfiowenfwoinfowenoifnaeoifnoaiwenfoiwnfoiwn fioweanfoiwenfoiwenafiowanfiownfoiawnfionwionweiofnweoifnwioa',
            commentsCount: 10,
            locationName: 'Sausalito, California',
          }}
        />
      </Layout>
    )
  }
}

export default Home
