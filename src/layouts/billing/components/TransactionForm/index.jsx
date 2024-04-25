
import MDBox from "components/MDBox";
import './style.css'
import MDButton from "components/MDButton";
import { useState } from "react";
import { Card, TextField } from "@mui/material";
import axios from "axios";

function TransactionForm() {

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState(false);
  const [transactionForm, setTransactionForm] = useState({
    fromAccountNo:0,
    toAccountNo:0,
    amount:0
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransactionForm({ ...transactionForm, [name]: value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8023/transaction/addTransaction";
    console.log(transactionForm);
    const response = await axios.post(url, transactionForm).then(() => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      setTransactionForm({
        fromAccountNo:"",
        toAccountNo:"",
        amount:""
      });
     
    })
    .catch(error => {
      setError(true)
      setTimeout(() => {
        setError(false);
      }, 5000);
      console.error("Error adding transaction:", error);   
    });
};

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}     
    >

<Card  className="formStylee">
  
<form onSubmit={handleSubmit} style={{ display: "flex", gap: "35px" , flexDirection:"column" }}>

     <h5> <strong>Make A Withdrawal Transaction</strong> </h5>
       
        <TextField
          label="From Account Number"
          variant="outlined"
          name="fromAccountNo"
          value={transactionForm.fromAccountNo}
          onChange={handleChange}
          type="number"
          inputMode="numeric"
          required
        />
       
        <TextField
          label="To Account Number"
          variant="outlined"
          name="toAccountNo"
          value={transactionForm.toAccountNo}
          onChange={handleChange}
          type="number"
          inputMode="numeric"
          required
        />
       
        <TextField
          label="Transfer Amount"
          variant="outlined"
          name="amount"
          value={transactionForm.amount}
          onChange={handleChange}
          type="number"
          inputMode="numeric"
          required
        />

        <MDButton type="submit" variant="contained" style={{backgroundColor: "rgba(255, 162, 0, 0.921)" , color:"white"}}>
          Submit
        </MDButton>
       {showSuccessMessage &&  (<p style={{marginTop:"-10%", fontWeight:"100" ,color:"black"}}>Your transaction has been added <strong style={{color:"green"}}>Successfully !</strong></p>)}
       { error && (<p style={{marginTop:"-10%", fontWeight:"100", color:"black"}}> <strong style={{color:"red"}}>Failed</strong> to add Transaction ! please try again</p>)}
      </form>
      </Card>
    </MDBox>
  );
}
export default TransactionForm;
