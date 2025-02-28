import React, { useState } from 'react';
import './TrackTile.scss';

/**
 * Creates a tile for the track
 * @param {object} imageTrack the image object including image.small, image.big, image.name
 * @param {string} nameTrack the name of the track
 * @param {string} descTrack the description of the track
 * @param {object} linksTrack links object, including up to 5 links: Spotify, iMusic, YouTube, SoundCloud, BandCamp
 * @returns 
 */
function TrackTile({ imageTrack, nameTrack, descTrack, linksTrack }) {
    const [isHovered, setIsHovered] = useState(false);

    const linkTypes = [
        { key: 'spotify', image: '/svg/spotify.svg' },
        { key: 'imusic', image: '/svg/imusic.svg' },
        { key: 'youtube', image: '/svg/youtube.svg' },
        { key: 'soundcloud', image: '/svg/soundcloud.svg' },
        { key: 'bandcamp', image: '/svg/bandcamp.svg' },
    ];

    return (
        <div className='tracktile'>
            <div className='tracktile_picture'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                <picture>
                    <source media="(min-width:800px)" srcSet={imageTrack?.big} />
                    <source media="(max-width:800px)" srcSet={imageTrack?.small} />
                    <img src={imageTrack?.big} alt={imageTrack?.name} className={isHovered ? 'hovered' : ''}/>
                </picture>
                <div className={`tracktile_links ${isHovered ? 'tracktile_links_hovered' : ''}`}>
                {linkTypes.map((link) => {
                    if (linksTrack[link.key]) {
                        return (
                            <div key={link.key} className="link-item">
                                <a href={linksTrack[link.key]} target="_blank" rel="noopener noreferrer">
                                    <img src={link.image} alt={link.key + " logo"} />
                                </a>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            </div>
            
            <h2>
                {nameTrack}
            </h2>
            <p>
                {descTrack}
            </p>
        </div>
    );
}

export default TrackTile;