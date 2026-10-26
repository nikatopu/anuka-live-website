// One-off import of the music and sound design content that used to be hardcoded
// (src/content/pages/music/music.js and the list in SoundDesign.jsx) into the database.
// Files stay where they are in /public; the records just point at them.
//
// Usage:  node --env-file=.env scripts/import-static-content.mjs
// Safe to re-run: a table that already has rows is skipped. Delete this script once it has run.
import { PrismaClient } from "@prisma/client";

// In display order (first = top of the page)
const SONGS = [
  {
    "name": "Piku's Dream",
    "description": "Artwork by Nuzi",
    "imageBig": "/img/pages/music/PikusDream.webp",
    "imageSmall": "/img/pages/music/PikusDream.webp",
    "linkSpotify": "https://open.spotify.com/track/0xT4XqzF61w6mhQYOV8sad?si=aaec6fdbc1154739",
    "linkAppleMusic": "https://music.apple.com/us/song/pikus-dream/1821171985",
    "linkYouTube": "https://youtu.be/8SzUBmB4yVs?si=rFnzRiPdiXPsZrfA",
    "linkSoundCloud": "https://on.soundcloud.com/JNLzxvvJx0PEBOYxB0",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/pikus-dream",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "Trampoline Man",
    "description": "Anman x Anuka Kipshidze",
    "imageBig": "/img/pages/music/TrampolineMan.jpeg",
    "imageSmall": "/img/pages/music/TrampolineMan_small.jpg",
    "linkSpotify": "https://open.spotify.com/track/04q0aRyxc4njf3edVM7nSE?si=92a1d104e85146c2",
    "linkAppleMusic": "https://music.apple.com/us/album/trampoline-man-single/1813231266",
    "linkYouTube": "https://www.youtube.com/watch?v=vd4ZbP9cWwA",
    "linkSoundCloud": "https://on.soundcloud.com/gncCqv2rJh4Futfo5j",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/trampoline-man",
    "tags": "Track,Collab",
    "featured": false
  },
  {
    "name": "Ma Tsa De",
    "description": "Artwork by Tata Zakaraia",
    "imageBig": "/img/pages/music/MaTsaDe.png",
    "imageSmall": "/img/pages/music/MaTsaDe_small.png",
    "linkSpotify": "https://open.spotify.com/album/7wxdEPGJMilP4FSGNAULQo",
    "linkAppleMusic": "https://music.apple.com/us/album/ma-tsa-de/1736263329",
    "linkYouTube": "https://www.youtube.com/watch?v=97aLuJ6igXw&list=OLAK5uy_laVur7s7RnXmS3HYdDtV0Z3Crvoqad13w",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/sets/ma-tsa-de?si=0e8352d8875c4ddd8378ee7c4fa4f238&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "linkBandCamp": "https://akipshidze.bandcamp.com/album/ma-tsa-de",
    "tags": "Album",
    "featured": true
  },
  {
    "name": "I Am In The Good List",
    "description": "Bevri Kabeli x Anuka Kipshidze. Artwork by Nika Elia",
    "imageBig": "/img/pages/music/IAmInTheGoodList.jpg",
    "imageSmall": "/img/pages/music/IAmInTheGoodList_small.jpg",
    "linkSpotify": "https://open.spotify.com/track/5K4nF4ykgrNOzHhWJDbLQg?si=51e48cb62f1c4fb4",
    "linkAppleMusic": "https://music.apple.com/ca/album/i-am-in-the-good-list-single/1819501915",
    "linkYouTube": "https://youtu.be/9RZGLzljkL8?si=Z19zLC4MKWI7Sx2j",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/i-am-in-the-good-list?si=3d1670940974438894083f2c9e4d0db8&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/i-am-in-the-good-list",
    "tags": "Track,Collab",
    "featured": false
  },
  {
    "name": "Mona",
    "description": "Artwork by Nuzi",
    "imageBig": "/img/pages/music/Mona.png",
    "imageSmall": "/img/pages/music/Mona_small.png",
    "linkSpotify": "https://open.spotify.com/track/1LmMhBQk7JtFyXQuee31e2?si=5b169f4b3275449f",
    "linkAppleMusic": "https://music.apple.com/us/album/mona/1788194299?i=1788194300",
    "linkYouTube": "https://www.youtube.com/watch?v=OXLfIaA95J4",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/mona",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/mona",
    "tags": "Track",
    "featured": true
  },
  {
    "name": "Kreizi Frog",
    "description": "Photo by Ketewan",
    "imageBig": "/img/pages/music/KreiziFrog.jpeg",
    "imageSmall": "/img/pages/music/KreiziFrog_small.jpg",
    "linkSpotify": "https://open.spotify.com/track/00XnYZA0zuRpFBIidnRwEP?si=a5f91b1513a243dc",
    "linkAppleMusic": "https://music.apple.com/us/album/kreizi-frog/1772409315?i=1772409316",
    "linkYouTube": "https://www.youtube.com/watch?v=1VXYGBP6Bog",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/kreizi-frog",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/kreizi-frog",
    "tags": "Track",
    "featured": true
  },
  {
    "name": "Oboba",
    "description": "Photo by Anuka",
    "imageBig": "/img/pages/music/Oboba.JPG",
    "imageSmall": "/img/pages/music/Oboba_small.JPG",
    "linkSpotify": "https://open.spotify.com/track/1CZeR15olOlPgwr99Uviv9?si=a5d6f8480e7b44cf",
    "linkAppleMusic": "https://music.apple.com/us/album/oboba/1752413658?i=1752413809",
    "linkYouTube": null,
    "linkSoundCloud": "https://soundcloud.com/akipshidze/oboba",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/oboba",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "Vanilla",
    "description": "Anman x Anuka Kipshidze. Artwork by Anman",
    "imageBig": "/img/pages/music/Vanilla.jpeg",
    "imageSmall": "/img/pages/music/Vanilla_small.jpeg",
    "linkSpotify": "https://open.spotify.com/track/2vVGS0RWUr9rr1gQbIsHi4?si=729a70191b6f47b7",
    "linkAppleMusic": "https://music.apple.com/us/album/vanilla/1747139895?i=1747140139",
    "linkYouTube": "https://youtu.be/MtSCWpBQT7A?si=s0eVvqfYgePTIeN_",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/vanilla",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/vanilla",
    "tags": "Track,Collab",
    "featured": false
  },
  {
    "name": "Ali",
    "description": "Artwork by Nuzi",
    "imageBig": "/img/pages/music/Ali.jpg",
    "imageSmall": "/img/pages/music/Ali_small.jpg",
    "linkSpotify": "https://open.spotify.com/track/4ddaVao5BvfkNw80599HiL?si=489d9d7d5b494ea5",
    "linkAppleMusic": "https://music.apple.com/us/album/ali-single/1760641280",
    "linkYouTube": "https://youtu.be/rDm0jm4KDzY?si=4n1Fo2JJUsKgtC9c",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/ali",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/ali",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "Hammock",
    "description": "Artwork by Nuzi",
    "imageBig": "/img/pages/music/Hammock.jpg",
    "imageSmall": "/img/pages/music/Hammock_small.jpg",
    "linkSpotify": "https://open.spotify.com/track/5zyXXd6QcE8Ckpe67xZgRC?si=ba0aabd17bda4df9",
    "linkAppleMusic": "https://music.apple.com/us/album/hammock-single/1768921679",
    "linkYouTube": "https://youtu.be/v3lm5bROYSI?si=OiIb4p5xdVfR7KM-",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/hammock",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/hammock",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "Sakartvelo",
    "description": "Artwork by Nuzi",
    "imageBig": "/img/pages/music/Sakartvelo.jpeg",
    "imageSmall": "/img/pages/music/Sakartvelo_small.jpeg",
    "linkSpotify": "https://open.spotify.com/track/3Z9V9C8alfdu2jDJ321TNv?si=b5be9b3421d9467d",
    "linkAppleMusic": "https://music.apple.com/us/album/sakartvelo/1745186854?i=1745186855",
    "linkYouTube": "https://youtu.be/eUBUUjrhH8g?si=5HoVdlJurkk8HIRd",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/sakartvelo",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/sakartvelo",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "Intro Metri",
    "description": "Artwork by Tata Zakaraia",
    "imageBig": "/img/pages/music/MaTsaDe.png",
    "imageSmall": "/img/pages/music/MaTsaDe_small.png",
    "linkSpotify": "https://open.spotify.com/track/3PgXA0zbYXF5NRS1VjWAep?si=33e93398d2b14caf",
    "linkAppleMusic": "https://music.apple.com/us/album/intro-metri/1736263329?i=1736263330",
    "linkYouTube": "https://youtu.be/97aLuJ6igXw?si=M7dk0ji8xENjupt5",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/intro-metri",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/intro-metri",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "Guntiadi",
    "description": "Artwork by Tata Zakaraia",
    "imageBig": "/img/pages/music/MaTsaDe.png",
    "imageSmall": "/img/pages/music/MaTsaDe_small.png",
    "linkSpotify": "https://open.spotify.com/track/4SmbBhEgT8U47CRXpXbKWJ?si=13ba927b20c346fd",
    "linkAppleMusic": "https://music.apple.com/us/album/guntiadi/1736263329?i=1736263331",
    "linkYouTube": "https://youtu.be/xvO4l05wYt8?si=23Tlglhk3oMc9A0h",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/guntiadi-1",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/guntiadi",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "Ma Tsa De",
    "description": "Artwork by Tata Zakaraia",
    "imageBig": "/img/pages/music/MaTsaDe.png",
    "imageSmall": "/img/pages/music/MaTsaDe_small.png",
    "linkSpotify": "https://open.spotify.com/track/07fNSmUha1kYPSkjG5gFxZ?si=c0e5514e1dcf4f88",
    "linkAppleMusic": "https://music.apple.com/us/album/ma-tsa-de/1736263329?i=1736263332",
    "linkYouTube": "https://youtu.be/iymUg7Jk-JU?si=MXAafbn9ZG8Jk-8a",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/ma-tsa-de",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/ma-tsa-de",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "Suckadrisi",
    "description": "Artwork by Tata Zakaraia",
    "imageBig": "/img/pages/music/MaTsaDe.png",
    "imageSmall": "/img/pages/music/MaTsaDe_small.png",
    "linkSpotify": "https://open.spotify.com/track/3vM0zerX50fpDhBQ6MekHO?si=23c4446cfe8d409f",
    "linkAppleMusic": "https://music.apple.com/us/album/suckadrisi/1736263329?i=1736263333",
    "linkYouTube": "https://youtu.be/fZxHYUPRmXM?si=y-slmkGgzPYUkdyj",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/suckadrisi",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/suckadrisi",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "Sun Tkva",
    "description": "Artwork by Tata Zakaraia",
    "imageBig": "/img/pages/music/MaTsaDe.png",
    "imageSmall": "/img/pages/music/MaTsaDe_small.png",
    "linkSpotify": "https://open.spotify.com/track/4L1VfmUuDiAOEBeiuusFFk?si=75149c90d1874041",
    "linkAppleMusic": "https://music.apple.com/us/album/sun-tkva/1736263329?i=1736263334",
    "linkYouTube": "https://youtu.be/8PkFDquoYVc?si=b7Fv3hYiVKGPzhzP",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/sun-tkva",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/sun-tkva",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "She Eshvi",
    "description": "Artwork by Tata Zakaraia",
    "imageBig": "/img/pages/music/MaTsaDe.png",
    "imageSmall": "/img/pages/music/MaTsaDe_small.png",
    "linkSpotify": "https://open.spotify.com/track/6sEtpJxLrbWtEhIqJjCMyX?si=6c71eaadaf0f44d0",
    "linkAppleMusic": "https://music.apple.com/us/album/she-eshvi/1736263329?i=1736263336",
    "linkYouTube": "https://youtu.be/gjs5dDgJsq8?si=AIZDtBV731p-oAYU",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/she-eshvi",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/she-eshvi",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "Luv Anda",
    "description": "Artwork by Tata Zakaraia",
    "imageBig": "/img/pages/music/MaTsaDe.png",
    "imageSmall": "/img/pages/music/MaTsaDe_small.png",
    "linkSpotify": "https://open.spotify.com/track/0hRbR743wz7MXWjbDvHCdY?si=a935ba88d0fe4530",
    "linkAppleMusic": "https://music.apple.com/us/album/luv-anda/1736263329?i=1736263487",
    "linkYouTube": "https://youtu.be/DX1Bw5qG5A0?si=eBpPdPkmF_D--Erj",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/luv-anda",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/luv-anda",
    "tags": "Track",
    "featured": false
  },
  {
    "name": "Da Ass Rules",
    "description": "Artwork by Tata Zakaraia",
    "imageBig": "/img/pages/music/MaTsaDe.png",
    "imageSmall": "/img/pages/music/MaTsaDe_small.png",
    "linkSpotify": "https://open.spotify.com/track/0VwRozChsTnfBZFU4wSIB4?si=5c0999b78b354554",
    "linkAppleMusic": "https://music.apple.com/us/album/da-ass-rules/1736263329?i=1736263488",
    "linkYouTube": "https://youtu.be/dC1YNiwNexU?si=3Nfb41CzidSQmrRU",
    "linkSoundCloud": "https://soundcloud.com/akipshidze/da-ass-rules",
    "linkBandCamp": "https://akipshidze.bandcamp.com/track/da-ass-rules",
    "tags": "Track",
    "featured": false
  }
];

