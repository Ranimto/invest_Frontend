import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import './style.css'

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8023/auth/password/reset/confirm', {
        token,
        password
      });
      setMessage(response.data);
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  return (
    <CoverLayout coverHeight="50vh" >
      <Card className='PasswordResetForm'>
         
        
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
          <h3 style={{ paddingBottom:"5%", fontWeight:"600" , fontSize:"17px"}}> Reset Password </h3>
            <MDBox mb={4}>
              <MDInput
                type="password"
                label="New Password"
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mb={4}>
              <MDInput
                type="password"
                label="Confirm New Password"
                variant="standard"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Reset Password
              </MDButton>
            </MDBox>
          </MDBox>
          {message && (
            <MDBox mt={3} textAlign="center">
              <p>{message}</p>
            </MDBox>
          )}
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default ResetPassword;
