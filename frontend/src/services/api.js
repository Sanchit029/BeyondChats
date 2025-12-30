import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function getArticles() {
  const response = await axios.get(`${API_URL}/articles`);
  return response.data;
}

export async function getArticle(id) {
  const response = await axios.get(`${API_URL}/articles/${id}`);
  return response.data;
}

export async function scrapeArticles() {
  const response = await axios.post(`${API_URL}/articles/scrape`);
  return response.data;
}
