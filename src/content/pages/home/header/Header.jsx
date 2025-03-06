import React from 'react'
import "./Header.scss"

/**
 * For adding a header section with different images, same text
 * @param {object} image image object with 3 parameters: image.big for big picture location, image.small for small picture location and image.name for the alt text
 */
function Header({image}) {
  return (
    <div className='header' id='header'>
        <picture>
            <source media="(min-width:800px)" srcset={image.big} />
            <source media="(max-width:800px)" srcset={image.small} />
            <img src={image.big} alt={image.name} />
        </picture>
        <div className='header_desc'>
            <img src="/img/musician.png" alt='Musician' className='musician Anuka Kipshidze'/>
            <p>
                Musician, Producer, Sound designer and multi-instrumentalist from Tbilisi, Georgia.
            </p>
            <div className='header_desc_links'>
                <a className='header_desc_links_link' rel="noreferrer" target='_blank' href='https://open.spotify.com/artist/1OLjpisqHVt8FvCdjRj9Zc?si=5LGUJUDlSK6d0tiac9aLtw&nd=1&dlsi=91c40b2410164dc8'>
                    <img src='/svg/spotify.svg' alt='Spotify Logo'/>
                </a>
                <a className='header_desc_links_link' rel="noreferrer" target='_blank' href='https://music.apple.com/us/artist/anuka-kipshidze/1697978770'>
                    <img src='/svg/imusic.svg' alt='imusic Logo'/>
                </a>
                <a className='header_desc_links_link' rel="noreferrer" target='_blank' href='https://www.youtube.com/@kipshidzeanuka'>
                    <img src='/svg/youtube.svg' alt='youtube Logo'/>
                </a>
                <a className='header_desc_links_link' rel="noreferrer" target='_blank' href='https://soundcloud.com/akipshidze'>
                    <img src='/svg/soundcloud.svg' alt='soundcloud Logo'/>
                </a>
                <a className='header_desc_links_link' rel="noreferrer" target='_blank' href='https://akipshidze.bandcamp.com/'>
                    <img src='/svg/bandcamp.svg' alt='bandcamp Logo'/>
                </a>
            </div>
        </div>
    </div>
  )
}

export default Header