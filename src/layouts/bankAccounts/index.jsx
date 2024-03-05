import React, { useEffect, useState } from 'react'
import AccountTableData from "layouts/bankAccounts/AccountTableData ";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Button, Card, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import'./accountStyle.css';
import axios from 'axios';

const BankAccounts = () => {
  const [showForm,setShowForm]=useState(false);
  const { columns, rows } = AccountTableData();
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({
    id:"",
    accountNo:"",
    bankName:"",
    balance:"",
    active:"",
    currency:"",   
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
        const url = "http://localhost:8023/BankAccount/add";
        const response = await axios.post(url, account);
        console.log('bank account added:', response.data);
        setAccount({
          accountNo: "",
          bankName: "",
          balance: "",
          currency: "",
          active: false
        });
        setShowForm(false);
        setAccounts([...accounts, response.data]);
    } catch (error) {
        console.log(error);
    }
};

  const handleAddAccountClick=()=>{
    setShowForm(true);
  }
  const handleCancelClick = () => {
    setShowForm(false); 
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setAccount({
      ...account,
      active: value === "true" ? true : false
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
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
            <Grid item xs={6}>
              <TextField  name="accountNo" label="accountNo" variant="outlined" fullWidth value={account.accountNo} onChange={handleInputChange}  />
            </Grid>
            <Grid item xs={6}>
              <TextField name="bankName" label="bankName" variant="outlined" fullWidth value={account.bankName} onChange={handleInputChange} />
            </Grid> 
            <Grid item xs={6}>
              <TextField name="balance" label="balance" variant="outlined" fullWidth value={account.balance} onChange={handleInputChange}  />
            </Grid>    
            <Grid item xs={6}>
              <TextField name="currency" label="currency" variant="outlined" fullWidth  value={account.currency} onChange={handleInputChange} />
            </Grid> 
            <Grid item xs={12}>
        <InputLabel id="active-label" style={{ padding: '5px' ,color:'rgba(45, 43, 43, 0.911)',fontWeight:'500'}}>This new Bank Account is currently active ? </InputLabel>
      <Select labelId="active-label" variant="outlined" fullWidth style={{ padding: '6px' }} value={account.active ? "true" : "false"} onChange={handleSelectChange}>
        <MenuItem value={true}>true</MenuItem>
        <MenuItem value={false}>false</MenuItem>
      </Select>
    </Grid>
         

            <Grid item className='gridbtn' xs={12}>
              <Button variant="contained" onClick={handleCancelClick} className='cancel'>Cancel</Button>
              <Button variant="contained" type="submit" className='add'>Add </Button>
            </Grid>
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
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
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
      </MDBox>
    </DashboardLayout>
  )
}

export default BankAccounts