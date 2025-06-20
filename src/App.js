import "./App.scss";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Music from "./pages/music/Music";
import SoundDesign from "./pages/sound design/SoundDesign";
import News from "./pages/news/News";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import { useState } from "react";
import PageGradients from "./content/PageGradients";
import Admin from "./pages/admin/Admin";
import LoginPage from "./pages/admin/components/login/Login";
import ChooseAction from "./pages/admin/components/chooseaction/ChooseAction";
import BlogsAdminPage from "./pages/admin/components/blogs/Blogs";

function App() {
  const [hamburgerPressed, setHamburgerPressed] = useState(false);

  const handlePress = () => {
    setHamburgerPressed(!hamburgerPressed);
  };

  const handleLinkPress = () => {
    window.scrollTo(0, 0);
    setHamburgerPressed(false);
  };

  return (
    <div className="everything-holder">
      <PageGradients />
      <nav className={hamburgerPressed ? "scrolled" : ""}>
        <Link to={"/"}>
          <img
            src="https://res.cloudinary.com/dvwkvoqss/image/upload/v1750414929/AnukaLogo_yenkkm.svg"
            alt="The logo of Anuka"
          ></img>
        </Link>
        <ul>
          <Link to={"/music"} onClick={() => window.scrollTo(0, 0)}>
            Music
          </Link>
          <Link to={"/sound-design"} onClick={() => window.scrollTo(0, 0)}>
            Sound Design
          </Link>
          <Link to={"/news"} onClick={() => window.scrollTo(0, 0)}>
            News
          </Link>
          <Link to={"/about-me"} onClick={() => window.scrollTo(0, 0)}>
            About me
          </Link>
          <Link to={"/contact"} onClick={() => window.scrollTo(0, 0)}>
            Contact
          </Link>
        </ul>
        <div className="hidden-above">
          <div className="hamburger" onClick={() => handlePress()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48px"
              height="48px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M5 6.5H19V8H5V6.5Z" fill="#fff" />
              <path d="M5 16.5H19V18H5V16.5Z" fill="#fff" />
              <path d="M5 11.5H19V13H5V11.5Z" fill="#fff" />
            </svg>
          </div>
          <div className="mobile-links">
            <Link to={"/music"} onClick={() => handleLinkPress()}>
              Music
            </Link>
            <Link to={"/sound-design"} onClick={() => handleLinkPress()}>
              Sound Design
            </Link>
            <Link to={"/news"} onClick={() => handleLinkPress()}>
              News
            </Link>
            <Link to={"/about-me"} onClick={() => handleLinkPress()}>
              About me
            </Link>
            <Link to={"/contact"} onClick={() => handleLinkPress()}>
              Contact
            </Link>
          </div>
        </div>
      </nav>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/sound-design" element={<SoundDesign />} />
          <Route path="/news" element={<News />} />
          <Route path="/about-me" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="" element={<ChooseAction />} />
            <Route path="blogs" element={<BlogsAdminPage />} />
          </Route>

          <Route path="/admin/login" element={<LoginPage />} />
        </Routes>
      </div>
      <footer id="footer">
        <div className="footer-left">
          <img src="./AnukaLogo.svg" alt="The logo of Anuka" />
          <p>
            All copyright rights are reserved, the site belongs to the personal
            musician Anuka Kipshidze.
          </p>
        </div>
        <div className="footer-right">
          <p>Follow me on my channels</p>
          <ul>
            <a
              href="https://www.facebook.com/profile.php?id=61565387039684"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/svg/gray/facebook.svg" alt="facebook logo" />
            </a>
            <a
              href="https://www.instagram.com/kipshidzeanuka/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/svg/gray/instagram.svg" alt="instagram logo" />
            </a>
            <a
              href="https://open.spotify.com/artist/1OLjpisqHVt8FvCdjRj9Zc"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/svg/gray/spotify.svg" alt="spotify logo" />
            </a>
            <a
              href="https://music.apple.com/us/artist/anuka-kipshidze/1697978770"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/svg/gray/imusic.svg" alt="apple music logo" />
            </a>
            <a
              href="https://www.youtube.com/@kipshidzeanuka"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/svg/gray/youtube.svg" alt="youtube logo" />
            </a>
            <a
              href="https://soundcloud.com/akipshidze"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/svg/gray/soundcloud.svg" alt="soundcloud logo" />
            </a>
            <a
              href="https://akipshidze.bandcamp.com/music"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/svg/gray/bandcamp.svg" alt="bandcamp logo" />
            </a>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
