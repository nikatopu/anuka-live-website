import cloudinary from "../../src/lib/cloudinary.js";
import { ValidationError } from "./validate.js";

// Where each kind of admin upload is allowed to go. The browser uploads straight to
// Cloudinary with a signature from /api/admin/upload-signature, because Vercel
// functions reject request bodies over 4.5 MB (too small for video reels).
export const UPLOAD_TARGETS = {
  blogImage: { folder: "my_project_blogs", resourceType: "image" },
  songImageBig: { folder: "my_project_songs/big", resourceType: "image" },
  songImageSmall: { folder: "my_project_songs/small", resourceType: "image" },
  reelVideo: { folder: "my_project_sound_designs/videos", resourceType: "video" },
  reelThumbnail: { folder: "my_project_sound_designs/thumbnails", resourceType: "image" },
};

const ALLOWED_FORMATS = {
  image: "jpg,jpeg,png,webp,avif,gif",
  video: "mp4,webm,mov,m4v",
};

export function signUpload(targetKey) {
  if (!Object.hasOwn(UPLOAD_TARGETS, targetKey)) return null;
  const target = UPLOAD_TARGETS[targetKey];

  const { cloud_name, api_key, api_secret } = cloudinary.config();
  const params = {
    folder: target.folder,
    allowed_formats: ALLOWED_FORMATS[target.resourceType],
    timestamp: Math.round(Date.now() / 1000),
  };
  return {
    cloudName: cloud_name,
    apiKey: api_key,
    resourceType: target.resourceType,
    signature: cloudinary.utils.api_sign_request(params, api_secret),
    ...params,
  };
}

const parseCloudinaryUrl = (value) => {
  try {
    const url = new URL(value);
    return url.hostname === "res.cloudinary.com" ? url : null;
  } catch {
    return null;
  }
};

// e.g. https://res.cloudinary.com/<cloud>/image/upload/v123/folder/name.jpg -> folder/name
export function getPublicIdFromUrl(value) {
  const url = parseCloudinaryUrl(value);
  if (!url) return null;

  const parts = url.pathname.split("/");
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex === -1) return null;

  let rest = parts.slice(uploadIndex + 1);
  if (/^v\d+$/.test(rest[0])) rest = rest.slice(1);
  const path = decodeURIComponent(rest.join("/"));
  const dot = path.lastIndexOf(".");
  return dot === -1 ? path : path.substring(0, dot);
}

// Accepts only URLs of assets in this Cloudinary account, inside the target's folder
export function assetUrl(body, field, targetKey, { required = false } = {}) {
  const value = body[field];
  if (value === undefined || value === null || value === "") {
    if (required) throw new ValidationError(`${field} is required.`);
    return null;
  }

  const { folder, resourceType } = UPLOAD_TARGETS[targetKey];
  const url = typeof value === "string" ? parseCloudinaryUrl(value) : null;
  const expectedPrefix = `/${cloudinary.config().cloud_name}/${resourceType}/upload/`;
  if (
    !url ||
    url.protocol !== "https:" ||
    url.search ||
    url.hash ||
    !url.pathname.startsWith(expectedPrefix) ||
    !(getPublicIdFromUrl(value) || "").startsWith(`${folder}/`)
  ) {
    throw new ValidationError(`${field} must be a file uploaded through the admin panel.`);
  }
  return url.toString();
}

// Best effort: a leftover file in Cloudinary shouldn't fail the request
export async function destroyAsset(url, resourceType) {
  const publicId = getPublicIdFromUrl(url);
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType, invalidate: true });
  } catch (error) {
    console.error(`Failed to delete Cloudinary asset ${publicId}:`, error);
  }
}
