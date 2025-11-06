import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para debug
api.interceptors.request.use((config) => {
  console.log(`🔄 Haciendo request a: ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("✅ Respuesta recibida:", response.status);
    return response;
  },
  (error) => {
    console.error("❌ Error de API:", error);
    return Promise.reject(error);
  }
);
