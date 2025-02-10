// src/api/transactionApi.js
import { SecureRequest } from './axiosConfig';

const COUSTOMERS_URL = 'crm/customers/';
const INTERACTIONS_URL = 'crm/interactions/';
const COMPLAINTS_URL = 'crm/complaints/';
const OPPORTUNITIES_URL = 'crm/opportunities/';
const TASKS_URL = 'crm/tasks/';
const CAMPAIGNS_URL = 'crm/campaigns/';
const TEAMS_URL = 'crm/teams/';
const DOCUMENTS_URL = 'crm/documents/';

// Customers
export const getCustomers = () => SecureRequest('get', COUSTOMERS_URL);
export const getCustomer = (id) => SecureRequest('get', `${COUSTOMERS_URL}${id}/`);
export const createCustomer= (data) => SecureRequest('post', COUSTOMERS_URL, data);
export const updateCustomer= (id, data) => SecureRequest('put', `${COUSTOMERS_URL}${id}/`, data);
export const deleteCustomer= (id) => SecureRequest('delete', `${COUSTOMERS_URL}${id}/`);

// Interactions
export const getInteractions = () => SecureRequest('get', INTERACTIONS_URL);
export const getInteraction = (id) => SecureRequest('get', `${INTERACTIONS_URL}${id}/`);
export const createInteraction= (data) => SecureRequest('post', INTERACTIONS_URL, data);
export const updateInteraction= (id, data) => SecureRequest('put', `${INTERACTIONS_URL}${id}/`, data);
export const deleteInteraction= (id) => SecureRequest('delete', `${INTERACTIONS_URL}${id}/`);

// Complaints
export const getComplaints = () => SecureRequest('get', COMPLAINTS_URL);
export const getComplaint = (id) => SecureRequest('get', `${COMPLAINTS_URL}${id}/`);
export const createComplaint= (data) => SecureRequest('post', COMPLAINTS_URL, data);
export const updateComplaint= (id, data) => SecureRequest('put', `${COMPLAINTS_URL}${id}/`, data);
export const deleteComplaint= (id) => SecureRequest('delete', `${COMPLAINTS_URL}${id}/`);

// Opportunities
export const getOpportunities = () => SecureRequest('get', OPPORTUNITIES_URL);
export const getOpportunity = (id) => SecureRequest('get', `${OPPORTUNITIES_URL}${id}/`);
export const createOpportunity= (data) => SecureRequest('post', OPPORTUNITIES_URL, data);
export const updateOpportunity= (id, data) => SecureRequest('put', `${OPPORTUNITIES_URL}${id}/`, data);
export const deleteOpportunity= (id) => SecureRequest('delete', `${OPPORTUNITIES_URL}${id}/`);

// Tasks
export const getTasks = () => SecureRequest('get', TASKS_URL);
export const getTask = (id) => SecureRequest('get', `${TASKS_URL}${id}/`);
export const createTask= (data) => SecureRequest('post', TASKS_URL, data);
export const updateTask= (id, data) => SecureRequest('put', `${TASKS_URL}${id}/`, data);
export const deleteTask= (id) => SecureRequest('delete', `${TASKS_URL}${id}/`);

// Campaigns
export const getCampaigns = () => SecureRequest('get', CAMPAIGNS_URL);
export const getCampaign = (id) => SecureRequest('get', `${CAMPAIGNS_URL}${id}/`);
export const createCampaign= (data) => SecureRequest('post', CAMPAIGNS_URL, data);
export const updateCampaign= (id, data) => SecureRequest('put', `${CAMPAIGNS_URL}${id}/`, data);
export const deleteCampaign= (id) => SecureRequest('delete', `${CAMPAIGNS_URL}${id}/`);

// Teams
export const getTeams = () => SecureRequest('get', TEAMS_URL);
export const getTeam = (id) => SecureRequest('get', `${TEAMS_URL}${id}/`);
export const createTeam= (data) => SecureRequest('post', TEAMS_URL, data);
export const updateTeam= (id, data) => SecureRequest('put', `${TEAMS_URL}${id}/`, data);
export const deleteTeam= (id) => SecureRequest('delete', `${TEAMS_URL}${id}/`);

// Documents
export const getDocuments = () => SecureRequest('get', DOCUMENTS_URL);
export const getDocument = (id) => SecureRequest('get', `${DOCUMENTS_URL}${id}/`);
export const createDocument= (data) => SecureRequest('post', DOCUMENTS_URL, data);
export const updateDocument= (id, data) => SecureRequest('put', `${DOCUMENTS_URL}${id}/`, data);
export const deleteDocument= (id) => SecureRequest('delete', `${DOCUMENTS_URL}${id}/`);
