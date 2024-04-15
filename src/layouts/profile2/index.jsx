import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/profile2/components/Header";
import { useSelector } from 'react-redux'; //redux
import { useEffect, useState } from "react";
import axios from 'axios';
import './profil.css';


function Overview2() {
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
      </Header>

     
      <Footer />
    </DashboardLayout>
  );
}

export default Overview2;
