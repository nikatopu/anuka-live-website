import React, {useState} from 'react'
import SingleVideo from '../../content/pages/sound design/SingleVideo'
import './SoundDesign.scss'

const allVideos = [
  "01. UI Design by Oelhan. Phone Design by Sandro Aleksidze. Sound Design by Me",
  "02. Meet Me at The Back Door. Animation by Nuzi. Music & Sound Design by Me",
  "03. Bubblegum Juicer. Animation by Nuzi. Music & Sound Design by Me",
  "04. Phone. Animation by Nuzi. Music & Sound Design by Me",
  "05. Robotics 2078. Animation by Santoryom. Music & Sound Design by Me",
  "06. Animation by Anano Miminoshvili. Music & Sound Design by Me",
  "07. Pocket Studio Wind. Animation by Tata Managadze. Music & Sound Design by Me",
  "08. Rubber Ducky. Animation by Nuzi. Music & Sound Design by Me",
  "09. Animation by Nuzi. Music & Sound Design by Me",
  "10. Animation by Tata Managadze. Music & Sound Design by Me",
  "11. Animation by Tata Managadze. Music & Sound Design by Me",
  "12. Illustration by Nuzi. Animation by Mariam Topuridze. Music & Sound Design by Me",
  "13. Aniamtion by Tata Zakaraia. Music & Sound Design by Me",
  "13. Aniamtion by Tata Zakaraia, Music & Sound Design by Me",
  "15. Protest. Animation by Nuzi. Music & Sound Design by Me",
  "16. Animation by Ana Chubinidze, Music & Sound Design by Me",
];

function SoundDesign() {
  const [playingVideo, setPlayingVideo] = useState(null);

  const handleVideoPlay = (source) => {
    setPlayingVideo(source);
  };

  return (
    <div className='section-sound-design'>
      <div className='section-sound-design-videos'>
        {allVideos.map((element, index) => (
          <SingleVideo
            key={index}
            source={element}
            isPlaying={playingVideo === element}
            onPlay={handleVideoPlay}
          />
        ))}
      </div>
    </div>
  );
}

export default SoundDesign;