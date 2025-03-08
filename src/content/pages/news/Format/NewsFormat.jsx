import React, { useState } from 'react'
import './NewsFormat.scss'

function NewsFormat({blog}) {
  const [isHovered, setHovered] = useState(false);

  return (
    <div className='newsFormat' id={blog.title} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <img src={blog.image} alt={blog.title}></img>
        <div className='newsFormat-tag-and-link'>
          <span className='billboard-tag'>Billboard</span>
          <a href={blog.redirect} target='_blank' rel="noreferrer" className={isHovered ? "hovered" : ""}>
            View Details
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5875 2.41151L1.99978 7.99923C1.85811 8.1409 1.69143 8.21174 1.49976 8.21174C1.30808 8.21174 1.14141 8.1409 0.999737 7.99923C0.858064 7.85756 0.787228 7.69089 0.787228 7.49921C0.787228 7.30754 0.858065 7.14086 0.999737 6.99919L6.58746 1.41147L1.68726 1.41147C1.48726 1.41147 1.32267 1.34271 1.19349 1.20521C1.06432 1.0677 0.999736 0.898945 0.999736 0.698937C1.00807 0.507263 1.07682 0.342673 1.20599 0.205167C1.33517 0.0676615 1.49976 -0.00109117 1.69976 -0.00109114L8.30003 -0.00109097C8.40003 -0.00109063 8.48962 0.01766 8.56879 0.0551616C8.64796 0.0926632 8.72088 0.144749 8.78755 0.211418C8.85422 0.278087 8.90631 0.351007 8.94381 0.430177C8.98131 0.509346 9.00006 0.598934 9.00006 0.698937L9.00006 7.2992C9.00006 7.48255 8.93131 7.64297 8.7938 7.78047C8.6563 7.91798 8.49171 7.9909 8.30003 7.99923C8.10002 7.99923 7.93127 7.93048 7.79376 7.79297C7.65626 7.65547 7.5875 7.48671 7.5875 7.2867V2.41151Z" fill="#F86830"/>
              </svg> 
          </a>
        </div>
        <h1>{blog.title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h1>
        <p>{blog.desc}</p>
    </div>
  )
}

export default NewsFormat