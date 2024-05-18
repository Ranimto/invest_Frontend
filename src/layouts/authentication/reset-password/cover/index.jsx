import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import './style.css'


function Cover() {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("email" ,email)
      const response = await axios.post('http://localhost:8023/auth/password/reset',{email});
      setMessage(response.data);
    } catch (error) {
      setMessage('Error sending reset link');
    }
  };


  return (
    <CoverLayout coverHeight="50vh" >
      <Card  className="PasswordResetForm">

        <MDBox pt={4} pb={3} px={3}  >
          <MDBox component="form" role="form" >

          <h3 style={{ paddingBottom:"5%", fontWeight:"600", fontSize:"17px"}}>
            Reset Password
          </h3>
          <h6 style={{color:"grey" , fontWeight:"100" , paddingBottom:"6%"}}>
            You will receive an e-mail in maximum 60 seconds
          </h6>
            <MDBox mb={4}>
              <TextField
               type="email" 
               label="Email" 
               variant="standard"
               onChange={(e) => setEmail(e.target.value)}
               fullWidth />  
             </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth  onClick={handleSubmit}>reset</MDButton>
            </MDBox>
            {message && (
            <MDBox mt={3} textAlign="center">
              <p>{message}</p>
            </MDBox>
          )}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
