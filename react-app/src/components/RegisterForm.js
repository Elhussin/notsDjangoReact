import React, { useState } from "react";
import { addUser } from "../Api/api"; // API function for user registration
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");
    setIsLoading(true);
    try {
      const response = await addUser(formData);
      if (response) {
        setMessage("User registered successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      if (error) {
        setErrors(error);
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
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
        Register
      </Typography>
      {message && <Alert severity="success">{message}</Alert>}
      {errors.general && <Alert severity="error">{errors.general}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {errors.username && errors.username.map((msg, index) => (
          <Alert key={index} severity="error">{msg}</Alert>
        ))}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {errors.email && errors.email.map((msg, index) => (
          <Alert key={index} severity="error">{msg}</Alert>
        ))}
        <TextField
          label="Password"
          name="password1"
          type="password"
          value={formData.password1}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {errors.password1 && errors.password1.map((msg, index) => (
          <Alert key={index} severity="error">{msg}</Alert>
        ))}
        <TextField
          label="Re Enter Password"
          name="password2"
          type="password"
          value={formData.password2}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {errors.password2 && errors.password2.map((msg, index) => (
          <Alert key={index} severity="error">{msg}</Alert>
        ))}
        <Box sx={{ position: "relative", marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
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

export default RegisterForm;