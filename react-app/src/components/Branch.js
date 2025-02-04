import React, { useState, useEffect, memo } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { getBranches, addBranch, updateBranch, deleteBranch } from '../Api/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();
/**
 * Branch Component
 * 
 * This component manages a list of branches, including creating, updating, and deleting branches.
 * It uses Material-UI for styling and provides a user-friendly interface.
*/
const Branch = memo(function Branch() {

    const [branches, setBranches] = useState([]); // State to hold branches
    const [formData, setFormData] = useState({ name: '', location: '', phone: '' }); // State for form data
    const [editMode, setEditMode] = useState(false); // State to toggle edit mode
    const [currentBranchId, setCurrentBranchId] = useState(null); // State to track branch being edited
 
    // Fetch branches when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBranches();
                setBranches(data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };
        fetchData();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await updateBranch(currentBranchId, formData);
            } else {
                await addBranch(formData);
            }
            const data = await getBranches();
            setBranches(data);
            setFormData({ name: '', location: '', phone: '' });
            setEditMode(false);
        } catch (error) {
            console.error('Error submitting branch:', error);
        }
    };

    // Handle branch edit
    const handleEdit = (branch) => {
        setEditMode(true);
        setFormData({ name: branch.name, location: branch.location, phone: branch.phone });
        setCurrentBranchId(branch.id);
    };

    // Handle branch delete
    const handleDelete = async (branchId) => {
        try {
            await deleteBranch(branchId);
            setBranches(branches.filter((branch) => branch.id !== branchId));
        } catch (error) {
            console.error('Error deleting branch:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
            {/* Title */}
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>Branch Management</Typography>

            {/* Branch Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    {editMode ? 'Update Branch' : 'Add Branch'}
                </Button>
            </Box>

            {/* Branch List */}
            <Typography variant="h5" sx={{ marginBottom: 2 }}>Branch List</Typography>
            <List>
                {branches.map((branch) => (
                    <ListItem
                        key={branch.id}
                        sx={{ borderBottom: '1px solid #ddd', padding: 2 }}
                        secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(branch)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(branch.id)}>
                                    <DeleteIcon color="secondary" />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText
                            primary={branch.name}
                            secondary={`Location: ${branch.location} | Phone: ${branch.phone}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
});

export default Branch;
