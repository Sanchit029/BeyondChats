const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

async function getArticles() {
  const response = await axios.get(`${API_URL}/articles`);
  return response.data;
}

async function getArticle(id) {
  const response = await axios.get(`${API_URL}/articles/${id}`);
  return response.data;
}

async function updateArticle(id, data) {
  const response = await axios.put(`${API_URL}/articles/${id}`, data);
  return response.data;
}

module.exports = {
  getArticles,
  getArticle,
  updateArticle
};
