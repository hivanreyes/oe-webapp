/* eslint-disable no-console */
import React from 'react'
import { shallow, render } from 'enzyme'
import FeaturedExpedition from '../../components/home/FeaturedExpedition'

console.error = jest.fn()

const mockData = () => ({
  banner:
    'https://wizeline-website-assets.s3.amazonaws.com/wp-content/themes/wizeline-website/assets/img/hero-teams@2x.jpg',
  name: 'Wizeline',
  firstLocation: 'Zapopan, Jalisco, México',
  duration: '04 May, 2018',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
    'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
})

const mockAction = () => Promise.resolve([mockData()])

describe('<FeaturedExpedition />', () => {
  it('should shallow without errors', () => {
    const fe = shallow(<FeaturedExpedition {...mockData()} />)
    expect(fe).toMatchSnapshot()
  })
  it('should render without errors', () => {
    const fe = render(<FeaturedExpedition {...mockData()} />)
    expect(fe).toMatchSnapshot()
  })
  it('should update its state when the fetchAction is completed', () => {
    const fe = shallow(<FeaturedExpedition fetchAction={mockAction} />)
    mockAction().then(() => {
      expect(fe.state()).toEqual({ data: mockData() })
    })
  })
  it('should log an error if no data or actionFetch is provided', () => {
    shallow(<FeaturedExpedition />)
    expect(console.error).toBeCalled()
  })
})
