import { secureRequest } from './axiosConfig';


// export const cchi_get_beneficiary = (data) => secureRequest('post', 'get_beneficiary_cchi/', data,'waseel/');


export const getCustomer = () => secureRequest('get', 'branches/');