// In display order (first = top of the page)
const SOUND_DESIGNS = [
  {
    "title": "UI Design by Oelhan. Phone Design by Sandro Aleksidze. Sound Design by Me",
    "videoUrl": "/videos/01.%20UI%20Design%20by%20Oelhan.%20Phone%20Design%20by%20Sandro%20Aleksidze.%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/01.%20UI%20Design%20by%20Oelhan.%20Phone%20Design%20by%20Sandro%20Aleksidze.%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Meet Me at The Back Door. Animation by Nuzi. Music & Sound Design by Me",
    "videoUrl": "/videos/02.%20Meet%20Me%20at%20The%20Back%20Door.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/02.%20Meet%20Me%20at%20The%20Back%20Door.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Bubblegum Juicer. Animation by Nuzi. Music & Sound Design by Me",
    "videoUrl": "/videos/03.%20Bubblegum%20Juicer.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/03.%20Bubblegum%20Juicer.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Phone. Animation by Nuzi. Music & Sound Design by Me",
    "videoUrl": "/videos/04.%20Phone.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/04.%20Phone.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Robotics 2078. Animation by Santoryom. Music & Sound Design by Me",
    "videoUrl": "/videos/05.%20Robotics%202078.%20Animation%20by%20Santoryom.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/05.%20Robotics%202078.%20Animation%20by%20Santoryom.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Animation by Anano Miminoshvili. Music & Sound Design by Me",
    "videoUrl": "/videos/06.%20Animation%20by%20Anano%20Miminoshvili.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/06.%20Animation%20by%20Anano%20Miminoshvili.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Pocket Studio Wind. Animation by Tata Managadze. Music & Sound Design by Me",
    "videoUrl": "/videos/07.%20Pocket%20Studio%20Wind.%20Animation%20by%20Tata%20Managadze.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/07.%20Pocket%20Studio%20Wind.%20Animation%20by%20Tata%20Managadze.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Rubber Ducky. Animation by Nuzi. Music & Sound Design by Me",
    "videoUrl": "/videos/08.%20Rubber%20Ducky.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/08.%20Rubber%20Ducky.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Animation by Nuzi. Music & Sound Design by Me",
    "videoUrl": "/videos/09.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/09.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Animation by Tata Managadze. Music & Sound Design by Me",
    "videoUrl": "/videos/10.%20Animation%20by%20Tata%20Managadze.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/10.%20Animation%20by%20Tata%20Managadze.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Animation by Tata Managadze. Music & Sound Design by Me",
    "videoUrl": "/videos/11.%20Animation%20by%20Tata%20Managadze.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/11.%20Animation%20by%20Tata%20Managadze.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Illustration by Nuzi. Animation by Mariam Topuridze. Music & Sound Design by Me",
    "videoUrl": "/videos/12.%20Illustration%20by%20Nuzi.%20Animation%20by%20Mariam%20Topuridze.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/12.%20Illustration%20by%20Nuzi.%20Animation%20by%20Mariam%20Topuridze.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Animation by Tata Zakaraia. Music & Sound Design by Me",
    "videoUrl": "/videos/13.%20Aniamtion%20by%20Tata%20Zakaraia.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/13.%20Aniamtion%20by%20Tata%20Zakaraia.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Animation by Tata Zakaraia, Music & Sound Design by Me",
    "videoUrl": "/videos/13.%20Aniamtion%20by%20Tata%20Zakaraia,%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/13.%20Aniamtion%20by%20Tata%20Zakaraia,%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Protest. Animation by Nuzi. Music & Sound Design by Me",
    "videoUrl": "/videos/15.%20Protest.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/15.%20Protest.%20Animation%20by%20Nuzi.%20Music%20&%20Sound%20Design%20by%20Me.webp"
  },
  {
    "title": "Animation by Ana Chubinidze, Music & Sound Design by Me",
    "videoUrl": "/videos/16.%20Animation%20by%20Ana%20Chubinidze,%20Music%20&%20Sound%20Design%20by%20Me.webm",
    "thumbnailUrl": "/img/pages/sound%20design/16.%20Animation%20by%20Ana%20Chubinidze,%20Music%20&%20Sound%20Design%20by%20Me.webp"
  }
];

const prisma = new PrismaClient();

// The public API sorts by createdAt descending, so earlier items get later timestamps
const withOrder = (items) => {
  const now = Date.now();
  return items.map((item, index) => ({ ...item, createdAt: new Date(now - index * 1000) }));
};

async function importInto(label, model, items) {
  const existing = await model.count();
  if (existing > 0) {
    console.log(`${label}: skipped, table already has ${existing} rows`);
    return;
  }
  const { count } = await model.createMany({ data: withOrder(items) });
  console.log(`${label}: imported ${count} rows`);
}

try {
  await importInto("Songs", prisma.song, SONGS);
  await importInto("Sound designs", prisma.soundDesign, SOUND_DESIGNS);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
