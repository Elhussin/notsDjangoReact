import {SecureRequest} from './AxiosConfig';

const EXE_URL = 'accounting/accounts/';
const TAXES_URL = 'accounting/taxes/';
const categories = 'accounting/categories/';
const TRANSACTIONS_URL = 'accounting/transactions/';
// الحصول على حساب واحد باستخدام ID
export const getAccount = (id) => SecureRequest('get', `${EXE_URL}${id}/`);

// الحصول على جميع الحسابات
export const getAccounts = () => SecureRequest('get', EXE_URL);

// إنشاء حساب جديد
export const createAccount = (data) => SecureRequest('post', EXE_URL, data);

// تحديث حساب موجود
export const updateAccount = (id, data) => SecureRequest('put', `${EXE_URL}${id}/`, data);

// حذف حساب
export const deleteAccount = (id) => SecureRequest('delete', `${EXE_URL}${id}/`);


// Taxes
export const getTaxes = (id) => SecureRequest('get', `${TAXES_URL}${id}/`);
export const getTaxess = () => SecureRequest('get', TAXES_URL);
export const createTax = (data) => SecureRequest('post', TAXES_URL, data);
export const updateTaxes = (id, data) => SecureRequest('put', `${TAXES_URL}${id}/`, data);
export const deleteTax = (id) => SecureRequest('delete', `${TAXES_URL}${id}/`);

// categories
export const getCategory = (id) => SecureRequest('get', `${categories}${id}/`);
export const getCategories = () => SecureRequest('get', categories);
export const createCategory = (data) => SecureRequest('post', categories, data);
export const updateCategories = (id, data) => SecureRequest('put', `${categories}${id}/`, data);
export const deleteCategory = (id) => SecureRequest('delete', `${categories}${id}/`);

//transactions
export const getTransactions = () => SecureRequest('get', TRANSACTIONS_URL);
export const getTransaction = (id) => SecureRequest('get', `${TRANSACTIONS_URL}${id}/`);
export const createTransaction = (data) => SecureRequest('post', TRANSACTIONS_URL, data);
export const updateTransaction = (id, data) => SecureRequest('put', `${TRANSACTIONS_URL}${id}/`, data);
export const deleteTransaction = (id) => SecureRequest('delete', `${TRANSACTIONS_URL}${id}/`);