import axios from "axios";

const API_BASE = "https://doctors-api.vercel.app";

export const api = axios.create({
  baseURL: API_BASE,
});

// Attach token automatically
export const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
