import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import { useSelector } from 'react-redux';

export default function Data() {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({
    bankAccountId:"",
    type:"",
    amount :"",
    status  :"",
    currency :"",
    rib: ""
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

  
  const fetchTransactions = async (id) => {
    try {
      const url = `http://localhost:8023/transaction/getAll`;
      const response = await axios.get(url);
      console.log("Response from server:", response.data, response);
      setTransactions(response.data);
      
      setError(null);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Error is presented when extracting transactions.");
      }
    }
  };

  useEffect(() => { 
    fetchTransactions(user.id)
    }, [user.id]);



  const columns = [
    { Header: "AccountId", accessor: "AccountId", width: "20%", align: "left" },
    { Header: "type", accessor: "type", align: "left" },
    { Header: "amount", accessor: "amount", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "currency", accessor: "currency", align: "center" },
    { Header: "RIB", accessor: "RIB", align: "center" },
  ];

  const rows = transactions.map((item) => ({

    AccountId: (
      <MDBox width="8rem" textAlign="left">
        {item.bankAccountId}
      </MDBox>
    ),
    type: (
      <MDBox width="8rem" textAlign="left">
       {item.type}
       </MDBox>
    ),

    amount: (
      <MDBox width="8rem" textAlign="center">
       {item.amount}
       </MDBox>
    ),
    currency: (
      <MDBox width="10rem" textAlign="center">
        {item.currency}
        </MDBox>
    ),
    RIB: (
      <MDBox width="8rem" textAlign="center">
       {item.rib}
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