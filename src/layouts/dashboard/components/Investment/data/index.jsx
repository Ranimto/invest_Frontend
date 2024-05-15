import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { onFirebaseMessageListener } from 'firebaseinit';
import { Button, Grid, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Investment from '..';
import MDButton from 'components/MDButton';


export default function Data() {
  const [investments, setInvestments] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notificationShown, setNotificationShown] = useState(true); 
  const [editedInvestment, setEditedInvestment] = useState({
    userId:1,
    companyId:1,
    companyName:"",
    duration :"",
  })
  const notification = {
    title: 'New notification',
    body: 'A positive change for the company ',
  };
  const [investment, setInvestment] = useState({
    userId:1,
    companyId:1,
    companyName:"",
    type:"",
    investmentAmount :0,
    currentInvestmentAmount :0,
    startDate :"",
    duration :"",
    numberOfStock:"",
    status: ""
  });
  const [error, setError] = useState(null);
  const [user,setUser]=useState({ 
    id:1,  
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
 if (email) {fetchUserByEmail(email)};
}, [email]);

  
  const fetchInvestments = async (id) => {
    try {
      const url = `http://localhost:8023/investment/getInvest/${id}`;
      console.log('heyy' ,user.id)
      const response = await axios.get(url);
      console.log("Response from server:", response.data, response);
      setInvestments(response.data);
      setLoading(false);
 
    setError(null);
    } catch (error) {
        setError(error.response.data.message); 
        setLoading(false); 
    }
  };

  const handleEdit = (item) => {
    setEditedInvestment(item);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInvestment({...editedInvestment, [name]: value});
  }; 

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8023/investment/update`, editedInvestment);
        const updatedInvestments = investments.map(inv => {
          return inv.companyName === editedInvestment.companyName ?  editedInvestment :  inv;});
        setInvestments(updatedInvestments);
        setEditedInvestment(null);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => { 
   if (user.id){ fetchInvestments(user.id)}
    }, [user.id]);

useEffect(() => {
    const updatedInvestmentStatus = investments.map((item) => {
        if (item.duration === 0) {
          return { ...item, status: "FINISHED" };
        }
        return item;
      });
      setInvestments(updatedInvestmentStatus)
    }, [investments]);

    
    
//     onFirebaseMessageListener()
//     .then((payload) => {

//      setShow(true);
//       setNotification({
//         title: payload.notification.title,
//         body: payload.notification.body,
//       });
//       console.log(payload);
//     })
// .catch((err) => console.log("failed: ", err));


const handleShowInvestmentNotification =(investment)=>{
  if (investment.currentInvestmentAmount-investement.investmentAmount<=0)
  setShow(true)
}

 

  const columns = [
    { Header: "company_Name", accessor: "companyName", width: "20%", align: "left" },
    { Header: "type", accessor: "type", align: "left" },
    { Header: "initial_Amount", accessor: "investmentAmount", align: "center" },
    { Header: "current_Amount", accessor: "currentInvestmentAmount", align: "center" },
    { Header: "start_Date", accessor: "startDate", align: "center" },
    { Header: "number_Of_Stocks", accessor: "numberOfStock", align: "center" },
    { Header: "duration (in_Months)", accessor: "duration", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "Performance", accessor: "Performance", align: "center" },
    { Header: "Company_News", accessor: "CompanyNews", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  const rows = investments.map((item) => ({

    companyName: (
      <MDBox width="6rem" textAlign="left">
      <Link to={`/stock/${item.companyName}`} className="CompanyName">{item.companyName}</Link>
      </MDBox>
    ),
    type: (
      <MDBox width="8rem" textAlign="left" style={{color:"rgb(25, 2, 140)" }}>
       {item.type}
       </MDBox>
    ),

    investmentAmount: (
      <MDBox width="8rem" textAlign="center">
       $ {item.investmentAmount}  
       </MDBox>
    ),
    currentInvestmentAmount: (
      <MDBox width="8rem" textAlign="center" style={{color:"rgb(25, 2, 140)"}}>
      $ {item.currentInvestmentAmount}
       </MDBox>
    ),
    startDate: (
      <MDBox width="10rem" textAlign="center">
        {item.startDate}
        </MDBox>
    ),
    numberOfStock: (
      <MDBox width="10rem" textAlign="center" style={{color:"rgb(25, 2, 140)"}}>
        {item.numberOfStock}
        </MDBox>
    ),
    duration: (
      <MDBox width="8rem" textAlign="center">
         {editedInvestment && editedInvestment.companyName==item.companyName ?
          <TextField label="Duration" name="duration" value={editedInvestment.duration} onChange={handleInputChange} fullWidth>
           
         </TextField> : 
         <h3>{item.duration}</h3>
         }
     
      </MDBox>
    ),

    status: (
      <MDBox ml={-1}>
        { !(item.duration===0) ?
        <MDBadge badgeContent={item.status} color="success" variant="gradient" size="sm" />:
        <MDBadge badgeContent={item.status} color="error" variant="gradient" size="sm"  widh/>
      }
      </MDBox>
    ),

    Performance: (
      <Link to={`/performance/${item.userId}/${item.companyId}/${item.companyName}/${item.currentInvestmentAmount}/${item.investmentAmount}`}>
      Go to Performance
    </Link>
    ),
    CompanyNews: (
      <MDBox width="10rem" textAlign="center" >
       <Link to={`/news/${item.companyName}`} className="newsLink"> Check the company News</Link>
      </MDBox>
    ),

    actions: (
      <Grid className="gridButton" variant="contained">
        <MDButton variant="contained" className='actionButtonn'  title='edit' onClick={() => handleEdit(item)} bgColor="info"><EditIcon  style={{color:'black'}} /></MDButton>
        <MDButton variant="contained" className='actionButtonn' title='update'  onClick={handleUpdate}><UpdateIcon  style={{color:'black'}}/></MDButton>
      </Grid>
    )
  }));
  

  return { columns, rows };
}