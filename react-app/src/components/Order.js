// import React, { useState, useEffect } from 'react';
// import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
// import { getOrders, addOrder, updateOrder, deleteOrder, getBranches } from '../Api/api';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Order = () => {
//     const [orders, setOrders] = useState([]);
//     const [branches, setBranches] = useState([]);
//     const [formData, setFormData] = useState({ order_number: '', status: '', branch_id: '', details: '' });
//     const [editMode, setEditMode] = useState(false);
//     const [currentOrderId, setCurrentOrderId] = useState(null);

//     const statusOptions = [
//         'pending_shop', 'pending_lab', 'send_lab', 'in_lab', 'in_shop', 'in_progress', 'completed', 'cancelled'
//     ];

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const ordersData = await getOrders();
//                 setOrders(ordersData);

//                 const branchesData = await getBranches();
//                 setBranches(branchesData);
//             } catch (error) {
//                 toast.error('Error fetching data!');
//                 console.error(error);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editMode) {
//                 await updateOrder(currentOrderId, formData);
//                 toast.success('Order updated successfully!');
//             } else {
//                 await addOrder(formData);
//                 toast.success('Order added successfully!');
//             }
//             const data = await getOrders();
//             setOrders(data);
//             setFormData({ order_number: '', status: '', branch_id: '', details: '' });
//             setEditMode(false);
//         } catch (error) {
//             toast.error('Error submitting order!');
//             console.error(error);
//         }
//     };

//     const handleEdit = (order) => {
//         setEditMode(true);
//         setFormData({ 
//             order_number: order.order_number, 
//             status: order.status, 
//             branch_id: order.branch.id, 
//             details: order.details 
//         });
//         setCurrentOrderId(order.id);
//     };

//     const handleDelete = async (orderId) => {
//         try {
//             await deleteOrder(orderId);
//             setOrders(orders.filter((order) => order.id !== orderId));
//             toast.success('Order deleted successfully!');
//         } catch (error) {
//             toast.error('Error deleting order!');
//             console.error(error);
//         }
//     };

//     return (
//         <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
//             <ToastContainer />
//             <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>Order Management</Typography>

//             <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4 }}>
//                 <TextField
//                     label="Order Number"
//                     name="order_number"
//                     value={formData.order_number}
//                     onChange={handleInputChange}
//                     required
//                     fullWidth
//                     margin="normal"
//                 />
//                 <FormControl fullWidth margin="normal" required>
//                     <InputLabel>Status</InputLabel>
//                     <Select
//                         name="status"
//                         value={formData.status}
//                         onChange={handleInputChange}
//                     >
//                         {statusOptions.map((status) => (
//                             <MenuItem key={status} value={status}>{status}</MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 <FormControl fullWidth margin="normal" required>
//                     <InputLabel>Branch</InputLabel>
//                     <Select
//                         name="branch_id"
//                         value={formData.branch_id}
//                         onChange={handleInputChange}
//                     >
//                         {branches.map((branch) => (
//                             <MenuItem key={branch.id} value={branch.id}>{branch.name}</MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 <TextField
//                     label="Details"
//                     name="details"
//                     value={formData.details}
//                     onChange={handleInputChange}
                    
//                     fullWidth
//                     margin="normal"
//                 />
//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     sx={{ marginTop: 2 }}
//                 >
//                     {editMode ? 'Update Order' : 'Add Order'}
//                 </Button>
//             </Box>

//             <Typography variant="h5" sx={{ marginBottom: 2 }}>Order List</Typography>
//             <List>
//                 {orders.map((order) => (
//                     <ListItem
//                         key={order.id}
//                         sx={{ borderBottom: '1px solid #ddd', padding: 2 }}
//                         secondaryAction={
//                             <>
//                                 <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(order)}>
//                                     <EditIcon color="primary" />
//                                 </IconButton>
//                                 <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(order.id)}>
//                                     <DeleteIcon color="secondary" />
//                                 </IconButton>
//                             </>
//                         }
//                     >
//                         <ListItemText
//                             primary={`Order Number: ${order.order_number}`}
//                             secondary={`Status: ${order.status} | Branch: ${order.branch?.name} | Details: ${order.details}`}
//                         />
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//     );
// };

// export default Order;

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Box, Button, TextField, Typography, List, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { getOrders, addOrder, updateOrder, deleteOrder, getBranches } from '../Api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderItem from './OrderItem';

const Order = memo(function Order() {
    const [orders, setOrders] = useState([]);
    const [branches, setBranches] = useState([]);
    const [formData, setFormData] = useState({ order_number: '', status: '', branch_id: '', details: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);

    const statusOptions = [
        'pending_shop', 'pending_lab', 'send_lab', 'in_lab', 'in_shop', 'in_progress', 'completed', 'cancelled'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersData = await getOrders();
                setOrders(ordersData);

                const branchesData = await getBranches();
                setBranches(branchesData);
            } catch (error) {
                toast.error('Error fetching data!');
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await updateOrder(currentOrderId, formData);
                toast.success('Order updated successfully!');
            } else {
                await addOrder(formData);
                toast.success('Order added successfully!');
            }
            const data = await getOrders();
            setOrders(data);
            setFormData({ order_number: '', status: '', branch_id: '', details: '' });
            setEditMode(false);
        } catch (error) {
            toast.error('Error submitting order!');
            console.error(error);
        }
    };

    const handleEdit = useCallback((order) => {
        setEditMode(true);
        setFormData({ 
            order_number: order.order_number, 
            status: order.status, 
            branch_id: order.branch.id, 
            details: order.details 
        });
        setCurrentOrderId(order.id);
    }, []);

    const handleDelete = useCallback(async (orderId) => {
        try {
            await deleteOrder(orderId);
            setOrders(orders.filter((order) => order.id !== orderId));
            toast.success('Order deleted successfully!');
        } catch (error) {
            toast.error('Error deleting order!');
            console.error(error);
        }
    }, [orders]);

    const memoizedOrders = useMemo(() => orders, [orders]);
    const memoizedBranches = useMemo(() => branches, [branches]);

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
            <ToastContainer />
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>Order Management</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4 }}>
                <TextField
                    label="Order Number"
                    name="order_number"
                    value={formData.order_number}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>{status}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Branch</InputLabel>
                    <Select
                        name="branch_id"
                        value={formData.branch_id}
                        onChange={handleInputChange}
                    >
                        {memoizedBranches.map((branch) => (
                            <MenuItem key={branch.id} value={branch.id}>{branch.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Details"
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
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
                    {editMode ? 'Update Order' : 'Add Order'}
                </Button>
            </Box>

            <Typography variant="h5" sx={{ marginBottom: 2 }}>Order List</Typography>
            <List>
                {memoizedOrders.map((order) => (
                    <OrderItem
                        key={order.id}
                        order={order}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </List>
        </Box>
    );
});

export default Order;