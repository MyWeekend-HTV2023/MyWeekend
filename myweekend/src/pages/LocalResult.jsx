import React from 'react'
import { Map, Navigation } from './components/Result_Util';
import './styles/LocalResult.css'

function LocalResult() {
  return (
    <>
      <div className="result">
        <Navigation />
        <Map />
      </div>
    </>
  )
}

export default LocalResult;