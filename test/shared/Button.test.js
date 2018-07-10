import React from 'react'
import { shallow } from 'enzyme'
import Button, { TYPE, SIZE } from '../../components/shared/Button'

describe('<Button />', () => {
  it('should shallow without errors', () => {
    const btn = shallow(<Button label={'Follow'} />)
    expect(btn).toMatchSnapshot()
  })
  it('should render label as its child', () => {
    const btn = shallow(<Button label={'Follow'} />)
    expect(btn.props().children).toBe('Follow')
  })
  it('should have `button primary small` as default className', () => {
    const btn = shallow(<Button label={'Follow'} />)
    expect(btn.props().className).toBe('button primary small')
  })
  it('should change its className depending on buttonType and size', () => {
    const btnPrimary = shallow(<Button label={'Follow'} buttonType={TYPE.PRIMARY} />)
    const btnSecondary = shallow(<Button label={'Follow'} buttonType={TYPE.SECONDARY} />)
    const btnSmall = shallow(<Button label={'Follow'} size={SIZE.SMALL} />)
    const btnBig = shallow(<Button label={'Follow'} size={SIZE.BIG} />)
    expect(btnPrimary.props().className).toBe('button primary small')
    expect(btnSecondary.props().className).toBe('button secondary small')
    expect(btnSmall.props().className).toBe('button primary small')
    expect(btnBig.props().className).toBe('button primary big')
  })
})
