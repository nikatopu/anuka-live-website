import { useAppContext } from "../../../lib/AppContext";
import "./MusicBox.scss";

export default function MusicBox() {
  const { currentlyPlaying, setCurrentlyPlaying, stopCurrent } =
    useAppContext();

  function stopMusic() {
    stopCurrent();
    setCurrentlyPlaying(null);
  }

  return (
    <div className={`musicbox ${currentlyPlaying !== null ? "active" : ""}`}>
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
