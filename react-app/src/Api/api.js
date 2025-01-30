// Import custom API configuration and secure request helper functions
import { API } from './axiosConfig';
import { secureRequest } from './axiosConfig';

/**
 * Authenticates a user and retrieves an access token.
 * @param {Object} credentials - The user's login credentials (e.g., username and password).
 * @returns {Promise<Object>} - The response data containing the access token.
 * @throws Will throw an error if the request fails.
 */
export const login = async (credentials) => {
  try {
    const response = await API.post('token/', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred');
  }
};

/**
 * Adds a new user.
 * @param {Object} userData - The data for the new user.
 * @returns {Promise<Object>} - The created user data.
 *  * @throws Will throw an error if the request fails.
 */
export const addUser  = async (data) => {
  try {
    const response = await API.post('users/', data);
    return response.data;
  } catch (error) {
    if (error.response) {
        console.error("Registration failed:", error.response.data);
        throw error.response.data;
    } else {
        console.error("Network error:", error.message);
        throw error.message;
    }
  }
};


/**
 * Retrieves the list of all users.
 * @returns {Promise<Object[]>} - The list of users.
 */
export const getUsers = () => secureRequest('get', 'users/');


/**
 * Retrieves details of a specific user. He has active session
 * @returns {Promise<Object[]>} - The list of users.
 */
export const getUsersByToken = () => secureRequest('get', 'user/');



/**
 * Retrieves details of a specific user.
 * @param {number|string} userId - The ID of the user.
 * @returns {Promise<Object>} - The user details.
 */
export const getUser = (userId) => secureRequest('get', `users/${userId}/`);

/**
 * Adds a new user.
 * @param {Object} userData - The data for the new user.
 * @returns {Promise<Object>} - The created user data.
 */
// export const addUser = (userData) => secureRequest('post', 'users/', userData);

/**
 * Updates an existing user.
 * @param {number|string} userId - The ID of the user.
 * @param {Object} userData - The updated user data.
 * @returns {Promise<Object>} - The updated user data.
 */
export const updateUser = (userId, userData) =>
  secureRequest('put', `users/${userId}/`, userData);

/**
 * Deletes a user by ID.
 * @param {number|string} userId - The ID of the user.
 * @returns {Promise<void>} - A promise indicating the success of the operation.
 */
export const deleteUser = (userId) => secureRequest('delete', `users/${userId}/`);

/**
 * Retrieves the list of all branches.
 * @returns {Promise<Object[]>} - The list of branches.
 */
export const getBranches = () => secureRequest('get', 'branches/');

/**
 * Adds a new branch.
 * @param {Object} data - The branch data.
 * @returns {Promise<Object>} - The created branch data.
 */
export const addBranch = (data) => secureRequest('post', 'branches/', data);

/**
 * Updates an existing branch.
 * @param {number|string} id - The ID of the branch.
 * @param {Object} data - The updated branch data.
 * @returns {Promise<Object>} - The updated branch data.
 */
export const updateBranch = (id, data) =>
  secureRequest('put', `branches/${id}/`, data);

/**
 * Deletes a branch by ID.
 * @param {number|string} id - The ID of the branch.
 * @returns {Promise<void>} - A promise indicating the success of the operation.
 */
export const deleteBranch = (id) => secureRequest('delete', `branches/${id}/`);

/**
 * Retrieves the list of all orders.
 * @returns {Promise<Object[]>} - The list of orders.
 */
export const getOrders = () => secureRequest('get', 'orders/');

/**
 * Creates a new order.
 * @param {Object} data - The order data.
 * @returns {Promise<Object>} - The created order data.
 */
export const addOrder = (data) => secureRequest('post', 'orders/', data);

/**
 * Updates an existing order.
 * @param {number|string} id - The ID of the order.
 * @param {Object} data - The updated order data.
 * @returns {Promise<Object>} - The updated order data.
 */
export const updateOrder = (id, data) =>
  secureRequest('put', `orders/${id}/`, data);

/**
 * Deletes an order by ID.
 * @param {number|string} id - The ID of the order.
 * @returns {Promise<void>} - A promise indicating the success of the operation.
 */
export const deleteOrder = (id) => secureRequest('delete', `orders/${id}/`);

/**
 * Retrieves the list of all branch managers.
 * @returns {Promise<Object[]>} - The list of branch managers.
 */
export const getBranchManagers = () => secureRequest('get', 'branch_managers/');

/**
 * Creates a new branch manager.
 * @param {Object} data - The branch manager data.
 * @returns {Promise<Object>} - The created branch manager data.
 */
export const createBranchManager = (data) =>
  secureRequest('post', 'branch_managers/', data);

/**
 * Updates an existing branch manager.
 * @param {number|string} id - The ID of the branch manager.
 * @param {Object} data - The updated branch manager data.
 * @returns {Promise<Object>} - The updated branch manager data.
 */
export const updateBranchManager = (id, data) =>
  secureRequest('put', `branch_managers/${id}/`, data);

/**
 * Deletes a branch manager by ID.
 * @param {number|string} id - The ID of the branch manager.
 * @returns {Promise<void>} - A promise indicating the success of the operation.
 */
export const deleteBranchManager = (id) =>
  secureRequest('delete', `branch_managers/${id}/`);

/**
 * Retrieves the list of all companies.
 * @returns {Promise<Object[]>} - The list of companies.
 */
export const getCompanies = () => secureRequest('get', 'companies/');

/**
 * Creates a new company.
 * @param {Object} data - The company data.
 * @returns {Promise<Object>} - The created company data.
 */
export const createCompany = (data) =>
  secureRequest('post', 'companies/', data);

/**
 * Updates an existing company.
 * @param {number|string} id - The ID of the company.
 * @param {Object} data - The updated company data.
 * @returns {Promise<Object>} - The updated company data.
 */
export const updateCompany = (id, data) =>
  secureRequest('put', `companies/${id}/`, data);

/**
 * Deletes a company by ID.
 * @param {number|string} id - The ID of the company.
 * @returns {Promise<void>} - A promise indicating the success of the operation.
 */
export const deleteCompany = (id) =>
  secureRequest('delete', `companies/${id}/`);

/**
 * Retrieves the list of all factories.
 * @returns {Promise<Object[]>} - The list of factories.
 */
export const getFactories = () => secureRequest('get', 'factories/');

/**
 * Creates a new factory.
 * @param {Object} data - The factory data.
 * @returns {Promise<Object>} - The created factory data.
 */
export const createFactory = (data) =>
  secureRequest('post', 'factories/', data);

/**
 * Updates an existing factory.
 * @param {number|string} id - The ID of the factory.
 * @param {Object} data - The updated factory data.
 * @returns {Promise<Object>} - The updated factory data.
 */
export const updateFactory = (id, data) =>
  secureRequest('put', `factories/${id}/`, data);

/**
 * Deletes a factory by ID.
 * @param {number|string} id - The ID of the factory.
 * @returns {Promise<void>} - A promise indicating the success of the operation.
 */
export const deleteFactory = (id) =>
  secureRequest('delete', `factories/${id}/`);


/**
 * Retrieves the list of all brands.
 * @returns {Promise<Object[]>} - The list of brands.
 */
export const getBrands = () => secureRequest('get', 'brands/');

/**
 * Creates a new brand.
 * @param {Object} data - The brand data.
 * @returns {Promise<Object>} - The created brand data.
 */
export const createBrand = (data) =>
  secureRequest('post', 'brands/', data);

/**
 * Updates an existing brand.
 * @param {number|string} id - The ID of the brand.
 * @param {Object} data - The updated brand data.
 * @returns {Promise<Object>} - The updated brand data.
 */
export const updateBrand = (id, data) =>
  secureRequest('put', `brands/${id}/`, data);

/**
 * Deletes a brand by ID.
 * @param {number|string} id - The ID of the brand.
 * @returns {Promise<void>} - A promise indicating the success of the operation.
 */
export const deleteBrand = (id) =>
  secureRequest('delete', `brands/${id}/`);



/**
 * Retrieves the list of all categories.
 * @returns {Promise<Object[]>} - The list of categories.
 */
export const getCategories = () => secureRequest('get', 'categories/');

/**
 * Creates a new category.
 * @param {Object} data - The category data.
 * @returns {Promise<Object>} - The created category data.
 */
export const createCategory = (data) =>
  secureRequest('post', 'categories/', data);

/**
 * Updates an existing category.
 * @param {number|string} id - The ID of the category.
 * @param {Object} data - The updated category data.
 * @returns {Promise<Object>} - The updated category data.
 */
export const updateCategory = (id, data) =>
  secureRequest('put', `categories/${id}/`, data);

/**
 * Deletes a category by ID.
 * @param {number|string} id - The ID of the category.
 * @returns {Promise<void>} - A promise indicating the success of the operation.
 */
export const deleteCategory = (id) =>
  secureRequest('delete', `categories/${id}/`);


/**
 * Retrieves the list of all products.
 * @returns {Promise<Object[]>} - The list of products.
 */
export const getProducts = () => secureRequest('get', 'products/');

/**
 * Creates a new product.
 * @param {Object} data - The product data.
 * @returns {Promise<Object>} - The created product data.
 */
export const createProduct = (data) =>
  secureRequest('post', 'products/', data);

/**
 * Updates an existing product.
 * @param {number|string} id - The ID of the product.
 * @param {Object} data - The updated product data.
 * @returns {Promise<Object>} - The updated product data.
 */
export const updateProduct = (id, data) =>
  secureRequest('put', `products/${id}/`, data);

/**
 * Deletes a product by ID.
 * @param {number|string} id - The ID of the product.
 * @returns {Promise<void>} - A promise indicating the success of the operation.
 */
export const deleteProduct = (id) =>
  secureRequest('delete', `products/${id}/`);


