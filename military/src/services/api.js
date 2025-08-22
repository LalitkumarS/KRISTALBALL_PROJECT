// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Export custom functions, not raw API
const api = {
  getAssets: () => API.get("/assets"),
  addAsset: (asset) => API.post("/assets", asset),
  updateAsset: (id, asset) => API.put(`/assets/${id}`, asset),
  deleteAsset: (id) => API.delete(`/assets/${id}`),
  addPurchase: (purchase) => API.post("/purchases", purchase),
  getPurchases: () => API.get("/purchases"),
};

export default api;
