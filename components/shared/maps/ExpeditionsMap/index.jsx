import React from 'react'
import dynamic from 'next/dynamic'

export default dynamic(import('./DynamicMap'), { ssr: false })
