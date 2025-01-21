import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true, // لضمان إرسال الكوكيز تلقائيًا
});

// Interceptor لإضافة التوكن تلقائيًا
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor لتجديد التوكن إذا انتهت صلاحيته
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post('token/refresh/');
        console.log('Token refreshed:', response.data);
        const newAccessToken = response.data.access_token;

        // تحديث التوكن في localStorage
        localStorage.setItem('access_token', newAccessToken);

        // تحديث التوكن في الطلب الأصلي
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.clear();
        window.location.href = '/login'; // إعادة توجيه المستخدم لتسجيل الدخول
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
