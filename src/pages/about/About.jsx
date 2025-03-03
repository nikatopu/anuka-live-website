import React from 'react'
import PageGradients from '../../content/PageGradients'
import "./About.scss"

function About() {
  return (
    <div className='about'>
      <PageGradients />
      <div className='sections'>
        <div className='sections-header'>
          <img src="/img/pages/about/aboutHeader.png" alt="Anuka Kipshidze"/>
          <p>A musician, producer, sound designer, and multi-instrumentalist from Tbilisi, Georgia.</p>
        </div>
      </div>
    </div>
  )
}

export default About