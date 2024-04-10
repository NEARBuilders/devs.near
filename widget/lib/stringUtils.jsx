/**
 * Transform input into a consistent and standardized format
 *
 * @param {string} text - The input to normalize.
 * @returns {string} - normalized input
 */

const normalize = (text) =>
  text
    // Convert to lowercase
    .toLowerCase()
    // Replace spaces with dashes
    .replace(/\s+/g, "-")
    // Replace any non-alphanumeric characters (excluding dashes) with nothing
    .replace(/[^a-z0-9-]/g, "")
    // Replace multiple consecutive dashes with a single dash
    .replace(/-+/g, "-")
    // Trim dashes from the start and end of the string
    .replace(/^-+|-+$/g, "");

return { normalize };