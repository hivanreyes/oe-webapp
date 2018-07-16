import React from 'react'
import { shallow, mount } from 'enzyme'
import FollowButton from '../../components/shared/FollowButton'
import * as redirect from '../../utils/redirect'

const mockData = (isFollower = false, isAuthenticated = true) => ({
  isAuthenticated,
  isFollower,
  subdomain: 'subdomain',
  follow: () => Promise.resolve({ status: 200 }),
  unfollow: () => Promise.resolve({ status: 200 }),
})

describe('<FollowButton />', () => {
  it('should shallow without errors', () => {
    const btn = shallow(<FollowButton {...mockData()} />)
    expect(btn).toMatchSnapshot()
  })
  it('should mount without errors', () => {
    const btn = mount(<FollowButton {...mockData()} />)
    expect(btn).toMatchSnapshot()
  })
  it('should render label `Follow` if no following', () => {
    const btn = shallow(<FollowButton {...mockData()} />)
    expect(btn.find('Button').props().label).toBe('Follow')
  })
  it('should render label `Following` if following', () => {
    const btn = shallow(<FollowButton {...mockData(true)} />)
    expect(btn.find('Button').props().label).toBe('Following')
  })
  it('should change label `Follow` to `Following` if clicked and is Authenticated', () => {
    const btn = shallow(<FollowButton {...mockData()} />)
    btn.find('Button').prop('onClick')()
    Promise.resolve().then(() => {
      const label = btn
        .update()
        .find('Button')
        .prop('label')
      expect(label).toBe('Following')
    })
  })
  it('should change label `Following` to `Follow` if clicked and is Authenticated', () => {
    const btn = shallow(<FollowButton {...mockData(true)} />)
    btn.prop('onClick')()
    Promise.resolve().then(() => {
      const label = btn
        .update()
        .find('Button')
        .prop('label')
      expect(label).toBe('Follow')
    })
  })
  it('should call `redirect` if user is not authenticated', () => {
    const spy = jest.spyOn(redirect, 'default')
    const btn = shallow(<FollowButton {...mockData(false, false)} />)
    btn
      .prop('onClick')()
      .then(() => {
        throw new Error('Should throw an error.')
      })
      .catch(err => {
        expect(err).toBeInstanceOf(Error)
      })
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
