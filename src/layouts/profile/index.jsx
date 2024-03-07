import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import { useSelector } from 'react-redux'; //redux
import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Card, CardContent, Typography } from "@mui/material";
import './profil.css';


function Overview() {
  const email = useSelector((state) => state.auth.value.email);
  const [user,setUser]=useState({ 
  id:"",  
  firstname:"",
  lastname:"",
  email :"",
  phone :"",
  city:"",
  nationality:"",
  postcode:"",
  profession:"",
})

    const fetchUserByEmail= async (email) => {
        const url = `http://localhost:8023/user/findByEmail/${email}`;
        const response = await axios.get(url);
        console.log("Response from server:", response.data, response);
        setUser(response.data);
    };

     useEffect(() => {
      fetchUserByEmail(email);
    }, [email]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: 4, mr: 2 }} />
              
    <Grid container >
    <table>
      <tbody>
        <tr>

         <div className="attr1">
          <td><em>FirstName</em></td>
          <td className="value">{user.firstname}</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          </div>
          <td>&nbsp;</td>
          <div className="attr1">
          <td><em>LastName</em></td>
          <td >{user.lastname}</td>
          </div>

        </tr>
        <tr>
         <div className="attr1">
          <td><em>Profession</em></td>
          <td>{user.profession}</td>
          </div>
          <td>&nbsp;</td>
          <div className="attr1">
          <td><em>Number</em></td>
          <td >{user.phone}</td>
          </div>
        </tr>
        <tr >
        <div className="attr1">
          <td><em>City</em></td>
          <td>{user.city}</td>
        </div>
          <td>&nbsp;</td>
          <div className="attr1">
          <td><em>Nationality</em></td>
          <td>{user.nationality}</td>
          </div>
        </tr>
        <tr>
        <div className="attr1">
          <td><em>Postcode</em></td>
          <td >{user.postcode}</td>
          </div>
          <td>&nbsp;</td>
          <div className="attr1">
          <td><em>Email</em></td>
          <td >{user.email}</td>
          </div>
        </tr>
        <tr>
       <Button variant="contained" className="closeAccount">Close Account </Button>
       </tr>
      </tbody>
    </table>  
</Grid>
  
  
       
  </Grid>
            
          
  </Grid>
  </MDBox>
        
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
