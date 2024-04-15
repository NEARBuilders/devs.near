/**
 * Transform input into a consistent and standardized format
 *
 * @param {string} text - The input to normalize.
 * @param {string} delimiter - The delimiter to use between words.
 * @returns {string} - normalized input
 */

const normalize = (text, delimiter) => {
  // If no delimiter is provided, default to an underscore
  delimiter = delimiter || "_";
  return (
    text
      // Convert to lowercase
      .toLowerCase()
      // Replace spaces with dashes
      .replace(/\s+/g, delimiter)
      // Replace any non-alphanumeric characters (excluding dashes) with nothing
      .replace(`/[^a-z0-9${delimiter}]/g`, "")
      // Replace multiple consecutive dashes with a single dash
      .replace(`/${delimiter}+/g`, "-")
      // Trim dashes from the start and end of the string
      .replace(`/^${delimiter}+|${delimiter}+$/g`, "")
  );
};

return { normalize };
