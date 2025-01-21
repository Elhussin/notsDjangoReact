import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

/**
 * OrderForm component for creating a new order.
 * 
 * This component allows the user to input order details such as order number,
 * branch, status, and additional details, then submit the order.
 * 
 * @param {Array} branches - List of available branches to choose from.
 * @param {Function} onCreateOrder - Function to handle the order creation.
 */
const OrderForm = ({ branches, onCreateOrder }) => {
  console.log("branches",branches)
  // State to hold new order details
  const [newOrder, setNewOrder] = useState({
    order_number: '',
    branch_id: '',
    status: 'pending_shop',
    details: '',
  });

  const [branchExists, setBranchExists] = useState(true); // حالة للتحقق من وجود الفرع

  /**
   * Handle form submission.
   * 
   * Prevents the default form behavior, calls the onCreateOrder function passed 
   * as a prop, and then resets the form state.
   * 
   * @param {Object} e - Event object from the form submission.
   */
  const handleSubmit = (e) => {
    
    e.preventDefault();

    // تحقق من أن branch_id موجود في قائمة الأفرع
    const isBranchValid = branches.some(branch => branch.id === newOrder.branch_id);
    if (!isBranchValid) {
      setBranchExists(false); // تعيين حالة غير موجودة إذا لم يكن الفرع صحيحًا
      return;
    }
    // Trigger the order creation with the current form state
    onCreateOrder(newOrder);

    // Reset the form state after submission
    setNewOrder({ order_number: '', branch_id: '', status: 'pending_shop', details: '' });
    setBranchExists(true); // إعادة تعيين الحالة بعد الإرسال الناجح

  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      {/* Order Number */}
      <TextField
        label="Order Number"
        variant="outlined"
        fullWidth
        value={newOrder.order_number}
        onChange={(e) => setNewOrder({ ...newOrder, order_number: e.target.value })}
        placeholder="Order Number"
        sx={{ marginBottom: 2 }}
        required
      />

      {/* Branch Selection */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Branch</InputLabel>
        <Select
          value={newOrder.branch_id}
          onChange={(e) => setNewOrder({ ...newOrder, branch_id: e.target.value })}
          label="Branch"
          required
        >
          <MenuItem value="">Select Branch</MenuItem>
          {branches.map((branch) => (
            <MenuItem key={branch.id} value={branch.id}>
              {branch.id}: {branch.name}
            </MenuItem>
          ))}
        </Select>
        {!branchExists && <p style={{ color: 'red' }}>Invalid Branch selected!</p>}

      </FormControl>

      {/* Status Selection */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={newOrder.status}
          onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
          label="Status"
        >
          <MenuItem value="pending_shop">Pending In Shop</MenuItem>
          <MenuItem value="pending_lab">Pending In Lab</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      {/* Details Textarea */}
      <TextField
        label="Details"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={newOrder.details}
        onChange={(e) => setNewOrder({ ...newOrder, details: e.target.value })}
        placeholder="Details"
        sx={{ marginBottom: 2 }}
      />

      {/* Submit Button */}
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Create Order
      </Button>
    </Box>
  );
};

export default OrderForm;
