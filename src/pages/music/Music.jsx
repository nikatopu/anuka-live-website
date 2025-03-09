import React, { useState } from 'react'
import allMusic from '../../content/pages/music/music'
import TrackTile from '../../content/pages/home/music/tiles/TrackTile'
import "./Music.scss"

function Music() {
  const [filters, setFilters] = useState([])

  const handleFilter = (text) => {
    if (filters[0] !== text) setFilters([text])
    else setFilters([])
  }

  return (
    <div className='section-musicpage'>
      <div className='section-musicpage-filters'>
        <button onClick={() => handleFilter("Album")} className={filters.includes("Album") ? "isActive" : ""}>Albums</button>
        <button onClick={() => handleFilter("Track")} className={filters.includes("Track") ? "isActive" : ""}>Tracks</button>
        <button onClick={() => handleFilter("Collab")} className={filters.includes("Collab") ? "isActive" : ""}>Collabs</button>
      </div>
      <div className='section-musicpage-allmusic'>
        <div className='section-musicpage-allmusic-wrapper'>
          {allMusic.filterByTags(filters).map(e => {
            return <TrackTile nameTrack={e.title} descTrack={e.desc} linksTrack={e.links} imageTrack={e.image}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default Music