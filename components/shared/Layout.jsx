import React from 'react'
import PropTypes from 'prop-types'
import NavBarWrapper from './NavBarWrapper'
import FooterWrapper from './FooterWrapper'
import Head from 'next/head'
import getConfig from 'next/config'

const config = getConfig()
const isDev = process.env.NODE_ENV !== 'production'

const PROPS = {
  activeCountry: {
    title: 'United States',
    iso_code: 'USA',
  },
  endpoint:
    'https://appservices.nationalgeographic.com/api/v1/globalnav/grouped/?contextualnav__sitemenu__topnav=explorers-nat-geo&show_card',
  loadRegistration: true,
  searchURL: 'http://nationalgeographic.co.uk/search',
  showCardsOnExplore: true,
  showContextualNav: true,
  showCountryDropdown: true,
  showSearch: false,
  showShop: false,
  display: 'skinny',
  showSubscribe: true,
  stickyContextualNavigation: true,
}

const Layout = ({ children }) => (
  <div>
    <Head>
      <link rel="stylesheet" href="/static/css/styles.min.css" />
    </Head>
    <NavBarWrapper {...PROPS} />
    <div>{children}</div>
    <FooterWrapper wrapperId={'algun-id'} />
  </div>
)

Layout.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Layout
