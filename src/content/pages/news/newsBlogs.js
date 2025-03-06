/*
    All of the blogs have the following format:
    {
        id: "the tag/id on the page"
        image: "the background image",
        title: "the title",
        desc: "the description",
        redirect: "where does it redirect",
        tags: "What tags do we have, seperated by spaces"
    }
*/
const blogs = [
    {
        image: "/img/pages/news/blogs/Ali.png",
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
        image: "/img/pages/news/blogs/PlaceHolder.png",
        title: "Ma Tsa De - Anuka Kipshidze's Debut Album",
        desc: "The songs are characterized by the sound of 2000s video game theme tracks and resemble soundtracks.",
        redirect: "https://billboard.com.ge/2024/04/12/ma-tsa-de-anuka-yifsizis-sadebiuto-albomi/",
        tags: "Billboard",
    },
    {
        image: "/img/pages/news/blogs/bevri-kabeli-da-anuka-kipshidze.jpg",
        title: `Music Project "Bevri Kabeli" and a New Collaboration`,
        desc: `The main idea of the project "Many Cables" is the convergence of the creative ideas of two Georgian musicians, where the musicians share their vision, ideas, and experiences with each other and create new musical content.`,
        redirect: "https://billboard.com.ge/2025/02/05/musikaluri-proeqti-bevri-kabeli-da-akhali-kolaboracia-artist-anuka-kipshidzestan/",
        tags: "Billboard",
    },
]

const getBlogs = (count) => {
    if (count > blogs.length) return blogs;
    return blogs.slice(0, count-1);
}

const exportObject = {
    blogs: blogs,
    getBlogs: getBlogs,
}

export default exportObject;