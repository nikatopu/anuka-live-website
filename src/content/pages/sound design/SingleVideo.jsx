import React, { useState, useRef, useEffect } from 'react';
import './SingleVideo.scss';

function SingleVideo({ source, isPlaying, onPlay }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const title = source.slice(11, -5);
  const titleArray = title.split(/\.|,/);
  const videoSource = "/videos/" + source + ".webm";
  const thumbnailSource = "/img/pages/sound design/" + source + ".webp";

  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlay = () => {
    if (videoRef.current && !isPlaying) {
      onPlay(videoSource);
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
        poster={thumbnailSource}
      >
        <source src={videoSource} type="video/webm" />
        <source src={videoSource} type="video/mp4" />
        <source src={videoSource} type="video/mov" />
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