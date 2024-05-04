import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import axios from "axios";
import MDBox from "components/MDBox";
import Transaction from "layouts/billing/components/Transaction";
import PropTypes from "prop-types";

function Transactions({ fromAccountNo }) {
  const [transactions, setTransactions] = useState([]);
  const [dateFormatee, setDateFormatee] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = `http://localhost:8023/transaction/findTransactionsByAccountNo/${fromAccountNo}`;
        const response = await axios.get(url);
        setTransactions(response.data); // Utilisation de response.data
      } catch (error) {
        console.error("Error fetching transactions by Account number:", error);
      }
    };

    fetchTransactions();
  }, [fromAccountNo]);

  useEffect(() => {
    const dateActuelle = new Date();
    const formattedDate = dateActuelle.toLocaleDateString();
    setDateFormatee(formattedDate);
  }, []);

  console.log("transactions", transactions);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <h6 className="title">
          Your Transaction&apos;s
        </h6>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <p>
          {dateFormatee}
          </p>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
       
        <MDBox mt={1} mb={2}>
          <h6 className="upercase">
       <div  style={{ fontSize: "13px" ,alignContent:"center" , color:"rgb(5, 8, 59)" ,width:"100%"}}> CHECK YOUR TRANSACTIONS </div>
          </h6>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none", overflowY: "auto", maxHeight: "26.3rem" }}
        >
        {transactions.map((item, index) => (
    <Transaction 
    key={index}
    color="success"
    icon="expand_less"
    toAccountNo={item.toAccountNo}
    transferDescription={item.transferDescription}
    transferAmount={item.transferAmount}
    transferDate={item.transferDate}
  />
))}
         
        </MDBox>
      </MDBox>
    </Card>
  );
}

Transactions.propTypes = {
  fromAccountNo: PropTypes.string
};

export default Transactions;
