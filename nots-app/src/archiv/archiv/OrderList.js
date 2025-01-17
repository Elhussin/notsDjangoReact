import React from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

/**
 * OrderList component to display a list of orders.
 * 
 * This component renders a list of orders with their details (order number, status, and branch name).
 * It also provides buttons to update or delete an order.
 * 
 * @param {Array} orders - List of orders to display.
 * @param {Function} onUpdateOrder - Function to update the status of an order.
 * @param {Function} onDeleteOrder - Function to delete an order.
 */
const OrderList = ({ orders, onUpdateOrder, onDeleteOrder }) => {
  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Order List</Typography>

      {/* Render the list of orders */}
      <List>
        {orders.map((order) => (
          <ListItem key={order.id} sx={{ borderBottom: '1px solid #ccc', padding: 2 }}>
            <ListItemText
              primary={`Order Number: ${order.order_number}`}
              secondary={`Status: ${order.status} | Branch: ${order.branch.name}`}
              sx={{ flexGrow: 1 }}
            />
            
            {/* Update Button */}
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ marginRight: 1 }}
              onClick={() => onUpdateOrder(order.id, 'in_progress')}
            >
              Update
            </Button>
            
            {/* Delete Button */}
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => onDeleteOrder(order.id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OrderList;
