import "./App.scss";
import { Route, Routes } from "react-router-dom";

// Layouts - The top-level structure for sections of your site
import PublicLayout from "./layouts/public/PublicLayout";
import AdminLayout from "./layouts/admin/AdminLayout";

// Public Pages
import Home from "./pages/home/Home";
import Music from "./pages/music/Music";
import SoundDesign from "./pages/sound design/SoundDesign";
import News from "./pages/news/News";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";

// Admin Pages
import LoginPage from "./pages/admin/components/login/Login";
import Dashboard from "./pages/admin/components/dashboard/Dashboard";
import BlogsAdminPage from "./pages/admin/components/blogs/Blogs";
import SongsAdminPage from "./pages/admin/components/songs/SongsAdminPage";

function App() {
  // App.js should ONLY be responsible for routing.
  // No divs, no context calls, just the Routes.
  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      {/* Any route nested here will render inside the PublicLayout component */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />{" "}
        {/* 'index' is the default for '/' */}
        <Route path="music" element={<Music />} />
        <Route path="sound-design" element={<SoundDesign />} />
        <Route path="news" element={<News />} />
        <Route path="about-me" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* --- AUTH & ADMIN ROUTES --- */}

      {/* 1. The Login page stands alone. It has no layout. */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* 2. All protected admin routes are nested inside the AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* The Dashboard is the default page for "/admin" */}
        <Route index element={<Dashboard />} />
        <Route path="blogs" element={<BlogsAdminPage />} />
        <Route path="songs" element={<SongsAdminPage />} />
        {/* Note: ChooseAction is likely part of the Dashboard now, not its own route */}
      </Route>
    </Routes>
  );
}

export default App;
