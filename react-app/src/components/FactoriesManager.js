import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
} from '@mui/material';

import {
  deleteFactory,
  updateFactory,
  createFactory,
  getFactories,
} from '../Api/api';

const FactoriesManager = () => {
  const [factories, setFactories] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    location: '',
    contact_email: '',
    capacity: '',
    owner_name: '',
    is_active: true,
  }); // بيانات النموذج
  const [isEditing, setIsEditing] = useState(false); // حالة التعديل
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' }); // حالة الإشعارات

  const fetchFactories = async () => {
    try {
      const response = await getFactories();
      console.log(response); // تحقق من هيكل البيانات هنا
      setFactories(response || []); // استخدم قائمة فارغة إذا لم يتم استرجاع بيانات
    } catch (error) {
      console.error('Error fetching factories:', error);
      setFactories([]); // تجنب الأخطاء الناتجة عن بيانات غير موجودة
    }
  };
  
  // إنشاء أو تحديث مصنع
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateFactory(form.id, form);
        showSnackbar('Factory updated successfully!', 'success');
      } else {
        await createFactory(form);
        showSnackbar('Factory created successfully!', 'success');
      }
      fetchFactories();
      resetForm();
    } catch (error) {
      showSnackbar('Error submitting factory.', 'error');
    }
  };

  // حذف مصنع
  const handleDelete = async (id) => {
    try {
      await deleteFactory(id);
      fetchFactories();
      showSnackbar('Factory deleted successfully!', 'success');
    } catch (error) {
      showSnackbar('Error deleting factory.', 'error');
    }
  };

  // إعداد النموذج للتعديل
  const handleEdit = (factory) => {
    setForm(factory);
    setIsEditing(true);
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setForm({
      id: null,
      name: '',
      location: '',
      contact_email: '',
      capacity: '',
      owner_name: '',
      is_active: true,
    });
    setIsEditing(false);
  };

  // إظهار الإشعار
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  // إخفاء الإشعار
  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  useEffect(() => {
    fetchFactories();
  }, []);

  return (
    <Box sx={{ padding: 2, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Factories Manager
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Factory Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              fullWidth
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Email"
              type="email"
              fullWidth
              value={form.contact_email}
              onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Capacity"
              type="number"
              fullWidth
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Owner Name"
              fullWidth
              value={form.owner_name}
              onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.value })}
                required
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isEditing ? 'Update Factory' : 'Create Factory'}
            </Button>
            {isEditing && (
              <Button
                onClick={resetForm}
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ marginTop: 1 }}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h5" gutterBottom>
        Factories List
      </Typography>
      <Grid container spacing={3}>
        {Array.isArray(factories) && factories.map((factory) => (
          <Grid item xs={12} sm={6} md={4} key={factory.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{factory.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {factory.location}
                </Typography>
                <Typography variant="body2">{factory.contact_email}</Typography>
                <Typography variant="body2" value='1'>Capacity: {factory.capacity} </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(factory)}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={() => handleDelete(factory.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FactoriesManager;
