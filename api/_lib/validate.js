export class ValidationError extends Error {}

const isBlank = (value) =>
  value === undefined || value === null || (typeof value === "string" && value.trim() === "");

// Returns the trimmed string, or null when the field is empty and optional
export function text(body, field, { required = false, max = 200 } = {}) {
  const value = body[field];
  if (isBlank(value)) {
    if (required) throw new ValidationError(`${field} is required.`);
    return null;
  }
  if (typeof value !== "string") throw new ValidationError(`${field} must be text.`);

  const trimmed = value.trim();
  if (trimmed.length > max) {
    throw new ValidationError(`${field} must be at most ${max} characters.`);
  }
  return trimmed;
}

export const flag = (body, field) => body[field] === true;

// An array limited to `allowed` values, stored as a comma-separated string in `allowed` order
export function tagList(body, field, allowed) {
  const value = body[field] ?? [];
  if (!Array.isArray(value) || !value.every((tag) => allowed.includes(tag))) {
    throw new ValidationError(`${field} may only contain: ${allowed.join(", ")}.`);
  }
  return allowed.filter((tag) => value.includes(tag)).join(",");
}

// Only http(s) links, so nothing like `javascript:` ends up in an href on the public site
export function link(body, field, { required = false } = {}) {
  const value = text(body, field, { required, max: 2000 });
  if (value === null) return null;

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new ValidationError(`${field} must be a valid URL.`);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new ValidationError(`${field} must start with http:// or https://.`);
  }
  return url.toString();
}
