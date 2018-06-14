import React from 'react'
import dynamic from 'next/dynamic'
import { Image } from 'semantic-ui-react'

/*
 * This component is a wrapper for rendering a placeholder in the backend
 * that will initailly ocupy the space of the actual Nav Bar that right now
 * is only possible to be rendered on the front end
 */
const NavBarPlaceholder = () => (
  <div className="ng-globalnav">
    <div className="ng-global-navigation-container">
      <div className="ng-global-navigation">
        <ul className="ng-global-navigation__list" />
      </div>
    </div>
    <div className="gn_sticky-container">
      <div className="gn_sticky-component static">
        <div className="ng-contextual-navigation-container">
          <div className="ng-contextual-navigation">
            <div className="ng-logo-box">
              <a href="http://www.natgeo.com">
                <Image
                  src="/static/img/NatGeoLogo.png"
                  verticalAlign="middle"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
const NavBarWrapper = dynamic({
  ssr: false,
  modules: () => {
    const components = {
      GlobalNavBar: import('@natgeo/modules-global-nav'),
    }
    return components
  },
  loading: () => <NavBarPlaceholder />,
  render: (props, { GlobalNavBar }) => <GlobalNavBar {...props} />,
})

export default NavBarWrapper