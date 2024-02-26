import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";

export default function Data() {
  const [investments, setInvestments] = useState([]);
  const [investment, setInvestment] = useState({
    companyId:"",
    type:"",
    amount :"",
    startDate :"",
    duration :"",
    status: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
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
          setError("Une erreur s'est produite lors de la récupération des investissements.");
        }
      }
    };
    fetchInvestments();
  }, []);

 

  const columns = [
    { Header: "companyId", accessor: "companyId", width: "45%", align: "left" },
    { Header: "type", accessor: "type", align: "left" },
    { Header: "amount", accessor: "amount", align: "center" },
    { Header: "startDate", accessor: "startDate", align: "center" },
    { Header: "duration", accessor: "duration", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
  ];

  const rows = investments.map((item) => ({

    companyId: (
      <h3>
        {item.companyId}
      </h3>
    ),
    type: (
      <h3>
       {item.type}
      </h3>
    ),

    amount: (
      <h3>
       {item.amount} TND
      </h3>
    ),
    startDate: (
      <h3>
        {item.startDate}
      </h3>
    ),
    duration: (
      <h3>
       {item.duration}
      </h3>
    ),

    status: (
      <MDBox ml={-1}>
        <MDBadge badgeContent={item.status} color="success" variant="gradient" size="sm" />
      </MDBox>
    ),
  }));

  return { columns, rows };
}