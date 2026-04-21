const ACCESS_TOKEN_KEY = "ncb_access_token";
const REFRESH_TOKEN_KEY = "ncb_refresh_token";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens({ access, refresh }) {
  if (access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
  }
  if (refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  // Clean up common legacy keys if they were used earlier.
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function hasToken() {
  return Boolean(getAccessToken());
}
