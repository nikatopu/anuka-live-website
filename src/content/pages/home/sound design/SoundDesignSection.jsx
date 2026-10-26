import React, { useState } from 'react';
import "./SoundDesignSection.scss";
import { Link } from 'react-router-dom';
import SingleVideo from '../../sound design/SingleVideo';
import { useAppContext } from '../../../../lib/AppContext';

function SoundDesignSection() {
  const { soundDesigns } = useAppContext();
  const [playingVideo, setPlayingVideo] = useState(null);

  const handleVideoPlay = (reelId) => {
    setPlayingVideo(reelId);
  };

  return (
    <div className="section-home-sound-design">
      <div className="section-home-sound-design-header">
        <img src="/svg/soundDesignSection.svg" alt="Sound Design section" />
        <Link to={"/sound-design"} onClick={() => window.scrollTo(0, 0)}>See All</Link>
      </div>
      <div className="section-home-sound-design-body">
        {/* The 4 newest reels */}
        {soundDesigns.slice(0, 4).map((reel) => (
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

export default SoundDesignSection;