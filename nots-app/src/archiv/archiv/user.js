import {API }from "../../Api/axiosConfig";
import {secureRequest }from "../../Api/axiosConfig";

import { toast } from "react-toastify"; 


// export const login = async (username, password) => {
//   const response = await API.post('token/', { username, password });
//   console.log(response.data)
//   return response.data;

// };

// export const addUser = async (userData) => {
//     try {
//       const response = await API.post("users/", userData);
//       console.log(response.data);
//       return response.data;
    
//     } catch (error) {
//       console.error(error.response.data);
//       console.error("Failed to add user:", error);
//       throw error;
//     }
//   };


// export const deleteUser = async (userId) => {
//   try {
//     const response = await API.delete(`users/${userId}/`);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to delete user:", error);
//     throw error;
//   }
// };





// export const updateUser = async (userId, userData) => {
//     try {
      
//       await ensureTokenValidity();
//       const response = await API.put(`users/${userId}/`, userData);
//       return response.data;
//     } catch (error) {
//       console.error("Failed to update user:", error);
//       throw error;
//     }
//   };





  
  // الاستخدام:


//   // جلب بيانات المستخدم
// export const fetchUserData = async () => {
//     // const token = localStorage.getItem('access_token');
//     try {
//         const response = await API.get('/users/');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         throw error.response ? error.response.data : new Error('Failed to fetch user data');
//     }
// };
  

// export  const logoutUser = () => {
//     localStorage.clear();
//     toast.warn("Log Out success "); // عرض رسالة خطأ
//     window.location.href = "/login";
//   };
  