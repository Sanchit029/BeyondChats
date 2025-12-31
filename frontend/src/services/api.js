/**
 * API Service Layer
 * Handles all HTTP requests to the backend
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export async function getArticles() {
  const response = await api.get('/articles');
  return response.data;
}

export async function getArticle(id) {
  const response = await api.get(`/articles/${id}`);
  return response.data;
}

export async function scrapeArticles() {
  const response = await api.post('/articles/scrape');
  return response.data;
}
