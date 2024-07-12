import React, { useEffect, useState } from 'react'
import AccountTableData from "layouts/bankAccounts/AccountTableData ";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Button, Card, Grid, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import'./accountStyle.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';


const BankAccounts = () => {
  const [showForm,setShowForm]=useState(false);
  const { columns, rows } = AccountTableData();
  const [accounts, setAccounts] = useState([]);
  const [errorForm,setErrorForm]=useState(false);
  const [loading,setLoading]=useState(true);
  const [messageError,setMessageError]=useState("");
  const [successMessage,setSuccessMessage]=useState("");
  const email= useSelector((state)=>state.auth.value.email);
  const token = useSelector((state)=>state.auth.value.token)
  const [requestAccount, setRequestAccount] = useState({});
  const [account, setAccount] = useState({    
     accountNo:"",
     savingsProductName:"",
     summary:{
      totalDeposits:"",
      totalInterestEarned:"",
      totalInterestPosted:"",
      accountBalance:"",   
      availableBalance:"",
    },
    active:false,
    userId:"",
  });
  const [user,setUser]=useState({ });

  const fetchUserByEmail= async (email) => {
    const url = `http://localhost:8023/user/findByEmail/${email}`;
    const response = await axios.get(url, {
      headers: {
          'Authorization': `Bearer ${token}` 
      }
  });
    setUser(response.data);
};

 useEffect(() => {
  fetchUserByEmail(email);
}, [email]);  



const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const url = "http://localhost:8023/requestAccount/approveRequestAccount";
    setLoading(true)
    setAccount({...account, userId: requestAccount.userId});
    const response = await axios.post(url, requestAccount, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setAccounts([...accounts, response.data]);
    setSuccessMessage("Your bank account is added successfully!");
    

    try {
      await axios.post('http://localhost:8023/user-activity/save', {
        userId: user.id,
        timestamp: new Date(),
        description: `Adding a new bank account with account number: ${response.data.accountNo}`,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
    } catch (activityError) {
      setMessageError("An error occurred while saving user activity.");
    }
    setRequestAccount({
      accountNo: "",
      userId: user.id,
      status: "",
    });

  } catch (error) {
    setLoading(false)
    setErrorForm(true);
    setTimeout(() => {
      setErrorForm(false);
    }, 5000);

    if (error.response && error.response.data && error.response.data.message) {
      setMessageError(error.response.data.message);
    } else {
      setMessageError("An unexpected error occurred.");
    }
  }
};

  useEffect(()=>{
    setRequestAccount({...requestAccount,userId:user.id});
  },[user.id])

  const handleAddAccountClick=()=>{
    setShowForm(true);
  }
  const handleCancelClick = () => {
    setShowForm(false); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestAccount({
      ...requestAccount,
      [name]: value
    });
  };


  return (
    <DashboardLayout>
       <DashboardNavbar/>

       {!showForm ? ( 
        <Button variant="contained" className='roundedAdd' onClick={handleAddAccountClick}><AddRoundedIcon/>Add new Account</Button>
      ) : (
        <form onSubmit={handleSubmit} >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField 
              name="accountNo" 
              label="accountNo" 
              type="number"
              variant="outlined"
               fullWidth 
               value={requestAccount.accountNo} 
               onChange={handleInputChange}  />
            </Grid>
            <Grid item className='gridbtn' xs={12}>
              <Button variant="contained" onClick={handleCancelClick} className='cancel'>Cancel</Button>
              <Button variant="contained" type="submit" className='add'>Add </Button>
            </Grid>
            {successMessage && <div className='successMessage'> {successMessage}</div>}
          </Grid>
        </form>
      )}
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={2}
                px={2}
                variant="gradient"
                bgColor="secondary"
                borderRadius="lg"
                coloredShadow="info"
              >
                <h5 style={{color :'white'}} >
                 Accounts Table
                </h5>
                
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>


  {errorForm && (
  <Modal open={errorForm} >
    <Grid className='errorForm'>
    <p> <ErrorRoundedIcon/> {messageError}</p>
    <button onClick={()=>setErrorForm(false)}>Cancel</button>
    </Grid>
  </Modal>
)}
      </MDBox>
    </DashboardLayout>
  )
}

export default BankAccounts