import React from 'react'
import "./PageGradients.scss"
import FadeIn from './FadeIn'

function PageGradients() {
  return (
    <FadeIn Section={
        <div className='gradient_holder'>
          <div className='gradient gradient_one'></div>
          <div className='gradient gradient_two'></div>
          <div className='gradient gradient_three'></div>
        </div>
      } />
  )
}

export default PageGradients