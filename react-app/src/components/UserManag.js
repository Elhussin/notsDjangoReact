import React, { useEffect, useState } from 'react';
import { getUsers, addUser, deleteUser, updateUser } from '../Api/api';
import { TextField, Button, Checkbox, FormControlLabel, Snackbar, Alert, Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@mui/material';
import SearchFilter from './SearchFilter';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    is_staff: false,
    is_active: true
  });
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await addUser(newUser);
      setMessage('User added successfully');
      fetchUsers();
      setNewUser({ username: '', email: '', password: '', first_name: '', last_name: '', is_staff: false, is_active: true });
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Failed to add user');
    }
    setOpenSnackbar(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setMessage('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Failed to delete user');
    }
    setOpenSnackbar(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleUpdateUser = async () => {
    const updatedUser = { ...selectedUser };
    if (!updatedUser.password) {
      updatedUser.password = selectedUser.password;
    }
console.log(updatedUser)
    try {
      await updateUser(selectedUser.id, updatedUser);
      setMessage('User updated successfully');
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update user');
    }
    setOpenSnackbar(true);
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setSelectedUser({ ...selectedUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Admin User Management</Typography>

      <SearchFilter data={users} searchFields={['username', 'email']} onFilter={setFilteredData} />

      {message && <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={message.includes('successfully') ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>}

      <Typography variant="h6">{selectedUser ? 'Edit User' : 'Add New User'}</Typography>
      <Box component="form" sx={{ maxWidth: 500, margin: '0 auto' }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          required
          value={selectedUser ? selectedUser.username : newUser.username}
          onChange={(e) => handleInputChange(e, !!selectedUser)}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          required
          value={selectedUser ? selectedUser.email : newUser.email}
          onChange={(e) => handleInputChange(e, !!selectedUser)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          required
          value={selectedUser ? selectedUser.password : newUser.password}
          onChange={(e) => handleInputChange(e, !!selectedUser)}
        />
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="first_name"
          value={selectedUser ? selectedUser.first_name : newUser.first_name}
          onChange={(e) => handleInputChange(e, !!selectedUser)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="last_name"
          value={selectedUser ? selectedUser.last_name : newUser.last_name}
          onChange={(e) => handleInputChange(e, !!selectedUser)}
        />

        <FormControlLabel
          control={<Checkbox checked={selectedUser ? selectedUser.is_staff : newUser.is_staff} onChange={(e) => handleInputChange({ target: { name: 'is_staff', value: e.target.checked } }, !!selectedUser)} />}
          label="Is Staff"
        />
        <FormControlLabel
          control={<Checkbox checked={selectedUser ? selectedUser.is_active : newUser.is_active} onChange={(e) => handleInputChange({ target: { name: 'is_active', value: e.target.checked } }, !!selectedUser)} />}
          label="Is Active"
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={selectedUser ? handleUpdateUser : handleAddUser}
          sx={{ marginTop: 2 }}
        >
          {selectedUser ? 'Update User' : 'Add User'}
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>User List</Typography>
      <Box sx={{overflow: 'auto'}}>
      <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active={sortConfig.key === 'id'} direction={sortConfig.direction} onClick={() => handleSort('id')}>
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={sortConfig.key === 'username'} direction={sortConfig.direction} onClick={() => handleSort('username')}>
                  Username
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={sortConfig.key === 'email'} direction={sortConfig.direction} onClick={() => handleSort('email')}>
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Is Staff</TableCell>
              <TableCell>Is Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.reverse().map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.is_staff ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user.is_active ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEditUser(user)}>Edit</Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



      </Box>
    </Container>
  );
};

export default AdminUserManagement;
