import React from 'react'
import SingleVideo from '../../content/pages/sound design/SingleVideo'
import './SoundDesign.scss'
import PageGradients from '../../content/PageGradients'

const allVideos = [
  "/videos/01. UI Design by Oelhan. Phone Design by Sandro Aleksidze. Sound Design by Me.webm",
  "/videos/02. Meet Me at The Back Door. Animation by Nuzi. Music & Sound Design by Me.webm",
  "/videos/03. Bubblegum Juicer. Animation by Nuzi. Music & Sound Design by Me.webm",
  "/videos/04. Phone. Animation by Nuzi. Music & Sound Design by Me.webm",
  "/videos/05. Robotics 2078. Animation by Santoryom. Music & Sound Design by Me.webm",
  "/videos/06. Animation by Anano Miminoshvili. Music & Sound Design by Me.webm",
  "/videos/07. Pocket Studio Wind. Animation by Tata Managadze. Music & Sound Design by Me.webm",
  "/videos/08. Rubber Ducky. Animation by Nuzi. Music & Sound Design by Me.webm",
  "/videos/09. Animation by Nuzi. Music & Sound Design by Me.webm",
  "/videos/10. Animation by Tata Managadze. Music & Sound Design by Me.webm",
  "/videos/11. Animation by Tata Managadze. Music & Sound Design by Me.webm",
  "/videos/12. Illustration by Nuzi. Animation by Mariam Topuridze. Music & Sound Design by Me.webm",
  "/videos/13. Aniamtion by Tata Zakaraia. Music & Sound Design by Me.webm",
  "/videos/13. Aniamtion by Tata Zakaraia, Music & Sound Design by Me.webm",
  "/videos/15. Protest. Animation by Nuzi. Music & Sound Design by Me.webm",
  "/videos/16. Animation by Ana Chubinidze, Music & Sound Design by Me.webm",
]

function SoundDesign() {

  return (
    <div className='section-sound-design'>
      <div className='section-sound-design-videos'>
        {allVideos.map(element => {
          return <SingleVideo source={element}/>
        })}
      </div>
    </div>
  )
}

export default SoundDesign