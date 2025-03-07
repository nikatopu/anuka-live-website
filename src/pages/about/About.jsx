import React from 'react'
import PageGradients from '../../content/PageGradients'
import "./About.scss"

function About() {
  return (
    <div className='about'>
      <PageGradients />
      <div className='sections-about'>
        <div className='sections-about-header'>
          <img src="/img/pages/home/about/aboutHeader.png" alt="Anuka Kipshidze"/>
          <p>A musician, producer, sound designer, and multi-instrumentalist from Tbilisi, Georgia.</p>
        </div>
        <div className='about-me'>
          <div className='about-me-left'>
            <h2>About me</h2>
            <p>
              Music has been in my life since childhood, shaped by my family's deep musical roots. With a pianist mother and grandmother 
              and a multi-instrumentalist father, I found my rhythm early. At six, I started playing piano, and the stage quickly became my second home.
            </p>
            <img src="/img/pages/home/about/family.png" alt="Anuka Kipshidze's family"/>
          </div>
          <div className='about-me-right'>
            <img src="/img/pages/home/about/AnukaAsAChild.png" alt="Anuka Kipshidze as a child"/>
          </div>
        </div>
        <div className='mid-section'>
          <h3>
            After music school, I taught myself guitar and bass, joining the Georgian indie band "კოლექტივი" and performing at Tbilisi Open Air and Rokva Festival.
          </h3>
        </div>
        <div className='text-and-photos'>
          <div className='text'>
            <h4>Newcommers</h4>
            <p>
              As I collaborated with local artists, I often played bass guitar as a session musician. However, I always wanted to focus more on my own music. 
              In 2023, I won the NewComers competition with my friend and fellow musician Anamaria Burduli (Anman), and we performed on the Tbilisi Open Air stage 
              for the second time, presenting both Anamaria's music and my own.
            </p>
          </div>
          <div className='photos'>
            <img src="/img/pages/home/about/AnukaNewcommers.png" alt="Anuka Kipshidze at Newcommers"/>
          </div>
        </div>
        <div className='text-and-photos'>
          <div className='text'>
            <h4>Debut Album</h4>
            <p>
            In the summer of 2023, I began working on my debut album, which was officially released on all music platforms on April 4, 2024. The album features 8 tracks, blending genres such as electronic, experimental, alternative, rock, and rap. I used 8-bit synthesizers, drawing inspiration from the retro video games of my childhood.
            <br />
            <br /> 
            The album explores themes of chaos, anger, melancholy, and energy through distorted guitars, synths, and dynamic blasts. The track names play with words, carrying double meanings that add depth to their interpretation.
            </p>
          </div>
          <div className='photos photos-many'>
            <img src="/img/pages/home/about/AnukaWorking.png" alt="Anuka Kipshidze working"/>
            <img src="/img/pages/home/about/AnukaLooking.png" alt="Anuka Kipshidze looking at the camera"/>
          </div>
        </div>
        <div className='mid-section'>
          <h4>
            Following the release of my album, I performed live and realized that my music needed to be even more engaging and memorable, with more connection and interaction with the audience. This inspired me to keep creating and frequently release new music to keep my listeners excited.
          </h4>
        </div>
      </div>
    </div>
  )
}

export default About