import React, { useState, useEffect } from 'react';
import {
  Switch,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  getBranchManagers,
  createBranchManager,
  updateBranchManager,
  deleteBranchManager,
  getUsers,
  getBranches,
} from '../../Api/api';

/**
 * BranchManagerList Component
 * 
 * Displays a list of branch managers and allows creating, updating, and deleting them.
 * Utilizes Material-UI for styling and responsiveness.
 */
const BranchManagerList = () => {
  const [branchManagers, setBranchManagers] = useState([]);
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState({
    id: null, // Determines if we're editing (id will be set) or creating (id is null)
    user: '',
    branch: '',
    status: false, // New field for the status
  });

  /**
   * Fetch initial data for branch managers, users, and branches.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [managersData, usersData, branchesData] = await Promise.all([
          getBranchManagers(),
          getUsers(),
          getBranches(),
        ]);
        setBranchManagers(managersData);
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
   * Handle form submission for creating or updating a branch manager.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: formState.user,
      branch_id: formState.branch,
      status: formState.status,
    };

    try {
      if (formState.id) {
        // Update existing manager
        const updatedManager = await updateBranchManager(formState.id, payload);
        setBranchManagers(
          branchManagers.map((manager) =>
            manager.id === updatedManager.id ? updatedManager : manager
          )
        );
      } else {
        // Create new manager
        const newManager = await createBranchManager(payload);
        setBranchManagers([...branchManagers, newManager]);
      }
      // Reset the form
      setFormState({ id: null, user: '', branch: '', status: false });
    } catch (err) {
      setError('Failed to save branch manager');
    }
  };

  /**
   * Handle edit action to populate the form with the manager's data.
   */
  const handleEdit = (manager) => {
    setFormState({
      id: manager.id,
      user: manager.user.id,
      branch: manager.branch.id,
      status: manager.status,
    });
  };

  /**
   * Handle delete action for a branch manager.
   */
  const handleDelete = async (id) => {
    try {
      await deleteBranchManager(id);
      setBranchManagers(branchManagers.filter((manager) => manager.id !== id));
    } catch (err) {
      setError('Failed to delete branch manager');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box padding={4} maxWidth={{ xs: '100%', md: '50%' }} margin="auto">
      <Typography variant="h4" gutterBottom>
        Branch Managers
      </Typography>

      {/* Form Section */}
      <Box component="form" onSubmit={handleSubmit} marginBottom={4}>
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
        {branchManagers.map((manager) => (
          <Box
            key={manager.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
            padding={2}
            border={1}
            borderRadius={2}
          >
            <Typography>
              User: {manager.user.username}, Branch: {manager.branch.name},
              Status: {manager.status ? 'Active' : 'Inactive'}
            </Typography>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(manager)}
                style={{ marginRight: 8 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(manager.id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BranchManagerList;
