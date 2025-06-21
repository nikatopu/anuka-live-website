import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer id="footer">
      <div className={style.footerLeft}>
        <img src="./AnukaLogo.svg" alt="The logo of Anuka" />
        <p>
          All copyright rights are reserved, the site belongs to the personal
          musician Anuka Kipshidze.
        </p>
      </div>
      <div className={style.footerRight}>
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
  );
}
