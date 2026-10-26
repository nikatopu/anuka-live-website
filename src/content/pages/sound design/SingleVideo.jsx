import React, { useState, useRef, useEffect } from 'react';
import './SingleVideo.scss';

// `reel` is a sound design record from /api/get/sound-designs
function SingleVideo({ reel, isPlaying, onPlay }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const titleArray = reel.title.split(/\.|,/).filter((text) => text.trim());

  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlay = () => {
    if (videoRef.current && !isPlaying) {
      onPlay(reel.id);
    }
  };

  return (
    <div
      className="video-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        controls={isHovered}
        width="320"
        height="560"
        loop
        onPlay={handlePlay}
        poster={reel.thumbnailUrl}
        src={reel.videoUrl}
      >
        Your browser does not support the video tag.
      </video>
      <div className='text-holder'>
        {titleArray.map((text, index) => (
          <span key={index} className="video-container-subtext">{text.trim()}</span>
        ))}
      </div>
    </div>
  );
}

export default SingleVideo;