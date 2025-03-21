import React, { useState } from 'react';
import "./SoundDesignSection.scss";
import { Link } from 'react-router-dom';
import SingleVideo from '../../sound design/SingleVideo';

// Top 4 videos to display in the section
const topVideos = [
  "01. UI Design by Oelhan. Phone Design by Sandro Aleksidze. Sound Design by Me",
  "02. Meet Me at The Back Door. Animation by Nuzi. Music & Sound Design by Me",
  "03. Bubblegum Juicer. Animation by Nuzi. Music & Sound Design by Me",
  "04. Phone. Animation by Nuzi. Music & Sound Design by Me",
];

function SoundDesignSection() {
  const [playingVideo, setPlayingVideo] = useState(null);

  const handleVideoPlay = (source) => {
    setPlayingVideo(source);
  };

  return (
    <div className="section-home-sound-design">
      <div className="section-home-sound-design-header">
        <img src="/svg/soundDesignSection.svg" alt="Sound Design section" />
        <Link to={"/sound-design"} onClick={() => window.scrollTo(0, 0)}>See All</Link>
      </div>
      <div className="section-home-sound-design-body">
        {topVideos.map((source, index) => (
          <SingleVideo
            key={index}
            source={source}
            isPlaying={playingVideo === source}
            onPlay={handleVideoPlay}
          />
        ))}
      </div>
    </div>
  );
}

export default SoundDesignSection;