import React, { useState, useRef, useEffect } from 'react';
import './MusicSection.scss';
import { Link } from 'react-router-dom';
import TrackTile from './tiles/TrackTile';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons

function MusicSection() {
    const tracks = [
        {
            name: "Ma Tsa De",
            desc: "Artwork by Tata Zakaraia",
            links: {
                spotify: "https://open.spotify.com/album/7wxdEPGJMilP4FSGNAULQo",
                imusic: "https://music.apple.com/us/album/ma-tsa-de/1736263329",
                youtube: "https://www.youtube.com/watch?v=97aLuJ6igXw&list=OLAK5uy_laVur7s7RnXmS3HYdDtV0Z3Crvoqad13w",
                soundcloud: "https://soundcloud.com/akipshidze/sets/ma-tsa-de?si=0e8352d8875c4ddd8378ee7c4fa4f238&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
                bandcamp: "https://akipshidze.bandcamp.com/album/ma-tsa-de",
            },
            image: {
                big: "/img/pages/music/MaTsaDe.png",
                small: "/img/pages/music//MaTsaDe.png",
                name: "MaTsaDe",
            },
        },
        {
            name: "Kreizi Frog",
            desc: "Photo by Ketewan",
            links: {
                spotify: "https://open.spotify.com/track/00XnYZA0zuRpFBIidnRwEP?si=a5f91b1513a243dc",
                imusic: "https://music.apple.com/us/album/kreizi-frog/1772409315?i=1772409316",
                youtube: "https://www.youtube.com/watch?v=1VXYGBP6Bog",
                soundcloud: "https://soundcloud.com/akipshidze/kreizi-frog",
                bandcamp: "https://akipshidze.bandcamp.com/track/kreizi-frog",
            },
            image: {
                big: "/img/pages/music/KreiziFrog.jpeg",
                small: "/img/pages/music/KreiziFrog_small.jpg",
                name: "Kreizi Frog",
            },
        },
        {
            name: "Mona",
            desc: "Artwork by Nuzi",
            links: {
                spotify: "https://open.spotify.com/track/1LmMhBQk7JtFyXQuee31e2?si=5b169f4b3275449f",
                imusic: "https://music.apple.com/us/album/mona/1788194299?i=1788194300",
                youtube: "https://www.youtube.com/watch?v=OXLfIaA95J4",
                soundcloud: "https://soundcloud.com/akipshidze/mona",
                bandcamp: "https://akipshidze.bandcamp.com/track/mona",
            },
            image: {
                big: "/img/pages/music/Mona.png",
                small: "/img/pages/music/Mona_small.png",
                name: "Mona",
            },
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
    const sliderRef = useRef(null);

    // Update isMobile state on window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    };

    // Handle swipe gestures
    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        sliderRef.current.startX = touch.clientX;
    };

    const handleTouchMove = (e) => {
        if (!sliderRef.current.startX) return;
        const touch = e.touches[0];
        const diff = touch.clientX - sliderRef.current.startX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
            sliderRef.current.startX = null;
        }
    };

    return (
        <div className='section-music' id='section-music'>
            <div className='section-music-header'>
                <svg width="163" height="32" viewBox="0 0 163 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.017 0L18.4 8.66546L25.4215 3.05573L22.2561 11.467L31.2338 11.0557L23.729 16L31.2338 20.9443L22.2561 20.533L25.4215 28.9443L18.4 23.3346L16.017 32L13.6338 23.3346L6.61238 28.9443L9.77781 20.533L0.800049 20.9443L8.30496 16L0.800049 11.0557L9.77781 11.467L6.61238 3.05573L13.6338 8.66546L16.017 0Z" fill="#B2F830"/>
                    <path d="M45.752 7.556H54.128L60.272 18.668L66.44 7.556H74.72V24.5H69.68V11.684L62.264 24.5H58.112L50.72 11.612V24.5H45.752V7.556ZM79.112 7.556H84.32V17.444C84.344 18.164 84.368 18.98 84.8 19.628C85.376 20.444 86.48 20.564 88.328 20.54H93.32C94.424 20.396 94.832 20.252 95.192 19.94C95.744 19.412 95.84 18.5 95.888 17.78V7.556H101.12V18.788C101.096 19.196 101.072 19.604 101 20.012C100.904 20.684 100.592 22.532 98.816 23.636C97.568 24.404 96.32 24.524 94.928 24.644C93.32 24.668 91.736 24.716 90.128 24.716C88.28 24.716 86.432 24.644 84.584 24.548C84.248 24.5 83.888 24.452 83.552 24.404C82.112 24.14 80.792 23.588 79.976 22.292C79.352 21.284 79.232 20.3 79.112 19.172V7.556ZM105.26 18.932L110.564 18.956C110.564 19.34 110.564 19.652 110.684 19.94C110.876 20.492 111.38 20.708 112.484 20.804C113.564 20.852 114.62 20.9 115.7 20.924C116.852 20.948 118.004 20.9 119.18 20.876C119.348 20.876 120.092 20.948 120.62 20.732C121.148 20.54 121.604 20.012 121.604 19.436C121.604 19.292 121.58 19.004 121.364 18.692C120.956 18.116 120.428 18.14 119.228 17.972C116.732 17.924 114.236 17.9 111.764 17.756C110.972 17.708 110.18 17.636 109.388 17.588C109.148 17.54 108.884 17.516 108.644 17.468C108.308 17.42 107.132 17.228 106.316 16.34C105.788 15.764 105.308 14.732 105.308 13.004C105.308 12.884 105.308 11.036 105.74 9.956C105.908 9.548 106.148 9.188 106.436 8.876C107.42 7.82 108.716 7.652 110.132 7.484C111.98 7.412 113.828 7.34 115.676 7.34C117.716 7.34 119.756 7.46 121.796 7.556L122.732 7.7C123.092 7.748 124.268 7.964 125.18 8.804C126.356 9.884 126.356 11.396 126.308 12.884L121.172 12.86C120.86 11.564 120.62 11.396 119.252 11.252C118.004 11.18 116.732 11.132 115.484 11.132C114.5 11.132 113.54 11.18 112.556 11.204C111.908 11.228 111.308 11.252 110.9 11.78C110.828 11.876 110.612 12.188 110.612 12.548C110.612 12.908 110.804 13.196 110.9 13.292C111.356 13.868 111.932 13.892 112.58 13.94L122.756 14.3C124.148 14.444 124.676 14.636 125.276 15.068C126.14 15.692 126.908 16.796 126.908 19.268C126.908 21.188 126.572 22.1 126.044 22.844C125.828 23.132 125.636 23.348 125.348 23.564C124.556 24.14 123.524 24.308 122.468 24.476C120.38 24.596 118.316 24.692 116.228 24.692C113.972 24.692 111.716 24.548 109.436 24.428C108.308 24.26 107.036 24.044 106.196 23.132C105.236 22.1 105.26 20.204 105.26 18.932ZM131.012 7.556H136.388V24.5H131.012V7.556ZM161.888 13.58L156.824 13.556C156.824 13.052 156.824 12.668 156.464 12.236C156.056 11.732 155.408 11.684 154.712 11.612C153.728 11.564 152.72 11.516 151.712 11.516C150.656 11.516 149.624 11.54 148.544 11.588C148.28 11.588 147.992 11.612 147.728 11.636C147.296 11.684 146.096 11.828 145.712 13.148C145.568 13.652 145.52 14.66 145.52 15.908V17.156C145.544 18.092 145.568 19.1 146.24 19.7C147.008 20.396 148.256 20.42 148.472 20.444H154.688C154.784 20.42 155.984 20.396 156.512 19.772C156.872 19.364 156.896 18.716 156.944 18.092H162.104C162.104 18.596 162.08 19.1 162.056 19.628C162.008 21.092 161.864 22.484 160.664 23.444C159.728 24.212 158.672 24.356 157.544 24.524C155.72 24.644 153.896 24.716 152.072 24.716C150.08 24.716 148.088 24.668 146.096 24.596C144.536 24.356 142.976 24.116 141.896 23.108C140.816 22.1 140.624 20.996 140.456 19.604C140.36 18.428 140.264 17.228 140.264 16.028C140.264 14.78 140.36 13.556 140.432 12.308C140.576 11.18 140.744 10.364 141.464 9.452C142.76 7.916 144.8 7.676 145.352 7.58C147.296 7.436 149.264 7.316 151.232 7.316C153.224 7.316 155.216 7.412 157.208 7.484C158.408 7.676 159.608 7.868 160.568 8.756C161.84 9.932 161.864 12.02 161.888 13.58Z" fill="white"/>
                </svg>
                <Link to={"/music"} onClick={() => window.scrollTo(0, 0)}>See All</Link>
            </div>
            <div
                className='section-music-tiles'
                ref={sliderRef}
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onTouchMove={isMobile ? handleTouchMove : undefined}
            >
                {isMobile && (
                    <button className='slider-arrow left' onClick={prevSlide}>
                        <FaChevronLeft />
                    </button>
                )}
                {isMobile ? (
                    <TrackTile
                        nameTrack={tracks[currentIndex].name}
                        descTrack={tracks[currentIndex].desc}
                        linksTrack={tracks[currentIndex].links}
                        imageTrack={tracks[currentIndex].image}
                    />
                ) : (
                    tracks.map((track, index) => (
                        <TrackTile
                            key={index}
                            nameTrack={track.name}
                            descTrack={track.desc}
                            linksTrack={track.links}
                            imageTrack={track.image}
                        />
                    ))
                )}
                {isMobile && (
                    <button className='slider-arrow right' onClick={nextSlide}>
                        <FaChevronRight />
                    </button>
                )}
            </div>
        </div>
    );
}

export default MusicSection;