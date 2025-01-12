import React from 'react'
import { Component } from 'react'
import Layout from '../components/layout/Layout';
import '../src/app/global.css'

const _app = () => {
  return (
    <Layout>
        <Component{...pageProps}/>
    </Layout>
  )
}

export default _app