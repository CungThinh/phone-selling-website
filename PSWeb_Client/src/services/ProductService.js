import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/products'; // Thay URL thật sự vào đây

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

export const getProductByID = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}`, error);
      throw error;
    }
  };
  
  export const createProduct = async (productData) => {
    try {
      const response = await axios.post(API_URL, productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product", error);
      throw error;
    }
  };
  
  export const updateProduct = async (id, productData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}`, error);
      throw error;
    }
  };
  
  export const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with id ${id}`, error);
      throw error;
    }
  };


