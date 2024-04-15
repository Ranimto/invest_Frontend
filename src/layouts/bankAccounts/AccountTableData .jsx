import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './accountStyle.css';
import { useSelector } from 'react-redux';

export default function Data() {
  const [accounts, setAccounts] = useState([]);
  const [editedAccount, setEditedAccount] = useState({  
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
});

  const [loading, setLoading] = useState(null);
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
};


 useEffect(() => {
  fetchUserByEmail(email);
}, [email]);


  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8023/bankAccount/delete/${id}`);
      setAccounts(accounts.filter(account => account.id !== id));
    } catch (error) {
      setError("An error occurred while deleting the account.");
    } finally {
      setLoading(false);
    }
  };

   const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8023/bankAccount/update`, editedAccount);
      const updatedAccounts = accounts.map(account => {
        if (account.id === editedAccount.id) {
          return editedAccount;
        } else {
          return account;
        }
      });
      setAccounts(updatedAccounts);
      console.log("Account updated");
      setEditedAccount(null);
     
      const response1 = await axios.post('http://localhost:8023/user-activity/save',
      {
        userId: account.userId,
        timestamp: new Date(),
        description: 'Bank account updated',
    }
      );

    } catch (error) {
      setError("An error occurred while updating the account.");
    } finally {
      setLoading(false);
    }
  };

 const handleEdit = (item) => {
    setEditedAccount(item);
  }; 


  const handleSelectChange = (e) => {
    const { name,value } = e.target;
    setEditedAccount({...editedAccount, [name]: value});
  };

  useEffect(() => {
    const fetchAccounts = async (id) => {
      try {
        setLoading(true);
       // const url =` http://localhost:8023/bankAccount/getBankAccountByInvestor/${id}`;
       const url =`http://localhost:8023/bankAccount/getAll`;
        const response = await axios.get(url);
        setAccounts(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred during bankAccounts recovery.");
        }
        setLoading(false);
      }
    };
    fetchAccounts(user.id);
  }, [user.id]);

  const columns = [
    { Header: "accountNo", accessor: "accountNo", width: "20%", align: "left" },
    { Header: "savingsProductName", accessor: "savingsProductName", align: "center" },
    { Header: "totalDeposits", accessor: "totalDeposits", align: "center" },
    { Header: "accountBalance", accessor: "accountBalance", align: "center" },
    { Header: "totalInterestPosted", accessor: "totalInterestPosted", align: "center" },
    { Header: "availableBalance", accessor: "availableBalance", align: "center" },
    { Header: "totalInterestEarned", accessor: "totalInterestEarned", align: "center" },
    { Header: "active", accessor: "active", align: "center" },

    { Header: "actions", accessor: "actions", align: "center" },
  ];

  const rows = accounts.map((item) => ({
    accountNo: (

       <h3 className="accountNo">{item.accountNo}</h3>
    ),
    savingsProductName: (
     <h3>{item.savingsProductName}</h3>
    ),
    totalDeposits: (
    <h3>{item.summary.totalDeposits}</h3>
    ),
    accountBalance: (
    <h3>{item.summary.accountBalance}</h3>
    ),
    totalInterestPosted: (
     <h3>{item.summary.totalInterestPosted}</h3>
    ),
    availableBalance: (
      <h3>{item.summary.availableBalance}</h3>
     ),
     totalInterestEarned: (
      <h3>{item.summary.totalInterestEarned}</h3>
     ),

   
     active: (
      editedAccount && editedAccount.accountNo === item.accountNo ?
      <Select variant="outlined" name="active" value={editedAccount.active} onChange={handleSelectChange}>
        <MenuItem value="true">true</MenuItem>
        <MenuItem value="false">false</MenuItem>
      </Select>
      : <h3>{item.active.toString()}</h3>
    ),

    actions: (
      <Grid className="gridButton" variant="contained">
        <Button variant="contained" className='actionButtonn'  title='edit' onClick={() => handleEdit(item)}><EditIcon/></Button>
        <Button variant="contained" className='actionButtonn' title='update' style={{backgroundColor:'rgba(239, 147, 10, 0.897)'}}  onClick={handleUpdate}><UpdateIcon/></Button>
        <Button variant="contained" className='actionButtonn' title='delete'  style={{backgroundColor:'rgb(225, 29, 29)'}}onClick={() => handleDelete(item.id)}><DeleteIcon/></Button>
      </Grid>
    )
  }));

  return { columns, rows };
}
