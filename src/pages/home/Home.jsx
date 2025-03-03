import React from 'react'
import Header from '../../content/header/Header'
import './Home.scss'
import MusicSection from '../../content/music/MusicSection'
import NewsSection from '../../content/news/NewsSection'
// import Events from '../../content/events/Events'
import Contact from '../../content/contact/Contact'
import PageGradients from '../../content/PageGradients'

const mainImage = {
  big: "/img/home/Anuka_Home.jpeg",
  small: "/img/home/Anuka_Home_small.jpg",
  name: "Anuka playing a sick guitar"
}

function Home() {
  return (
    <div className='home'>
      <PageGradients />
      <div className='sections'>
        <div className='sections-margined'>
          <Header image={mainImage}/>
          <MusicSection />
          <NewsSection />
          {/* <Events /> */}
        </div>
        <Contact />
      </div>
    </div>
  )
}

export default Home