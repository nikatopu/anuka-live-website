// Validated field sets for each content type. On update, media fields may be
// omitted to keep the existing file; text fields are always sent in full.
import { text, link, flag, tagList } from "./validate.js";
import { assetUrl } from "./media.js";

// Matches the filter buttons on the public music page
export const SONG_TAGS = ["Album", "Track", "Collab"];

export function readBlogFields(body, { isUpdate = false } = {}) {
  return {
    title: text(body, "title", { required: true, max: 200 }),
    description: text(body, "description", { required: true, max: 5000 }),
    redirectLink: link(body, "redirectLink", { required: true }),
    tags: text(body, "tags", { required: true, max: 200 }),
    imageUrl: assetUrl(body, "imageUrl", "blogImage", { required: !isUpdate }),
  };
}

export function readSongFields(body, { isUpdate = false } = {}) {
  return {
    name: text(body, "name", { required: true, max: 200 }),
    description: text(body, "description", { max: 5000 }),
    imageBig: assetUrl(body, "imageBig", "songImageBig", { required: !isUpdate }),
    imageSmall: assetUrl(body, "imageSmall", "songImageSmall", { required: !isUpdate }),
    linkSpotify: link(body, "linkSpotify"),
    linkAppleMusic: link(body, "linkAppleMusic"),
    linkYouTube: link(body, "linkYouTube"),
    linkSoundCloud: link(body, "linkSoundCloud"),
    linkBandCamp: link(body, "linkBandCamp"),
    tags: tagList(body, "tags", SONG_TAGS),
    featured: flag(body, "featured"),
  };
}

export function readSoundDesignFields(body, { isUpdate = false } = {}) {
  return {
    title: text(body, "title", { required: true, max: 200 }),
    videoUrl: assetUrl(body, "videoUrl", "reelVideo", { required: !isUpdate }),
    thumbnailUrl: assetUrl(body, "thumbnailUrl", "reelThumbnail", { required: !isUpdate }),
  };
}

// Drops media fields that weren't replaced, so the update keeps the current file
export function withoutEmptyMedia(data, mediaFields) {
  const result = { ...data };
  for (const field of mediaFields) {
    if (!result[field]) delete result[field];
  }
  return result;
}
