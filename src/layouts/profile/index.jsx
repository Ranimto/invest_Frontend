import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import { useSelector } from 'react-redux'; //redux
import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
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
  nationality: "",
  postCode: 0,
  profession: ""
})



    const fetchUserByEmail= async (email) => {
        const url = `http://localhost:8023/user/findByEmail/${email}`;
        const response = await axios.get(url);
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
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <h6 className="title">
        Personal Informations 
        </h6>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.4}>
        <h6  className="subtitle" style={{padding:"2%"}}>
       INVESTOR DETAILS 
        </h6>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={1} className="profileTextt">     
            <h6 className="settings" >  Firstname :  </h6>
            <h4 className="tdClass">{user.firstname}</h4>               
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={1} className="profileTextt">     
            <h6 className="settings" >  Lastname :  </h6>
            <h4 className="tdClass">{user.lastname}</h4>               
        </MDBox>

        <MDBox display="flex" alignItems="center" mb={0.5} ml={1} className="profileTextt">     
            <h6 className="settings" >  City :  </h6>
            <h4 className="tdClass" style={{paddingLeft:"7%"}}>{user.city}</h4>               
        </MDBox>

        <MDBox display="flex" alignItems="center" mb={0.5} ml={1} className="profileTextt">     
            <h6 className="settings" >  Number :  </h6>
            <h4 className="tdClass" style={{paddingLeft:"7%"}}>{user.phone}</h4>               
        </MDBox>

        <MDBox display="flex" alignItems="center" mb={0.5} ml={1} className="profileTextt">     
            <h6 className="settings" >  Email:  </h6>
            <h4 className="tdClass" style={{paddingLeft:"5%"}}>{user.email}</h4>               
        </MDBox>
       
        <MDBox display="flex" alignItems="center" mb={0.5} ml={1} className="profileTextt">     
            <h6 className="settings" >  Nationnality:  </h6>
            <h4 className="tdClass">{user.nationality}</h4>               
        </MDBox>

        <MDBox display="flex" alignItems="center" mb={0.5} ml={1} className="profileTextt">     
            <h6 className="settings" >  Profession :  </h6>
            <h4 className="tdClass">{user.profession}</h4>               
        </MDBox>
    
        <MDBox mt={3}>
          <h6  className="subtitle" style={{paddingBottom:"3%"}}>
          Investment Advice?
          </h6>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5} style={{paddingLeft:"5%"}}>  
          <MDBox width="80%" ml={1} >
            <h6 className="settings" >
             Advisory services for traditional investments (e.g., ETFs) and digital assets are provided by Betterment LLC, an SEC-registered investment adviser.
             InvestAI also offers the InvetsAI Cash Reserve product. 
             
            </h6>
          </MDBox>
        </MDBox>
      
       
      </MDBox>
    </Card> 
</Grid>   

<Divider orientation="vertical" sx={{ ml: 4, mr: 2 }} />
              
              <Grid container >
              <Card sx={{ boxShadow: "none" }}>
                <MDBox p={2}>
                  <h6 className="title">
                  Personal Informations 
                  </h6>
                </MDBox>
                <MDBox pt={1} pb={2} px={2} lineHeight={1.7}>
                  <h6  className="subtitle" style={{padding:"2%"}}>
                  Terms and Conditions
                  </h6>
                  <MDBox display="flex" alignItems="center" mb={0.5} ml={1} className="profileTextt">     
                  
                      <h4 className="terms" > This application is provided by InvestAI LLC. To the extent that there is marketing related to InvestAI Checking,
                       it is provided by InvestAI Financial LLC. © InvestAI. All rights reserved.</h4>               
                  </MDBox>

                  <MDBox display="flex" alignItems="center" mb={0.5} ml={0.5} className="profileTextt">     
                      <h6 className="settings" style={{fontSize:'14px'}}>ChangeEmail:  </h6>
                      <Grid item xs={12}  style={{fontSize:'13px'}}>
                     {user.email}
                     </Grid>  
                  </MDBox>          
                  <MDBox mt={3}>
          <h6  className="subtitle" style={{paddingBottom:"3%"}}>
          Who Provides What Service?
          </h6>
        </MDBox>
       
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5} style={{paddingLeft:"5%"}}>  
          <MDBox width="80%" ml={1} >
            <h6 className="settings" >
            Before investing, consider your investment objectives and the fees and expenses associated with the InvestAI platform. InvestAI&apos;s online advisory 
            services are designed to assist clients in achieving specific financial goals. 
            </h6>
          </MDBox>
        </MDBox>
                 
                </MDBox>
              </Card> 
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
