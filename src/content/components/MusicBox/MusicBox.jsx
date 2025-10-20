import { useEffect, useState } from "react";
import { useAppContext } from "../../../lib/AppContext";
import "./MusicBox.scss";

export default function MusicBox() {
  const {
    currentlyPlaying,
    setCurrentlyPlaying,
    stopCurrent,
    playYouTube,
    pauseYouTube,
    isYtReady,
    requestPlay,
  } = useAppContext();

  function stopMusic() {
    stopCurrent();
    setCurrentlyPlaying(null);
  }

  const [stuck, setStuck] = useState(true);

  useEffect(() => {
    const header = document.querySelector("nav");
    if (!header) return;

    const onScroll = () => {
      const headerBottom = header.getBoundingClientRect().bottom;
      setStuck(headerBottom > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`musicbox ${currentlyPlaying !== null ? "active" : ""} ${
        stuck ? "stuck" : ""
      }`}
    >
      <h3>Now Playing</h3>

      <div className="track-info">
        <div className="track-image">
          <img src={currentlyPlaying?.image || "default.jpg"} alt="Track" />
        </div>

        <div className="track-details">
          <h4>{currentlyPlaying?.title || "Track Title"}</h4>
          {currentlyPlaying?.desc.split(/\.|,/).map((e, i) => {
            return <p key={i}>{e}</p>;
          }) || "Desc"}
        </div>

        <button className="close" onClick={stopMusic}>
          <span>&times;</span>
        </button>
      </div>
    </div>
  );
}
