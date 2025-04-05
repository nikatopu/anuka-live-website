/*
    All of the blogs have the following format:
    {
        id: "the tag/id on the page"
        image: "the background image",
        title: "the title",
        desc: "the description",
        redirect: "where does it redirect",
        tags: "What tags do we have, seperated by commas"
    }
*/
const blogs = [
    {
        image: "/img/pages/news/blogs/AnukaMarketer.webp",
        title: "Anuka Kipshidze - Zeekr Music Discovery",
        desc: "“I love sharing. Whatever I do, I have to tell someone about it” - Anuka Kipshidze",
        redirect: "https://www.marketer.ge/anuka-yifshidze-zeekr-music/?fbclid=IwY2xjawJUw3tleHRuA2FlbQIxMQABHbklufDhYSPc3jYSiMdtBcBarle7iwcOdFwnbLqzJZMWbbFAJS6Da6Gc2A_aem_h8DkFwpQTX6WxOJERxxwSA",
        tags: "Marketer",
    },
    {
        image: "/img/pages/news/blogs/Ali.webp",
        title: "Ali - Anuka Kipshidze Releases a New Single",
        desc: "Georgian musician Anuka Kipshidze has released a new composition titled Ali.",
        redirect: "https://billboard.com.ge/2024/09/02/ali-anuka-kipsizem-axali-singli-gamousva/",
        tags: "Billboard",
    },
    {
        image: "/img/pages/news/blogs/InternationalExperimentalMusicProject.webp",
        title: "Anuka takes part in an international experimental music project",
        desc: "The final part of the project is a concert, which gives participants the opportunity to present their music to a new audience.",
        redirect: "https://billboard.com.ge/2025/01/21/anuka-yifsize-saertasoriso-eqsperimentuli-musikaluri-proeqtis-monawilea/",
        tags: "Billboard",
    },
    {
        image: "/img/pages/news/blogs/KreiziFrog.webp",
        title: "Kreizi Frog - New Music Video",
        desc: "As the musician told Billboard Georgia, the video was shot in Bakhmaro and the music was written there.",
        redirect: "https://billboard.com.ge/2024/10/22/kreizi-frog-anuka-yifsizis-axali-musikaluri-video/",
        tags: "Billboard",
    },
    {
        image: "/img/pages/news/blogs/DebutAlbum.webp",
        title: "Ma Tsa De - Anuka Kipshidze's Debut Album",
        desc: "The songs are characterized by the sound of 2000s video game theme tracks and resemble soundtracks.",
        redirect: "https://billboard.com.ge/2024/04/12/ma-tsa-de-anuka-yifsizis-sadebiuto-albomi/",
        tags: "TSA Music",
    },
    {
        image: "/img/pages/news/blogs/bevri-kabeli-da-anuka-kipshidze.webp",
        title: `Music Project "Bevri Kabeli" and a New Collaboration`,
        desc: `The main idea of the project "Many Cables" is the convergence of the creative ideas of two Georgian musicians, where the musicians share their vision, ideas, and experiences with each other and create new musical content.`,
        redirect: "https://billboard.com.ge/2025/02/05/musikaluri-proeqti-bevri-kabeli-da-akhali-kolaboracia-artist-anuka-kipshidzestan/",
        tags: "Billboard",
    },
    {
        image: "/img/pages/news/blogs/MaTsaDeTSA.webp",
        title: `Ma Tsa De - The Debut Album`,
        desc: `Tamas is an unproductive type of human activity, the motivation for which lies not in its result, but in the process.`,
        redirect: "https://www.tsamusic.ge/blog/ma-tsa-de-anuka-kipshidze",
        tags: "TSA Music",
    },
    {
        image: "/img/pages/news/blogs/AnmanAndAnuka.webp",
        title: `Anman, Anuka Kipshidze - Vanilla`,
        desc: `A collab of Anman and Anuka Kipshidze`,
        redirect: "https://www.youtube.com/watch?v=MtSCWpBQT7A",
        tags: "YouTube",
    },
]

const getBlogs = (count) => {
    if (count > blogs.length) return blogs;
    return blogs.slice(0, count);
}

const exportObject = {
    blogs: blogs,
    getBlogs: getBlogs,
}

export default exportObject;