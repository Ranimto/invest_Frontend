import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";

export default function Data() {
  const [investments, setInvestments] = useState([]);
  const [companyNames, setCompanyNames] = useState({});
  const [investment, setInvestment] = useState({
    companyName:"",
    type:"",
    amount :"",
    startDate :"",
    duration :"",
    status: ""
  });
  const [error, setError] = useState(null);
  const fetchInvestments = async () => {
    try {
      const url = `http://localhost:8023/investment/getInvest/1`;
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
    fetchInvestments()
    }, []);


 

  const columns = [
    { Header: "companyName", accessor: "companyId", width: "20%", align: "left" },
    { Header: "type", accessor: "type", align: "left" },
    { Header: "amount", accessor: "amount", align: "center" },
    { Header: "startDate", accessor: "startDate", align: "center" },
    { Header: "duration", accessor: "duration", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
  ];

  const rows = investments.map((item) => ({

    companyId: (
      <MDBox width="8rem" textAlign="left">
        {item.companyName}
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
  }));

  return { columns, rows };
}