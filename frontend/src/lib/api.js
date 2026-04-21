import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "./authStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

async function parseJsonSafe(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function request(path, options = {}, retryOnAuth = true) {
  const access = getAccessToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (access && !headers.Authorization) {
    headers.Authorization = `Bearer ${access}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && retryOnAuth) {
    const refresh = getRefreshToken();
    if (refresh) {
      const refreshed = await refreshAccessToken(refresh);
      if (refreshed) {
        return request(path, options, false);
      }
    }
  }

  if (!response.ok) {
    const payload = await parseJsonSafe(response);
    const error = new Error(payload?.detail || "Request failed");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return parseJsonSafe(response);
}

export async function registerUser(payload) {
  return request("/api/auth/register/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser({ username, password }) {
  const data = await request("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setTokens(data);
  return data;
}

export async function refreshAccessToken(refreshToken) {
  try {
    const data = await request(
      "/api/auth/refresh/",
      {
        method: "POST",
        body: JSON.stringify({ refresh: refreshToken }),
      },
      false,
    );
    if (data?.access) {
      setTokens({ access: data.access, refresh: refreshToken });
      return data.access;
    }
  } catch {
    clearTokens();
  }
  return null;
}

export async function getProjects() {
  return request("/api/projects/");
}
