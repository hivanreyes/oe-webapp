import React from 'react'
import { shallow } from 'enzyme'
import ObservationCard from '../../components/shared/ObservationCard'

const mockData = (commentsCount = 5) => ({
  data: {
    name: 'Expedition name',
    media: 'banner_url',
    shareText:
      '<b>Observation</b> <i>description</i>' +
      `<script>
         alert('alert')
       </script>`,
    commentsCount,
    locationName: 'Sausalito, California',
    duration: '04 April, 1997',
  },
})

describe('<ExpeditionCard />', () => {
  it('should shallow without errors', () => {
    const card = shallow(<ObservationCard {...mockData()} />)
    expect(card).toMatchSnapshot()
  })
  it('should strip html tags in its description', () => {
    const card = shallow(<ObservationCard {...mockData()} />)
    const description = card.find('.description span').props().children
    const strippedHTML = `Observation description
         alert('alert')
       `
    expect(description).toBe(strippedHTML)
  })
  it('should render `post` when postCount = 1', () => {
    const card = shallow(<ObservationCard {...mockData(1)} />)
    const countLabel = card.find('.postText').props().children
    expect(countLabel).toBe('post')
  })
  it('should render `posts` when postCount > 1', () => {
    const card = shallow(<ObservationCard {...mockData(2)} />)
    const countLabel = card.find('.postText').props().children
    expect(countLabel).toBe('posts')
  })
})
