import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../../Services/ApiServices';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Container,
} from '@mui/material';

export function UserProfile() {
  const [userProfile, setUserProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user")) || "";

  const fetchUserProfile = async () => {
    try {
      const response = await getUserById(userData.id);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Fetch user profile failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateUser(userData.id, userProfile);
      setEditMode(false);
      fetchUserProfile();
    } catch (error) {
      console.error("Update user profile failed:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        align="start"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        My Profile
      </Typography>
      <Card elevation={3} sx={{ p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={userProfile.name || ""}
                onChange={handleChange}
                disabled={!editMode}
                variant="outlined"
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={userProfile.email || ""}
                onChange={handleChange}
                disabled={!editMode}
                variant="outlined"
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={userProfile.phoneNumber || ""}
                onChange={handleChange}
                disabled={!editMode}
                variant="outlined"
              />
            </Grid>

            {/* Role */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={userProfile.role || ""}
                disabled
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-start", mt: 2 }}>
          {editMode ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mx: 1 }}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setEditMode(true)}
              sx={{ mx: 1 }}
            >
              Edit
            </Button>
          )}
        </CardActions>
      </Card>
    </Container>
  );
}