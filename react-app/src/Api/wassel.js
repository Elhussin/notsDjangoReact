import { secureRequest } from './axiosConfig';


export const cchi_get_beneficiary = (data) => secureRequest('post', 'waseel/get_beneficiary_cchi/', data);

