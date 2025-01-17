import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // تأكد من تحديث عنوان الخادم الخاص بك

// تهيئة Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



// تسجيل الدخول
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/token/', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred');
  }
};



// جلب قائمة الفروع
export const getBranches = async () => {
  try {
    const response = await api.get('/api/branches/');
    return response.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error.response ? error.response.data : new Error('Failed to fetch branches');
  }
};


// حذف مستخدم
export const deleteUser = async (userId) => {
  const token = localStorage.getItem('access_token');
  try {
    await api.delete(`/api/admin/users/${userId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error.response ? error.response.data : new Error('Failed to delete user');
  }
};

// جلب الطلبات
export const fetchOrders = async () => {
  const token = localStorage.getItem('access_token');
  try {
    const response = await api.get('/api/orders/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error.response ? error.response.data : new Error('Failed to fetch orders');
  }
};




// export const getBranches = async () => await API.get('branches/');
// export const createBranch = async (data) => await API.post('branches/', data);
// export const updateBranch = async (id, data) => await API.put(`branches/${id}/`, data);
// export const deleteBranch = async (id) => await API.delete(`branches/${id}/`);

// export const getOrders = async () => await API.get('orders/');
// export const createOrder = async (data) => await API.post('orders/', data);
// export const updateOrder = async (id, data) => await API.put(`orders/${id}/`, data);
// export const deleteOrder = async (id) => await API.delete(`orders/${id}/`);



// // إعداد عنوان URL الأساسي لـ API
// const API_BASE_URL = 'http://localhost:8000'; // استبدل هذا بالعنوان الصحيح لـ Django

// // تهيئة axios
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // تسجيل مستخدم جديد
// export const registerUser = async (userData) => {
//   try {
//     const response = await api.post('/api/register/', userData);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : new Error('An error occurred');
//   }
// };

// // تسجيل الدخول
// export const loginUser = async (credentials) => {
//   try {
//     const response = await API.post('/token/', credentials);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : new Error('An error occurred');
//   }
// };






// // جلب بيانات المستخدم
// export const fetchUserData = async () => {
//   const token = localStorage.getItem('access_token');
//   try {
//     const response = await api.get('/api/user/', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     throw error.response ? error.response.data : new Error('Failed to fetch user data');
//   }
// };


// // جلب قائمة الفروع
// export const getBranches = async () => {
//   try {
//     const response = await api.get('/api/branches/');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching branches:', error);
//     throw error.response ? error.response.data : new Error('Failed to fetch branches');
//   }
// };

// // حذف مستخدم
// export const deleteUser = async (userId) => {
//   const token = localStorage.getItem('access_token');
//   try {
//     await api.delete(`/api/admin/users/${userId}/`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     throw error.response ? error.response.data : new Error('Failed to delete user');
//   }
// };
// // دالة لتسجيل الخروج
// export const logoutUser = () => {
//   localStorage.removeItem('access_token');
//   localStorage.removeItem('refresh_token');
// };


// // جلب الطلبات
// export const fetchOrders = async () => {
//   const token = localStorage.getItem('access_token');
//   try {
//     const response = await api.get('/api/orders/', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     throw error.response ? error.response.data : new Error('Failed to fetch orders');
//   }
// };
