import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../../../../lib/AppContext";
import "./TrackTile.scss";
import allMusic from "../../../music/music";

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

  const {
    requestPlay,
    releaseController,
    setCurrentlyPlaying,
    currentlyPlaying,
    playYouTube,
    pauseYouTube,
    stopCurrent,
  } = useAppContext();

  const [isPlaying, setIsPlaying] = useState(
    currentlyPlaying?.title === nameTrack || false
  );

  const youtubeUrl =
    linksTrack && linksTrack.youtube ? linksTrack.youtube : null;
  const isYouTube = (url) =>
    !!(url && (url.includes("youtube.com") || url.includes("youtu.be")));
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match =
      url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
      ) || [];
    return match[1] || null;
  };

  // controllerRef provides a stable controller object to register with context
  const controllerRef = useRef({
    pause: () => {
      try {
        pauseYouTube();
      } catch (e) {}
    },
    play: (videoId) => {
      try {
        playYouTube(videoId);
      } catch (e) {}
    },
    id: null,
  });

  // no per-tile player event handlers; the global player is responsible

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying((prev) => !prev); // Optimistic UI update

    const videoId = getYouTubeId(youtubeUrl);
    setCurrentlyPlaying({
      title: nameTrack,
      desc: descTrack,
      image: imageTrack?.small || imageTrack?.big,
      videoId,
    });

    if (!isYouTube(youtubeUrl) || !videoId) return;

    if (controllerRef.current.id === videoId && isPlaying) {
      stopCurrent();
      setCurrentlyPlaying(null);
      setIsPlaying(false);
      return;
    }

    // register controller with context so previous playback is paused
    controllerRef.current.id = videoId;
    requestPlay(controllerRef.current);

    // start playback on the single global player
    try {
      playYouTube(videoId);
      setIsPlaying(true);
    } catch (err) {
      console.warn("playYouTube error", err);
    }
  };

  useEffect(() => {
    // cleanup on unmount: if this controller is current, release it
    return () => {
      releaseController(controllerRef.current);
    };
  }, [releaseController]);

  useEffect(() => {
    if (currentlyPlaying?.title !== nameTrack) {
      setIsPlaying(false);
    }
  }, [currentlyPlaying]);

  const linkTypes = [
    { key: "spotify", image: "/svg/spotify.svg" },
    { key: "imusic", image: "/svg/imusic.svg" },
    { key: "youtube", image: "/svg/youtube.svg" },
    { key: "soundcloud", image: "/svg/soundcloud.svg" },
    { key: "bandcamp", image: "/svg/bandcamp.svg" },
  ];

  const descSplit = descTrack.split(/\.|,/);

  const videoId = getYouTubeId(youtubeUrl);

  return (
    <div className="tracktile" id={nameTrack.replace(/\s+/g, "")}>
      <div
        className="tracktile_picture"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <picture style={{ position: "relative" }}>
          {isYouTube(youtubeUrl) && videoId && (
            <button
              type="button"
              className={`play-button ${isPlaying ? "playing" : ""} ${
                isHovered ? "hovered" : ""
              }`}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="white"
                  aria-hidden
                >
                  <rect x="5" y="4" width="4" height="16" />
                  <rect x="15" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="white"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          )}
          <source media="(min-width:800px)" src={imageTrack?.big} />
          <source media="(max-width:800px)" src={imageTrack?.small} />
          <img
            src={imageTrack?.big}
            alt={imageTrack?.name}
            className={isHovered ? "hovered" : ""}
          />
        </picture>

        <div
          className={`tracktile_links ${
            isHovered ? "tracktile_links_hovered" : ""
          }`}
        >
          {linkTypes.map((link) => {
            if (linksTrack[link.key]) {
              return (
                <div key={link.key} className="link-item">
                  <a
                    href={linksTrack[link.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={link.image} alt={link.key + " logo"} />
                  </a>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <h2>{nameTrack}</h2>
      <div>
        {descSplit.map((e, i) => {
          return <p key={i}>{e}</p>;
        })}
        <br />
      </div>
    </div>
  );
}

export default TrackTile;
