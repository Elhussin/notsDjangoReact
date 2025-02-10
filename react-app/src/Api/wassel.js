import { SecureRequest } from './axiosConfig';


export const cchi_get_beneficiary = (data) => SecureRequest('post', 'waseel/get_beneficiary_cchi/', data);

