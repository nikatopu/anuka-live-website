import React from "react";
import { Outlet } from "react-router-dom";
import style from "./PublicLayout.module.scss"; // <-- IMPORT THE STYLES
import Header from "../../content/components/Header";
import Footer from "../../content/components/Footer";
import PageGradients from "../../content/PageGradients";
import MusicBox from "../../content/components/MusicBox/MusicBox";
import YouTube from "react-youtube";
import { useAppContext } from "../../lib/AppContext";

const PublicLayout = () => {
  const { registerYtPlayer } = useAppContext();

  const onYtReady = (event) => {
    // register the raw player instance with AppContext
    if (registerYtPlayer) registerYtPlayer(event.target);
  };

  const ytOpts = {
    height: "1",
    width: "1",
    playerVars: { controls: 0, rel: 0, modestbranding: 1, enablejsapi: 1 },
  };
  return (
    <div className={style.publicLayoutContainer}>
      <PageGradients />
      <Header />
      <MusicBox />
      {/* global hidden YouTube player used by TrackTile via AppContext */}
      <div
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
        aria-hidden
      >
        <YouTube videoId={""} opts={ytOpts} onReady={onYtReady} />
      </div>
      <main className={style.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
