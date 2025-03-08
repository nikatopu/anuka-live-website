import React, { useState, useRef } from 'react';
import './SingleVideo.scss';

function SingleVideo({ source }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const title = source.slice(11, -5);
  const titleArray = title.split(/\.|,/)

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
        >
            <source src={source} type="video/webm" />
            <source src={source} type="video/mp4" />
            <source src={source} type="video/mov" />
            Your browser does not support the video tag.
        </video>
        <div className='text-holder'>
        {
          titleArray.map(text => {
            return <span className="video-container-subtext">{text.trim()}</span>
          })
        }
        </div>
    </div>
  );
}

export default SingleVideo;