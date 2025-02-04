import React, { memo } from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderItem = memo(function OrderItem({ order, onEdit, onDelete }) {
    return (
        <ListItem
            sx={{ borderBottom: '1px solid #ddd', padding: 2 }}
            secondaryAction={
                <>
                    <IconButton edge="end" aria-label="edit" onClick={() => onEdit(order)}>
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => onDelete(order.id)}>
                        <DeleteIcon color="secondary" />
                    </IconButton>
                </>
            }
        >
            <ListItemText
                primary={`Order Number: ${order.order_number}`}
                secondary={`Status: ${order.status} | Branch: ${order.branch?.name} | Details: ${order.details}`}
            />
        </ListItem>
    );
});

export default OrderItem;