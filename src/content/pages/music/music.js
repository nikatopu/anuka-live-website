/* 
    Every music has the following interface:
    {
        title: "",
        desc: "",
        image: {
            big: "",
            small: "",
            name: "",
        },
        tags: [""],
        links: {
            spotify: "",
            imusic: "",
            youtube: "",
            soundcloud: "",
            bandcamp: "",
        },
    },
*/
const music = [
  {
    title: "Piku's Dream",
    desc: "Artwork by Nuzi",
    image: {
      big: "/img/pages/music/PikusDream.webp",
      small: "/img/pages/music/PikusDream.webp",
      name: "Piku's Dream",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/1aFV3hudTSIWyFeKBVLJha?si=10933f8b3fc94b9f",
      bandcamp: "https://akipshidze.bandcamp.com/track/pikus-dream",
      imusic: "https://music.apple.com/us/song/pikus-dream/1821171985",
      soundcloud: "https://on.soundcloud.com/JNLzxvvJx0PEBOYxB0",
      youtube: "https://youtu.be/8SzUBmB4yVs?si=rFnzRiPdiXPsZrfA",
    },
  },
  {
    title: "Trampoline Man",
    desc: "Anman x Anuka Kipshidze",
    image: {
      big: "/img/pages/music/TrampolineMan.jpeg",
      small: "/img/pages/music/TrampolineMan_small.jpg",
      name: "Trampoline Man",
    },
    tags: ["Track", "Collab"],
    links: {
      youtube: "https://www.youtube.com/watch?v=vd4ZbP9cWwA",
      spotify:
        "https://open.spotify.com/track/04q0aRyxc4njf3edVM7nSE?si=92a1d104e85146c2",
      imusic:
        "https://music.apple.com/us/album/trampoline-man-single/1813231266",
      soundcloud: "https://on.soundcloud.com/gncCqv2rJh4Futfo5j",
      bandcamp: "https://akipshidze.bandcamp.com/track/trampoline-man",
    },
  },
  {
    title: "Ma Tsa De",
    desc: "Artwork by Tata Zakaraia",
    image: {
      big: "/img/pages/music/MaTsaDe.png",
      small: "/img/pages/music/MaTsaDe_small.png",
      name: "MaTsaDe",
    },
    tags: ["Album"],
    links: {
      spotify: "https://open.spotify.com/album/7wxdEPGJMilP4FSGNAULQo",
      imusic: "https://music.apple.com/us/album/ma-tsa-de/1736263329",
      youtube:
        "https://www.youtube.com/watch?v=97aLuJ6igXw&list=OLAK5uy_laVur7s7RnXmS3HYdDtV0Z3Crvoqad13w",
      soundcloud:
        "https://soundcloud.com/akipshidze/sets/ma-tsa-de?si=0e8352d8875c4ddd8378ee7c4fa4f238&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      bandcamp: "https://akipshidze.bandcamp.com/album/ma-tsa-de",
    },
  },
  {
    title: "I Am In The Good List",
    desc: "Bevri Kabeli x Anuka Kipshidze. Artwork by Nika Elia",
    image: {
      big: "/img/pages/music/IAmInTheGoodList.jpg",
      small: "/img/pages/music/IAmInTheGoodList_small.jpg",
      name: "I Am In The Good List",
    },
    tags: ["Track", "Collab"],
    links: {
      youtube: "https://youtu.be/9RZGLzljkL8?si=Z19zLC4MKWI7Sx2j",
      spotify:
        "https://open.spotify.com/track/5K4nF4ykgrNOzHhWJDbLQg?si=51e48cb62f1c4fb4",
      imusic:
        "https://music.apple.com/ca/album/i-am-in-the-good-list-single/1819501915",
      soundcloud:
        "https://soundcloud.com/akipshidze/i-am-in-the-good-list?si=3d1670940974438894083f2c9e4d0db8&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      bandcamp: "https://akipshidze.bandcamp.com/track/i-am-in-the-good-list",
    },
  },
  {
    title: "Mona",
    desc: "Artwork by Nuzi",
    image: {
      big: "/img/pages/music/Mona.png",
      small: "/img/pages/music/Mona_small.png",
      name: "Mona",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/1LmMhBQk7JtFyXQuee31e2?si=5b169f4b3275449f",
      imusic: "https://music.apple.com/us/album/mona/1788194299?i=1788194300",
      youtube: "https://www.youtube.com/watch?v=OXLfIaA95J4",
      soundcloud: "https://soundcloud.com/akipshidze/mona",
      bandcamp: "https://akipshidze.bandcamp.com/track/mona",
    },
  },
  {
    title: "Kreizi Frog",
    desc: "Photo by Ketewan",
    image: {
      big: "/img/pages/music/KreiziFrog.jpeg",
      small: "/img/pages/music/KreiziFrog_small.jpg",
      name: "Kreizi Frog",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/00XnYZA0zuRpFBIidnRwEP?si=a5f91b1513a243dc",
      imusic:
        "https://music.apple.com/us/album/kreizi-frog/1772409315?i=1772409316",
      youtube: "https://www.youtube.com/watch?v=1VXYGBP6Bog",
      soundcloud: "https://soundcloud.com/akipshidze/kreizi-frog",
      bandcamp: "https://akipshidze.bandcamp.com/track/kreizi-frog",
    },
  },
  {
    title: "Oboba",
    desc: "Photo by Anuka",
    image: {
      big: "/img/pages/music/Oboba.JPG",
      small: "/img/pages/music/Oboba_small.JPG",
      name: "oboba",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/1CZeR15olOlPgwr99Uviv9?si=a5d6f8480e7b44cf",
      imusic: "https://music.apple.com/us/album/oboba/1752413658?i=1752413809",
      soundcloud: "https://soundcloud.com/akipshidze/oboba",
      bandcamp: "https://akipshidze.bandcamp.com/track/oboba",
    },
  },
  {
    title: "Vanilla",
    desc: "Anman x Anuka Kipshidze. Artowrk by Anman",
    image: {
      big: "/img/pages/music/Vanilla.jpeg",
      small: "/img/pages/music/Vanilla_small.jpeg",
      name: "Vanilla",
    },
    tags: ["Track", "Collab"],
    links: {
      spotify:
        "https://open.spotify.com/track/2vVGS0RWUr9rr1gQbIsHi4?si=729a70191b6f47b7",
      imusic:
        "https://music.apple.com/us/album/vanilla/1747139895?i=1747140139",
      youtube: "https://youtu.be/MtSCWpBQT7A?si=s0eVvqfYgePTIeN_",
      soundcloud: "https://soundcloud.com/akipshidze/vanilla",
      bandcamp: "https://akipshidze.bandcamp.com/track/vanilla",
    },
  },
  {
    title: "Ali",
    desc: "Artwork by Nuzi",
    image: {
      big: "/img/pages/music/Ali.jpg",
      small: "/img/pages/music/Ali_small.jpg",
      name: "Ali",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/4ddaVao5BvfkNw80599HiL?si=489d9d7d5b494ea5",
      imusic: "https://music.apple.com/us/album/ali-single/1760641280",
      youtube: "https://youtu.be/rDm0jm4KDzY?si=4n1Fo2JJUsKgtC9c",
      soundcloud: "https://soundcloud.com/akipshidze/ali",
      bandcamp: "https://akipshidze.bandcamp.com/track/ali",
    },
  },
  {
    title: "Hammock",
    desc: "Artwork by Nuzi",
    image: {
      big: "/img/pages/music/Hammock.jpg",
      small: "/img/pages/music/Hammock_small.jpg",
      name: "Hammock",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/5zyXXd6QcE8Ckpe67xZgRC?si=ba0aabd17bda4df9",
      imusic: "https://music.apple.com/us/album/hammock-single/1768921679",
      youtube: "https://youtu.be/v3lm5bROYSI?si=OiIb4p5xdVfR7KM-",
      soundcloud: "https://soundcloud.com/akipshidze/hammock",
      bandcamp: "https://akipshidze.bandcamp.com/track/hammock",
    },
  },
  {
    title: "Sakartvelo",
    desc: "Artwork by Nuzi",
    image: {
      big: "/img/pages/music/Sakartvelo.jpeg",
      small: "/img/pages/music/Sakartvelo_small.jpg",
      name: "Sakartvelo",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/3Z9V9C8alfdu2jDJ321TNv?si=b5be9b3421d9467d",
      imusic:
        "https://music.apple.com/us/album/sakartvelo/1745186854?i=1745186855",
      youtube: "https://youtu.be/eUBUUjrhH8g?si=5HoVdlJurkk8HIRd",
      soundcloud: "https://soundcloud.com/akipshidze/sakartvelo",
      bandcamp: "https://akipshidze.bandcamp.com/track/sakartvelo",
    },
  },
  {
    title: "Intro Metri",
    desc: "Artwork by Tata Zakaraia",
    image: {
      big: "/img/pages/music/MaTsaDe.png",
      small: "/img/pages/music/MaTsaDe_small.png",
      name: "From Matsade album",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/3PgXA0zbYXF5NRS1VjWAep?si=33e93398d2b14caf",
      imusic:
        "https://music.apple.com/us/album/intro-metri/1736263329?i=1736263330",
      youtube: "https://youtu.be/97aLuJ6igXw?si=M7dk0ji8xENjupt5",
      soundcloud: "https://soundcloud.com/akipshidze/intro-metri",
      bandcamp: "https://akipshidze.bandcamp.com/track/intro-metri",
    },
  },
  {
    title: "Guntiadi",
    desc: "Artwork by Tata Zakaraia",
    image: {
      big: "/img/pages/music/MaTsaDe.png",
      small: "/img/pages/music/MaTsaDe_small.png",
      name: "From Matsade album",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/4SmbBhEgT8U47CRXpXbKWJ?si=13ba927b20c346fd",
      imusic:
        "https://music.apple.com/us/album/guntiadi/1736263329?i=1736263331",
      youtube: "https://youtu.be/xvO4l05wYt8?si=23Tlglhk3oMc9A0h",
      soundcloud: "https://soundcloud.com/akipshidze/guntiadi-1",
      bandcamp: "https://akipshidze.bandcamp.com/track/guntiadi",
    },
  },
  {
    title: "Ma Tsa De",
    desc: "Artwork by Tata Zakaraia",
    image: {
      big: "/img/pages/music/MaTsaDe.png",
      small: "/img/pages/music/MaTsaDe_small.png",
      name: "From Matsade album",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/07fNSmUha1kYPSkjG5gFxZ?si=c0e5514e1dcf4f88",
      imusic:
        "https://music.apple.com/us/album/ma-tsa-de/1736263329?i=1736263332",
      youtube: "https://youtu.be/iymUg7Jk-JU?si=MXAafbn9ZG8Jk-8a",
      soundcloud: "https://soundcloud.com/akipshidze/ma-tsa-de",
      bandcamp: "https://akipshidze.bandcamp.com/track/ma-tsa-de",
    },
  },
  {
    title: "Suckadrisi",
    desc: "Artwork by Tata Zakaraia",
    image: {
      big: "/img/pages/music/MaTsaDe.png",
      small: "/img/pages/music/MaTsaDe_small.png",
      name: "From Matsade album",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/3vM0zerX50fpDhBQ6MekHO?si=23c4446cfe8d409f",
      imusic:
        "https://music.apple.com/us/album/suckadrisi/1736263329?i=1736263333",
      youtube: "https://youtu.be/fZxHYUPRmXM?si=y-slmkGgzPYUkdyj",
      soundcloud: "https://soundcloud.com/akipshidze/suckadrisi",
      bandcamp: "https://akipshidze.bandcamp.com/track/suckadrisi",
    },
  },
  {
    title: "Sun Tkva",
    desc: "Artwork by Tata Zakaraia",
    image: {
      big: "/img/pages/music/MaTsaDe.png",
      small: "/img/pages/music/MaTsaDe_small.png",
      name: "From Matsade album",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/4L1VfmUuDiAOEBeiuusFFk?si=75149c90d1874041",
      imusic:
        "https://music.apple.com/us/album/sun-tkva/1736263329?i=1736263334",
      youtube: "https://youtu.be/8PkFDquoYVc?si=b7Fv3hYiVKGPzhzP",
      soundcloud: "https://soundcloud.com/akipshidze/sun-tkva",
      bandcamp: "https://akipshidze.bandcamp.com/track/sun-tkva",
    },
  },
  {
    title: "She Eshvi",
    desc: "Artwork by Tata Zakaraia",
    image: {
      big: "/img/pages/music/MaTsaDe.png",
      small: "/img/pages/music/MaTsaDe_small.png",
      name: "From Matsade album",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/6sEtpJxLrbWtEhIqJjCMyX?si=6c71eaadaf0f44d0",
      imusic:
        "https://music.apple.com/us/album/she-eshvi/1736263329?i=1736263336",
      youtube: "https://youtu.be/gjs5dDgJsq8?si=AIZDtBV731p-oAYU",
      soundcloud: "https://soundcloud.com/akipshidze/she-eshvi",
      bandcamp: "https://akipshidze.bandcamp.com/track/she-eshvi",
    },
  },
  {
    title: "Luv Anda",
    desc: "Artwork by Tata Zakaraia",
    image: {
      big: "/img/pages/music/MaTsaDe.png",
      small: "/img/pages/music/MaTsaDe_small.png",
      name: "From Matsade album",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/0hRbR743wz7MXWjbDvHCdY?si=a935ba88d0fe4530",
      imusic:
        "https://music.apple.com/us/album/luv-anda/1736263329?i=1736263487",
      youtube: "https://youtu.be/DX1Bw5qG5A0?si=eBpPdPkmF_D--Erj",
      soundcloud: "https://soundcloud.com/akipshidze/luv-anda",
      bandcamp: "https://akipshidze.bandcamp.com/track/luv-anda",
    },
  },
  {
    title: "Da Ass Rules",
    desc: "Artwork by Tata Zakaraia",
    image: {
      big: "/img/pages/music/MaTsaDe.png",
      small: "/img/pages/music/MaTsaDe_small.png",
      name: "From Matsade album",
    },
    tags: ["Track"],
    links: {
      spotify:
        "https://open.spotify.com/track/0VwRozChsTnfBZFU4wSIB4?si=5c0999b78b354554",
      imusic:
        "https://music.apple.com/us/album/da-ass-rules/1736263329?i=1736263488",
      youtube: "https://youtu.be/dC1YNiwNexU?si=3Nfb41CzidSQmrRU",
      soundcloud: "https://soundcloud.com/akipshidze/da-ass-rules",
      bandcamp: "https://akipshidze.bandcamp.com/track/da-ass-rules",
    },
  },
];

const filterByTag = (tag) => {
  if (tag === null || tag === "") return music;
  return music.filter((element) => element.tags.includes(tag));
};

const filterByTags = (tags) => {
  if (!tags || tags.length === 0 || tags[0] === "") return music;

  return music.filter(
    (element) => tags.every((tag) => element.tags.includes(tag)) // Ensure all tags exist in element.tags
  );
};

const allMusic = {
  music: music,
  filterByTag: filterByTag,
  filterByTags: filterByTags,
  getByTitle: (title) => music.find((track) => track.title === title),
};

export default allMusic;
