import React, { useState } from "react";
import { cchi_get_beneficiary } from "../Api/wassel"; // API function for user registration
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

/**
 * RegisterForm Component
 * Handles user registration with input validation and feedback.
 */
const CchiBeneficiary = () => {
  const [formData, setFormData] = useState({
    username: "hsm01",
    provider: "917",
    password: "opt666",
    patientKey: '2307701827',
    systemType: 1,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  /**
   * Handle input changes.
   * @param {object} e - Event object from input fields.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handle form submission.
   * Sends user data to the backend for registration.
   * @param {object} e - Event object from form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      // API call to register the user
      const response = await cchi_get_beneficiary(formData);
      setMessage("CCHI get data successfully!");
      console.log(response)
      // setTimeout(() => {
      //   navigate("/login"); // Redirect to login page
      // }, 3000); // 3-second delay
    } catch (err) {
      setError(err?.response?.data?.detail || "CCHI get data  failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" gutterBottom>
        CCHI Get Beneficiary
      </Typography>

      {/* Success Message */}
      {message && <Alert severity="success">{message}</Alert>}

      {/* Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
      <TextField
          label="ID No"
          name="patientKey"
          value={formData.patientKey}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Wassel Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Provider"
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Wassel Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Box sx={{ position: "relative", marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "send"}
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: "primary",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </form>
    </Box>
  );
};

export default CchiBeneficiary;
