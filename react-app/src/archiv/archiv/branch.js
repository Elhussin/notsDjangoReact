import {API} from '../../Api/axiosConfig'; // ملف تكوين Axios

export const getBranches = async () => {
    const response = await API.get('/branches/');
    console.log(response)
    return response.data;
};
export const addBranch = async (branchData) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } 
    const response = await API.post('/branches/', branchData);
    return response.data;
};

export const updateBranch = async (branchId, branchData) => {
    const response = await API.put(`/branches/${branchId}/`, branchData);
    return response.data;
};

export const deleteBranch = async (branchId) => {
    const response = await API.delete(`/branches/${branchId}/`);
    return response.status;
};
