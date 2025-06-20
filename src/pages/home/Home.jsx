import React from "react";
import Header from "../../content/pages/home/header/Header";
import "./Home.scss";
import MusicSection from "../../content/pages/home/music/MusicSection";
import NewsSection from "../../content/pages/home/news/NewsSection";
// import Events from '../../content/pages/home/events/Events'
import Contact from "../../content/pages/home/contact/Contact";
import SoundDesignSection from "../../content/pages/home/sound design/SoundDesignSection";

const mainImage = {
  big: "https://res.cloudinary.com/dvwkvoqss/image/upload/v1750414669/Anuka_Home_wucmjj.jpg",
  small:
    "https://res.cloudinary.com/dvwkvoqss/image/upload/v1750414670/Anuka_Home_small_cmkmcu.jpg",
  name: "Anuka playing a sick guitar",
};

function Home() {
  return (
    <div className="home">
      <div className="sections">
        <div className="sections-margined">
          <Header image={mainImage} />
          <MusicSection />
          <NewsSection />
          <SoundDesignSection />
          {/* <Events /> */}
        </div>
        <Contact />
      </div>
    </div>
  );
}

export default Home;
