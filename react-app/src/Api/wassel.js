import axios from 'axios';

import { secureRequest } from './axiosConfig';

// const data ={
//   provider: '917',
//   patientKey: '2307701827',
//   systemType: 1,
//   "username": username,
//   "password": password
// }


export const cchi_get_beneficiary = (data) => secureRequest('post', 'get_beneficiary_cchi/', data,'waseel/');

// const get=cchi_get_beneficiary(data)
// console.log(get)
// export const fethCchi  = async (data) => {
//   try {
//     const response = await wasselApi.post('/get_beneficiary_cchi/', data);
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//         console.error("Registration failed:", error.response.data);
//         throw error.response.data;
//     } else {
//         console.error("Network error:", error.message);
//         throw error.message;
//     }
//   }
// };



// const fetchData = async () => {
//   try {
//     const response = await axios.post('http://127.0.0.1:8000/wassel/get_beneficiary_data/', {
//       provider: '917',
//       patientKey: '2307701827',
//       systemType: 1,
//     });

//     console.log('Response Data:', response.data);
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.data : error.message);
//   }
// };

// fetchData();
