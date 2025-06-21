import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import { useState } from "react";
import { useAppContext } from "../../../lib/AppContext";

export default function Header() {
  const [hamburgerPressed, setHamburgerPressed] = useState(false);
  const { isAdminPage } = useAppContext();

  const handlePress = () => {
    setHamburgerPressed(!hamburgerPressed);
  };

  const handleLinkPress = () => {
    window.scrollTo(0, 0);
    setHamburgerPressed(false);
  };
  return (
    <nav className={hamburgerPressed && style.scrolled}>
      <Link to={"/"}>
        <img
          src="https://res.cloudinary.com/dvwkvoqss/image/upload/v1750414929/AnukaLogo_yenkkm.svg"
          alt="The logo of Anuka"
        ></img>
      </Link>
      {!isAdminPage && (
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
      )}

      {!isAdminPage && (
        <div className={style.hiddenAbove}>
          <div className={style.hamburger} onClick={() => handlePress()}>
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
          <div className={style.mobileLinks}>
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
      )}
    </nav>
  );
}
