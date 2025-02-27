import React from 'react'
import Header from '../../content/header/Header'

const mainImage = {
  big: "/img/home/Anuka_Home.jpeg",
  small: "/img/home/Anuka_Home_small.jpg",
  name: "Anuka playing a sick guitar"
}

function Home() {
  return (
    <div className='home'>
      <Header image={mainImage}/>
    </div>
  )
}

export default Home