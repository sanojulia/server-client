import axios from 'axios';

const API_BASE_URL =  'http://localhost:5000';
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const apiService = {

async searchProducts(query) {
    const response = await fetch(`${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    return await response.json();
  },

  // Get products by category
  async getProductsByCategory(category) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/${category.toLowerCase()}`);
      return response.data;
    } catch (error) {
      console.error('Error getting products by category:', error);
      throw error;
    }
  },

  // Get product by ID
  async getProductById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  }
};

export const searchProducts = async (query) => {
  const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Search failed');
  return await response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/product/${id}`);
  if (!response.ok) throw new Error('Failed to load product');
  return await response.json();
};