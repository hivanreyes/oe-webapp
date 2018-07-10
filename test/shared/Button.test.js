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
    const prim = shallow(<Button label={'Follow'} buttonType={TYPE.PRIMARY} />)
    const sec = shallow(<Button label={'Follow'} buttonType={TYPE.SECONDARY} />)
    const small = shallow(<Button label={'Follow'} size={SIZE.SMALL} />)
    const big = shallow(<Button label={'Follow'} size={SIZE.BIG} />)
    expect(prim.props().className).toBe('button primary small')
    expect(sec.props().className).toBe('button secondary small')
    expect(small.props().className).toBe('button primary small')
    expect(big.props().className).toBe('button primary big')
  })
})
