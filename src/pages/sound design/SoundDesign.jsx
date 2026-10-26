import React, {useState} from 'react'
import SingleVideo from '../../content/pages/sound design/SingleVideo'
import { useAppContext } from '../../lib/AppContext'
import './SoundDesign.scss'

function SoundDesign() {
  const { soundDesigns } = useAppContext();
  const [playingVideo, setPlayingVideo] = useState(null);

  const handleVideoPlay = (reelId) => {
    setPlayingVideo(reelId);
  };

  return (
    <div className='section-sound-design'>
      <div className='section-sound-design-videos'>
        {soundDesigns.map((reel) => (
          <SingleVideo
            key={reel.id}
            reel={reel}
            isPlaying={playingVideo === reel.id}
            onPlay={handleVideoPlay}
          />
        ))}
      </div>
    </div>
  );
}

export default SoundDesign;