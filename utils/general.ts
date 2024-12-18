const DOUBLE_SLASH = /\/\//g;
const HASH_SLASH = /#\/?$/g;
const TRAILING_SLASH = /\/$/;
export const cleanUrlSlash = (url: string) => {
  return url
    .replace(HASH_SLASH, "#") // Fixes: #/ -> #
    .replace(DOUBLE_SLASH, "/") // Fixes: // -> /
    .replace(TRAILING_SLASH, ""); // Fixes: / ->
};
