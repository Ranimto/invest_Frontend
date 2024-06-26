import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import './style.css'
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import Bill from "./components/Bill";
import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TransactionForm from "./components/TransactionForm";
import SellTransaction from "./components/SellTransaction";
import BuyTransaction from "./components/BuyTransaction";


function Billing() {

  const email = useSelector((state) => state.auth.value.email);
  const token = useSelector((state)=>state.auth.value.token)
  const [activeAccount,setActiveAccount]= useState({
    accountNo:"",
    savingsProductName:"",
    summary:{
      totalDeposits:0,
      totalInterestEarned:0,
      totalInterestPosted:0,
      accountBalance:0,   
      availableBalance:0,
    },
    active:"",
    userId: 0,
  });
  const [user,setUser]=useState({});
  const [showSellTransaction,setShowSellTransaction]=useState(false);
  const [showBuyTransaction,setShowBuyTransaction]=useState(true);
  const [filtredValue,setFiltredValue]=useState('BUY transactions');

  const fetchUserByEmail = async (email) => {
    try {
      const url = `http://localhost:8023/user/findByEmail/${email}`;
      const response = await axios.get(url,{
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  };

  const fetchUserAccountActive = async () => {
    try {
      const url = `http://localhost:8023/bankAccount/getUserActiveAccount/${user.id}`;
      const response = await axios.get(url,{
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
      setActiveAccount(response.data);
      console.log("Active account:", response.data);
    } catch (error) {
      console.error("Error fetching active account:", error);
    }
  };

  useEffect(() => {
    if (email) fetchUserByEmail(email);
  }, [email]);

  useEffect(() => {
    if (user.id) {
      fetchUserAccountActive();
    }
  }, [user.id]);

  
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={1}>
        <MDBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} xl={6}>
                <MasterCard number=  {4562112+(activeAccount.accountNo)} holder= {user.firstname + ' '+user.lastname} expires="11/27" />    
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Account Balance"
                    description=" total account balance"
                    value= {activeAccount.summary.accountBalance || 0}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Available Balance"
                    description="available balance"
                    value={activeAccount.summary.availableBalance || 0}
                  />
                </Grid>
               
                <Grid item xs={12}  >
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TransactionForm />
            </Grid>
          </Grid>
        </MDBox>

       {/* Billing info */}
        <MDBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
            <Card id="delete-account">
          <MDBox pt={1} px={1}>

              <h6 className="title">
              Billing Information
             </h6>
        
          </MDBox>
      <MDBox  pb={1} px={2}  style={{height:"32rem"}}>
        <MDBox component="ul" display="flex" flexDirection="column" p={1} m={4}  style={{marginTop:"-5px"}}>
          <Bill
            name={user.firstname + ' ' + user.lastname}
            profession={user.profession}
            email={user.email}
            savings={activeAccount.savingsProductName}
            number={activeAccount.accountNo}
            deposits={activeAccount.summary.totalDeposits || 0}
            earned={activeAccount.summary.totalInterestEarned || 0}
            posted={activeAccount.summary.totalInterestPosted || 0}
            status="Active"

          />
        </MDBox>
      </MDBox>
     </Card>
            </Grid>
            <Grid item xs={12} md={5}  style={{height:"33rem"}}>
                <Grid style={{backgroundColor:"white", marginBottom:"1%"}} >
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
               <Select labelId="demo-simple-select-label"id="demo-simple-select" value={filtredValue} label="Filter" onChange={()=>setFiltredValue(event.target.value)} fullWidth>
               <MenuItem value="BUY transactions" onClick={()=>{setShowBuyTransaction(true) , setShowSellTransaction(false)}}>BUY transactions</MenuItem>
               <MenuItem value="Sell transactions" onClick={()=>{setShowSellTransaction(true), setShowBuyTransaction(false)}}>Sell transactions</MenuItem>
               </Select>
               </FormControl>
                </Grid>
                
             {showBuyTransaction && 
              <BuyTransaction  fromAccountNo={activeAccount.accountNo}   />
            }
          {showSellTransaction &&        
              <SellTransaction  toAccountNo={activeAccount.accountNo}  />
             }
             </Grid> 
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
