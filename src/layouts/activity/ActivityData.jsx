import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MDBox from "components/MDBox";
import { useSelector } from 'react-redux';

export default function Data( ) {
  const [activities, setActivities] = useState([]);
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
    setUser(response.data);
};

 useEffect(() => {
  if (email) fetchUserByEmail(email);

}, [email]);

  
  const fetchUserActivities = async (id) => {
    try {
      const url = `http://localhost:8023/user-activity/getUserActivity/${id}`;
      const response = await axios.get(url);
      console.log("Response from server:", response.data, response);
      setActivities(response.data);
      
      setError(null);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Error is presented when extracting user activities.");
      }
    }
  };

  useEffect(() => { 
   if (user.id) fetchUserActivities(user.id)
    }, [user.id]);



  const columns = [
    { Header: "description", accessor: "description", width: "20%", align: "left" },
    { Header: "timestamp", accessor: "timestamp", align: "left" },
  
  ];

  const rows = activities.map((item) => ({

    description: (
      <MDBox  textAlign="left" >
        {item.description}
      </MDBox>
    ),
    timestamp: (
      <MDBox textAlign="left" className="boxx">
       {item.timestamp}
       </MDBox>
    ),
  
  }));

  return { columns, rows };
}