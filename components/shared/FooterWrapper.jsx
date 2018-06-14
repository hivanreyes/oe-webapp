import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import classnames from 'classnames'
import '../../node_modules/@natgeo/modules-global-footer/lib/GlobalFooter.css'
import '@natgeo/modules-global-footer/lib/GlobalFooter.css';


const FooterPlaceholder = () => (
  <div className={classnames('gf2_content', 'mt_row')}>
    <div className={classnames('gf2_left-rail', 'mt_col-12', 'mt_col-md-7')} />
    <div className={classnames('gf2_right-rail', 'mt_col-12', 'mt_col-md-4', 'mt_col-md-offset-1')} />
  </div>
)

const FooterWrapper = dynamic({
  ssr: false,
  modules: () => {
    const components = {
      GlobalFooter: import('@natgeo/modules-global-footer'),
    }
    return components
  },
  loading: () => <FooterPlaceholder />,
  render: (dynamicComponentData, { GlobalFooter }) => {
    GlobalFooter({ DOMElement: `#${dynamicComponentData.wrapperId}` })
    /*
      We can't return null here, it seems next dynamic import is expecting
      an html element, otherwise is not removing the loading placeholder.
     */
    return <div />
  },
})

class FooterContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.wrapperId !== this.props.wrapperId
  }

  render() {
    return (
      <div id={this.props.wrapperId}>
        <FooterWrapper wrapperId={this.props.wrapperId} />
      </div>
    )
  }
}

FooterContainer.propTypes = {
  wrapperId: PropTypes.string.isRequired,
}

export default FooterContainer
