import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRegister } from "../../Services/ApiServices";
import { useNavigate } from "react-router";

const roles = ["Teacher", "Student", "Institute"]; // Dropdown options

export  function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const { name, email, phoneNumber, role, password } = formData;

    // Validation
    if (!name || !email || !phoneNumber || !role || !password) {
      toast.error("Please fill all required fields!", {
        position: "top-right",
      });
      return;
    }
    try {
            const response = await userRegister(formData);
            if (response.data) {
                toast.success("Registration successful!", {
                    position: "top-right",
                });
                navigate('/login')
            }
        
    } catch (error) {
        console.error('Registration failed:', error);
        toast.error("Registration failed!", { position: "top-right" });
        
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      role: "",
      password: "",
    });
  };

  return (
    <>
      <ToastContainer />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f0f4f8"
      >
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, width: "100%" }}>
          <Typography
            variant="h5"
            component="h2"
            textAlign="center"
            mb={2}
            fontWeight="bold"
          >
            Register User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                  variant="outlined"
                />
              </Grid>

              {/* Phone Number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>

              {/* Role */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  variant="outlined"
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    paddingY: 1.5,
                    backgroundColor: "#1976d2",
                    ":hover": { backgroundColor: "#115293" },
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
}
