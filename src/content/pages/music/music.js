// Helpers for songs from /api/get/songs (managed in the admin panel)

export const songTags = (song) =>
  song.tags ? song.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [];

// Keeps songs that have every tag in `tags`; no tags means all songs
export const filterByTags = (songs, tags) => {
  if (!tags || tags.length === 0 || tags[0] === "") return songs;
  return songs.filter((song) => tags.every((tag) => songTags(song).includes(tag)));
};

// Converts a song record into the props TrackTile expects
export const toTrackProps = (song) => ({
  nameTrack: song.name,
  descTrack: song.description || "",
  imageTrack: { big: song.imageBig, small: song.imageSmall, name: song.name },
  linksTrack: {
    spotify: song.linkSpotify,
    imusic: song.linkAppleMusic,
    youtube: song.linkYouTube,
    soundcloud: song.linkSoundCloud,
    bandcamp: song.linkBandCamp,
  },
});
