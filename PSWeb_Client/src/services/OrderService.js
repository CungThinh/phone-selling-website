import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/orders"

export const getAllOrder = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await axios.get(`${baseUrl}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrderDetails = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await axios.post(`${baseUrl}/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postOrder = async (orderData) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(`${baseUrl}/`, orderData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting order:", error);
    throw error;
  }
};


export const getAllOrderByUserID = async (userID) => {
  try {
    const response = await axios.get(`${baseUrl}/user_id/${userID}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};