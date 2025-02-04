import { SecureRequest } from './AxiosConfig';


// export const cchi_get_beneficiary = (data) => SecureRequest('post', 'get_beneficiary_cchi/', data,'waseel/');


export const getCustomer = () => SecureRequest('get', 'crm/customers/');



export const getComplaints = () => SecureRequest('get', 'crm/complaints/');


export const getinteractions = () => SecureRequest('get', 'crm/interactions/');
