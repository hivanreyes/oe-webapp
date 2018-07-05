import React from 'react'
import dynamic from 'next/dynamic'

export default dynamic({
  ssr: false,
  modules: () => ({
    DynamicMap: import('./DynamicMap'),
    Config: import('../Config')
  }),
  render: (props, { DynamicMap, Config }) => {
    const { accessToken, mapStyle } = Config
    const mapProps = { accessToken, mapStyle, ...props }
   return <DynamicMap { ...mapProps } />
  },
})
