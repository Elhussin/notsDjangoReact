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
  deleteCompany,
  updateCompany,
  createCompany,
  getCompanies,
} from '../Api/api';

const CompaniesManager = () => {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    address: '',
    contact_number: '',
    email: '',
    website: '',
    company_type: '',
  }); // بيانات النموذج
  const [isEditing, setIsEditing] = useState(false); // حالة التعديل
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' }); // حالة الإشعارات

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      console.log(response); // تحقق من هيكل البيانات هنا
      setCompanies(response || []); // استخدم قائمة فارغة إذا لم يتم استرجاع بيانات
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([]); // تجنب الأخطاء الناتجة عن بيانات غير موجودة
    }
  };
  
  // إنشاء أو تحديث شركة
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateCompany(form.id, form);
        showSnackbar('Company updated successfully!', 'success');
      } else {
        await createCompany(form);
        showSnackbar('Company created successfully!', 'success');
      }
      fetchCompanies();
      resetForm();
    } catch (error) {
      showSnackbar('Error submitting company.', 'error');
    }
  };

  // حذف شركة
  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);
      fetchCompanies();
      showSnackbar('Company deleted successfully!', 'success');
    } catch (error) {
      showSnackbar('Error deleting company.', 'error');
    }
  };

  // إعداد النموذج للتعديل
  const handleEdit = (company) => {
    setForm(company);
    setIsEditing(true);
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setForm({
      id: null,
      name: '',
      address: '',
      contact_number: '',
      email: '',
      website: '',
      company_type: '',
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
    fetchCompanies();
  }, []);

  return (
    <Box sx={{ padding: 2, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Companies Manager
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              fullWidth
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Number"
              fullWidth
              value={form.contact_number}
              onChange={(e) => setForm({ ...form, contact_number: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Website"
              type="url"
              fullWidth
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={form.company_type}
                onChange={(e) => setForm({ ...form, company_type: e.target.value })}
                required
              >
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="agent">Agent</MenuItem>
                <MenuItem value="supplier">Supplier</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isEditing ? 'Update' : 'Create'}
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
        Companies List
      </Typography>
      <Grid container spacing={3}>
      {Array.isArray(companies) && companies.map((company) => (
        <Grid item xs={12} sm={6} md={4} key={company.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{company.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {company.address}
              </Typography>
              <Typography variant="body2">{company.contact_number}</Typography>
              <Typography variant="body2">{company.email}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleEdit(company)}>
                Edit
              </Button>
              <Button size="small" color="error" onClick={() => handleDelete(company.id)}>
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

export default CompaniesManager;
