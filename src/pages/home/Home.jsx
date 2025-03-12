import React from 'react'
import Header from '../../content/pages/home/header/Header'
import './Home.scss'
import MusicSection from '../../content/pages/home/music/MusicSection'
import NewsSection from '../../content/pages/home/news/NewsSection'
// import Events from '../../content/pages/home/events/Events'
import Contact from '../../content/pages/home/contact/Contact'
import PageGradients from '../../content/PageGradients'

const mainImage = {
  big: "/img/pages/home/home/Anuka_Home.jpeg",
  small: "/img/pages/home/home/Anuka_Home_small.jpg",
  name: "Anuka playing a sick guitar"
}

function Home() {
  return (
    <div className='home'>
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