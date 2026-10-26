// Uploads a file straight from the browser to Cloudinary and returns its URL.
// Our serverless functions reject bodies over 4.5 MB, so files never pass
// through them; the API only signs each upload for a fixed folder.
//
// `target` is one of the keys of UPLOAD_TARGETS in api/_lib/media.js.
export async function uploadToCloudinary(file, target, adminFetch) {
  const signed = await adminFetch("/api/admin/upload-signature", {
    method: "POST",
    json: { target },
  });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signed.apiKey);
  formData.append("timestamp", signed.timestamp);
  formData.append("signature", signed.signature);
  formData.append("folder", signed.folder);
  formData.append("allowed_formats", signed.allowed_formats);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signed.cloudName}/${signed.resourceType}/upload`,
    { method: "POST", body: formData }
  );
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error?.message || "Upload to Cloudinary failed.");
  }
  return result.secure_url;
}
