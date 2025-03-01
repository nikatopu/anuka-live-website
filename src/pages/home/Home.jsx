import React from 'react'
import Header from '../../content/header/Header'
import './Home.scss'
import MusicSection from '../../content/music/MusicSection'
import NewsSection from '../../content/news/NewsSection'

const mainImage = {
  big: "/img/home/Anuka_Home.jpeg",
  small: "/img/home/Anuka_Home_small.jpg",
  name: "Anuka playing a sick guitar"
}

function Home() {
  return (
    <div className='home'>
      <div className='gradient gradient_one'></div>
      <div className='gradient gradient_two'></div>
      <div className='gradient gradient_three'></div>
      <div className='sections'>
        <Header image={mainImage}/>
        <MusicSection/>
        <NewsSection />
      </div>
    </div>
  )
}

export default Home