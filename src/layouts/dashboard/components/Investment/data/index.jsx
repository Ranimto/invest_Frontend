import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Data() {
  const [investments, setInvestments] = useState([]);
  const [investment, setInvestment] = useState({
    companyName:"",
    type:"",
    amount :"",
    startDate :"",
    duration :"",
    status: ""
  });
  const [error, setError] = useState(null);
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
  const email = useSelector((state) => state.auth.value.email);

  const fetchUserByEmail= async (email) => {
    const url = `http://localhost:8023/user/findByEmail/${email}`;
    const response = await axios.get(url);
    console.log("Response from server:", response.data, response);
    setUser(response.data);
    console.log('hello');
};

 useEffect(() => {
  fetchUserByEmail(email);

}, [email]);

  
  const fetchInvestments = async (id) => {
    try {
      const url = `http://localhost:8023/investment/getInvest/${id}`;
      console.log('heyy' ,user.id)
      const response = await axios.get(url);
      console.log("Response from server:", response.data, response);
      setInvestments(response.data);
      
      setError(null);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Error is presented when extracting investments.");
      }
    }
  };

  useEffect(() => { 
    fetchInvestments(user.id)
    }, [user.id]);


 

  const columns = [
    { Header: "companyName", accessor: "companyName", width: "20%", align: "left" },
    { Header: "type", accessor: "type", align: "left" },
    { Header: "amount", accessor: "amount", align: "center" },
    { Header: "startDate", accessor: "startDate", align: "center" },
    { Header: "duration", accessor: "duration", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "CompanyNews", accessor: "CompanyNews", align: "center" },
  ];

  const rows = investments.map((item) => ({

    companyName: (
      <MDBox width="8rem" textAlign="left">
      <Link to={`/stock/${item.companyName}`} className="CompanyName">{item.companyName}</Link>
      </MDBox>
    ),
    type: (
      <MDBox width="8rem" textAlign="left">
       {item.type}
       </MDBox>
    ),

    amount: (
      <MDBox width="8rem" textAlign="center">
       {item.amount} TND
       </MDBox>
    ),
    startDate: (
      <MDBox width="10rem" textAlign="center">
        {item.startDate}
        </MDBox>
    ),
    duration: (
      <MDBox width="8rem" textAlign="center">
       {item.duration}
      </MDBox>
    ),

    status: (
      <MDBox ml={-1}>
        <MDBadge badgeContent={item.status} color="success" variant="gradient" size="sm" />
      </MDBox>
    ),

    CompanyNews: (
      <MDBox width="10rem" textAlign="center" >
       <Link to={`/news/${item.companyName}`} className="newsLink"> Check company News</Link>
      </MDBox>
    ),
  }));

  return { columns, rows };
}