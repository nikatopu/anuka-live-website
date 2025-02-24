import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Music from './pages/music/Music';
import News from './pages/news/News';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';

function App() {
  return (
    <>
    <nav>
      <Link to={"/"}><img src='./AnukaLogo.svg' alt='The logo of Anuka'></img></Link>
      <ul>
        <Link to={"/music"}>Music</Link>
        <Link to={"/news"}>News</Link>
        <Link to={"/about-me"}>About me</Link>
        <Link to={"/contact"}>Contact</Link>
      </ul>
    </nav>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/music' element={<Music/>}/>
        <Route path='/news' element={<News/>}/>
        <Route path='/about-me' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </>
    );
}

export default App;
