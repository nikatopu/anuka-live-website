import React, { useState, useRef, useEffect } from 'react';
import './SingleVideo.scss';

function SingleVideo({ source, isPlaying, onPlay }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const title = source.slice(11, -5);
  const titleArray = title.split(/\.|,/);

  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlay = () => {
    if (videoRef.current && !isPlaying) {
      onPlay(source);
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
      >
        <source src={source} type="video/webm" />
        <source src={source} type="video/mp4" />
        <source src={source} type="video/mov" />
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