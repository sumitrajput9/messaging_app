import axios from "axios";

const API_URL = "http://localhost:5000/api/users";
export function userRegister(data) {
    return axios.post(`${API_URL}/register`, data);
}


export function userLogin(data) {
    return axios.post(`${API_URL}/login`, data);
}

export function logout(user) {
    return axios.post(`${API_URL}/logout`,user);
}

export function getAllUsers() {
    return axios.get(`${API_URL}/list`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
}


export const updateUser = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export const deleteUser = (id) => {
    return axios.delete(`${API_URL}/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export const getUserById = (id) => {
    return axios.get(`${API_URL}/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export const sendMessage = async (receiverId, content,user) => {
    try {

      const response = await axios.post('http://localhost:5000/api/messages/send', { receiverId, content,user },{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };


  export const getMessages = async (senderId, receiverId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/inbox?senderId=${senderId}&receiverId=${receiverId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get messages:', error);
      throw error;
    }
  };