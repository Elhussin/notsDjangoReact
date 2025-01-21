import React, { useState, useEffect } from "react";
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
  CardMedia,
} from "@mui/material";

import { deleteBrand, updateBrand, createBrand, getBrands } from "../Api/api";

/**
 * BrandsManager Component
 * 
 * This component provides a management interface for handling brand information.
 * Features:
 * - Add, edit, and delete brands
 * - Upload and preview logos
 * - Display a list of existing brands
 * - Notify users about actions via Snackbar
 */
const BrandsManager = () => {
  const [brands, setBrands] = useState([]); // Holds the list of brands
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    logo: null, // Holds the selected file for logo
    is_active: true,
  }); // Manages the form data
  const [isEditing, setIsEditing] = useState(false); // Determines if the form is in editing mode
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  }); // Manages Snackbar notifications
  const [preview, setPreview] = useState(null); // Stores the preview URL for the uploaded logo

  /**
   * Fetch the list of brands from the server.
   */
  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response || []); // Use an empty array if no data is received
    } catch (error) {
      console.error("Error fetching brands:", error);
      setBrands([]);
    }
  };

  /**
   * Handles the form submission to create or update a brand.
   * Uses FormData to send data, including the logo file.
   * @param {Event} e - The form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("is_active", form.is_active);
      if (form.logo) formData.append("logo", form.logo);

      if (isEditing) {
        await updateBrand(form.id, formData);
        showSnackbar("Brand updated successfully!", "success");
      } else {
        await createBrand(formData);
        showSnackbar("Brand created successfully!", "success");
      }
      fetchBrands(); // Refresh the list of brands
      resetForm(); // Reset the form to its initial state
    } catch (error) {
      console.error("Error submitting brand:", error);
      showSnackbar("Error submitting brand.", "error");
    }
  };

  /**
   * Deletes a brand by its ID.
   * @param {number} id - The ID of the brand to delete
   */
  const handleDelete = async (id) => {
    try {
      await deleteBrand(id);
      fetchBrands();
      showSnackbar("Brand deleted successfully!", "success");
    } catch (error) {
      showSnackbar("Error deleting brand.", "error");
    }
  };

  /**
   * Prepares the form for editing a specific brand.
   * @param {Object} brand - The brand data to edit
   */
  const handleEdit = (brand) => {
    setForm({
      id: brand.id,
      name: brand.name,
      description: brand.description,
      logo: null, // Reset the logo input field
      is_active: brand.is_active,
    });
    setPreview(brand.logo); // Display the current logo for preview
    setIsEditing(true);
  };

  /**
   * Resets the form to its default state.
   */
  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      description: "",
      logo: null,
      is_active: true,
    });
    setPreview(null); // Clear the preview image
    setIsEditing(false);
  };

  /**
   * Displays a Snackbar notification.
   * @param {string} message - The notification message
   * @param {string} severity - The notification severity ('success', 'error', etc.)
   */
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  /**
   * Closes the Snackbar notification.
   */
  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  // Fetch brands on component mount
  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <Box sx={{ padding: 2, maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Brands Manager
      </Typography>

      {/* Form for creating/updating a brand */}
      <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Brand Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              fullWidth
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <Typography variant="subtitle1" gutterBottom>
                Upload Logo
              </Typography>
              <Button
                variant="outlined"
                component="label"
                color="primary"
                sx={{ textTransform: "none", marginBottom: 2 }}
              >
                Choose File
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setForm({ ...form, logo: file });
                    setPreview(URL.createObjectURL(file)); // Display preview of the image
                  }}
                />
              </Button>
              {preview && (
                <Box mt={2} textAlign="center">
                  <Typography variant="subtitle1" gutterBottom>
                    Logo Preview:
                  </Typography>
                  <img
                    src={preview}
                    alt="Logo Preview"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      padding: "4px",
                    }}
                  />
                </Box>
              )}
            </FormControl>
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
              {isEditing ? "Update Brand" : "Create Brand"}
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

      {/* List of existing brands */}
      <Typography variant="h5" gutterBottom>
        Brands List
      </Typography>
      <Grid container spacing={3}>
        {Array.isArray(brands) &&
          brands.map((brand) => (
            <Grid item xs={12} sm={6} md={4} key={brand.id}>
              <Card>
                {brand.logo && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={brand.logo}
                    alt={`${brand.name} Logo`}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{brand.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {brand.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleEdit(brand)}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDelete(brand.id)}>
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BrandsManager;
