import React from 'react'
import dynamic from 'next/dynamic'

const LoadingExpeditionMap = () => (
  <div style={{
    backgroundSize: 'cover',
    width: '100%',
    height: '520px',
    backgroundColor: '#95bcd9',
  }} />
)

export default dynamic({
  ssr: false,
  modules: () => ({
    DynamicMap: import('./DynamicMap'),
    Config: import('../Config'),
  }),
  loading: () => <LoadingExpeditionMap />,
  render: (props, { DynamicMap, Config }) => {
    const { accessToken, mapStyle } = Config
    const mapProps = { accessToken, mapStyle, ...props }
   return <DynamicMap { ...mapProps } />
  },
})
