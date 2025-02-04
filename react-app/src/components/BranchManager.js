import React, { useState, useEffect, memo } from 'react';
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  CircularProgress,
  Box,
  Switch,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  Divider,
} from '@mui/material';
import {
  getBranchManagers,
  createBranchManager,
  updateBranchManager,
  deleteBranchManager,
  getUsers,
  getBranches,
} from '../Api/api';
import SearchFilter from './SearchFilter';

/**
 * BranchManager Component
 * Manages the CRUD operations for branch managers, including assigning managers to branches,
 * updating their details, and displaying the list of managers.
 */
const BranchManager = memo(function BranchManager() {

  // State to hold data and control component behavior
  const [branchManagers, setBranchManagers] = useState([]); // All branch managers
  const [filteredManagers, setFilteredManagers] = useState([]); // Filtered list of managers for display
  const [users, setUsers] = useState([]); // List of users available to assign as branch managers
  const [branches, setBranches] = useState([]); // List of branches available for assignment
  const [loading, setLoading] = useState(true); // Loading state for API calls
  const [error, setError] = useState(null); // Error state for handling API failures
  const [formState, setFormState] = useState({
    id: null, // ID of the manager being edited (null for new managers)
    user: '', // Selected user ID for the manager
    branch: '', // Selected branch ID for the manager
    status: false, // Active or inactive status of the manager
  });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  /**
   * Fetch initial data for branch managers, users, and branches.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [managersData, usersData, branchesData] = await Promise.all([
          getBranchManagers(), // Fetch branch managers
          getUsers(),          // Fetch users
          getBranches(),       // Fetch branches
        ]);
        setBranchManagers(managersData);
        setFilteredManagers(managersData);
        setUsers(usersData);
        setBranches(branchesData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Handle displaying notification messages.
   * @param {string} message - Message to display
   * @param {string} severity - Severity of the message ('success', 'error', etc.)
   */
  const handleNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  /**
   * Handle form submission for creating or updating a branch manager.
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: formState.user, // User ID to assign as manager
      branch_id: formState.branch, // Branch ID to assign
      status: formState.status, // Active or inactive status
    };

    try {
      if (formState.id) {
        // Update an existing branch manager
        const updatedManager = await updateBranchManager(formState.id, payload);
        setBranchManagers(
          branchManagers.map((manager) =>
            manager.id === updatedManager.id ? updatedManager : manager
          )
        );
        handleNotification('Branch manager updated successfully!', 'success');
      } else {
        // Create a new branch manager
        const newManager = await createBranchManager(payload);
        setBranchManagers([...branchManagers, newManager]);
        handleNotification('Branch manager created successfully!', 'success');
      }
      // Reset the form after submission
      setFormState({ id: null, user: '', branch: '', status: false });
    } catch (err) {
      handleNotification('Failed to save branch manager', 'error');
    }
  };

  /**
   * Populate the form with data for editing an existing branch manager.
   * @param {Object} manager - Branch manager data
   */
  const handleEdit = (manager) => {
    setFormState({
      id: manager.id, // Manager ID
      user: manager.user.id, // User ID
      branch: manager.branch.id, // Branch ID
      status: manager.status, // Status
    });
  };

  /**
   * Delete a branch manager by ID.
   * @param {number} id - ID of the manager to delete
   */
  const handleDelete = async (id) => {
    try {
      await deleteBranchManager(id);
      setBranchManagers(branchManagers.filter((manager) => manager.id !== id));
      handleNotification('Branch manager deleted successfully!', 'success');
    } catch (err) {
      handleNotification('Failed to delete branch manager', 'error');
    }
  };

  // Show loading spinner if data is still loading
  if (loading) return <CircularProgress />;
  // Show error message if fetching data failed
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box padding={4} maxWidth={{ xs: '100%', md: '50%' }} margin="auto">
      <Typography variant="h4" gutterBottom>
        Branch Managers
      </Typography>

      {/* Search and Filter Section */}
      <SearchFilter
        data={branchManagers}
        searchFields={['user.username', 'branch.name']} // Fields to search
        onFilter={setFilteredManagers} // Callback to update filtered list
      />

      {/* Form Section */}
      <Box component="form" onSubmit={handleSubmit} marginBottom={4}>
        {/* User Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>User</InputLabel>
          <Select
            value={formState.user}
            onChange={(e) => setFormState({ ...formState, user: e.target.value })}
          >
            <MenuItem value="">Select User</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Branch Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Branch</InputLabel>
          <Select
            value={formState.branch}
            onChange={(e) => setFormState({ ...formState, branch: e.target.value })}
          >
            <MenuItem value="">Select Branch</MenuItem>
            {branches.map((branch) => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Status Switch */}
        <Box display="flex" alignItems="center" marginY={2}>
          <Typography>Status:</Typography>
          <Switch
            checked={formState.status}
            onChange={(e) => setFormState({ ...formState, status: e.target.checked })}
          />
        </Box>

        <Button variant="contained" color="primary" type="submit">
          {formState.id ? 'Update Manager' : 'Create Manager'}
        </Button>
      </Box>

      {/* List Section */}
      <Box>
        {filteredManagers.map((manager) => (
          <Card
            key={manager.id}
            variant="outlined"
            sx={{ marginBottom: 2, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          >
            <CardContent>
              <Typography variant="h6">
                User: {manager.user.username}
              </Typography>
              <Typography variant="body1">
                Branch: {manager.branch.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {manager.status ? 'Active' : 'Inactive'}
              </Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(manager)}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(manager.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default BranchManager;
