import React from 'react'
import { shallow } from 'enzyme'
import ExpeditionCard from '../../components/shared/ExpeditionCard'

const mockData = (postCount = 5) => ({
  data: {
    name: 'Expedition name',
    banner: 'banner_url',
    description: '<b>Expedition</b> <i>description</i>',
    postCount,
    firstLocation: 'Sausalito, California',
    duration: '04 April, 1997',
  },
})

describe('<ExpeditionCard />', () => {
  it('should shallow without errors', () => {
    const card = shallow(<ExpeditionCard {...mockData()} />)
    expect(card).toMatchSnapshot()
  })
  it('should strip html tags in its description', () => {
    const card = shallow(<ExpeditionCard {...mockData()} />)
    const description = card.find('.description span').props().children
    expect(description).toBe('Expedition description')
  })
  it('should render `post` when postCount = 1', () => {
    const card = shallow(<ExpeditionCard {...mockData(1)} />)
    const countLabel = card.find('.postText').props().children
    expect(countLabel).toBe('post')
  })
  it('should render `posts` when postCount > 1', () => {
    const card = shallow(<ExpeditionCard {...mockData(2)} />)
    const countLabel = card.find('.postText').props().children
    expect(countLabel).toBe('posts')
  })
})
