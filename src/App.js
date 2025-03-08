import './App.scss';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Music from './pages/music/Music';
import SoundDesign from './pages/sound design/SoundDesign';
import News from './pages/news/News';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';

function App() {
  return (
    <>
    <nav>
      <Link to={"/"}><img src='./AnukaLogo.svg' alt='The logo of Anuka'></img></Link>
      <ul>
        <Link to={"/music"} onClick={() => window.scrollTo(0, 0)}>Music</Link>
        <Link to={"/sound-design"} onClick={() => window.scrollTo(0, 0)}>Sound Design</Link>
        <Link to={"/news"} onClick={() => window.scrollTo(0, 0)}>News</Link>
        <Link to={"/about-me"} onClick={() => window.scrollTo(0, 0)}>About me</Link>
        <Link to={"/contact"} onClick={() => window.scrollTo(0, 0)}>Contact</Link>
      </ul>
    </nav>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/music' element={<Music/>}/>
        <Route path='/sound-design' element={<SoundDesign/>}/>
        <Route path='/news' element={<News/>}/>
        <Route path='/about-me' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    <footer id='footer'>
      <div className='footer-left'>
        <img src='./AnukaLogo.svg' alt='The logo of Anuka' />
        <p>
          All copyright rights are reserved, the site belongs to the personal musician Anuka Kipshidze.
        </p>
      </div>
      <div className='footer-right'>
        <p>
          Follow me on my channels
        </p>
        <ul>
          <a href="https://www.facebook.com/profile.php?id=61565387039684" target='_blank' rel='noreferrer'>
            <img src='/svg/gray/facebook.svg' alt='facebook logo'/>
          </a>
          <a href="https://www.instagram.com/kipshidzeanuka/" target='_blank' rel='noreferrer'>
            <img src='/svg/gray/instagram.svg' alt='instagram logo'/>
          </a>
          <a href="https://open.spotify.com/artist/1OLjpisqHVt8FvCdjRj9Zc" target='_blank' rel='noreferrer'>
            <img src='/svg/gray/spotify.svg' alt='spotify logo'/>
          </a>
          <a href='https://music.apple.com/us/artist/anuka-kipshidze/1697978770' target='_blank' rel='noreferrer'>
            <img src='/svg/gray/imusic.svg' alt='apple music logo'/>
          </a>
          <a href='https://www.youtube.com/@kipshidzeanuka' target='_blank' rel='noreferrer'>
            <img src='/svg/gray/youtube.svg' alt='youtube logo'/>
          </a>
          <a href='https://soundcloud.com/akipshidze' target='_blank' rel='noreferrer'>
            <img src='/svg/gray/soundcloud.svg' alt='soundcloud logo'/>
          </a>
          <a href='https://akipshidze.bandcamp.com/music' target='_blank' rel='noreferrer'>
            <img src='/svg/gray/bandcamp.svg' alt='bandcamp logo'/>
          </a>
        </ul>
      </div>
    </footer>
    </>
    );
}

export default App;
