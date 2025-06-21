import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Music from "./pages/music/Music";
import SoundDesign from "./pages/sound design/SoundDesign";
import News from "./pages/news/News";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import PageGradients from "./content/PageGradients";
import Admin from "./pages/admin/Admin";
import LoginPage from "./pages/admin/components/login/Login";
import ChooseAction from "./pages/admin/components/chooseaction/ChooseAction";
import BlogsAdminPage from "./pages/admin/components/blogs/Blogs";
import Header from "./content/components/Header";
import Footer from "./content/components/Footer";
import { useAppContext } from "./lib/AppContext";

function App() {
  const { isAdminPage } = useAppContext();

  return (
    <div className={`everything-holder ${isAdminPage && "admin-page"}`}>
      {!isAdminPage && <PageGradients />}
      <Header />
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
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
