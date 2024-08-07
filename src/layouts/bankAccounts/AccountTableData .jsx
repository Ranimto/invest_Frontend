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
  const email = useSelector((state) => state.auth.value.email);
  const token=useSelector((state)=> state.auth.value.token)
  const [errorMessage, setMessageError] = useState(null);
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

 
  const fetchUserByEmail= async (email) => {
    const url = `http://localhost:8023/user/findByEmail/${email}`;
    const response = await axios.get(url,{
      headers: {
          'Authorization': `Bearer ${token}` 
      }
  });
    setUser(response.data);
};

  const handleDelete = async (id) => {

    try {
      await axios.delete(`http://localhost:8023/bankAccount/delete/${id}`,
       {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setAccounts(accounts.filter(account => account.id !== id));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
            setMessageError("You do not have permission to delete this account.");
        } else if (error.response.status === 404) {
            setMessageError("The account you are trying to delete does not exist.");
        } else {
            setMessageError("An error occurred while deleting the account.");
        }
    } else {
        setMessageError("A network error occurred. Please try again.");
    }
  } 
  };

   const handleUpdate = async () => {
  
    try {
      await axios.put(`http://localhost:8023/bankAccount/update`, editedAccount,{
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
      const updatedAccounts = accounts.map(account => {
        if (account.id === editedAccount.id) {
          return editedAccount;
        } else {
          return account;
        }
      });
      setAccounts(updatedAccounts);
      setEditedAccount(null);
      const response1 = await axios.post('http://localhost:8023/user-activity/save',
      {
        userId: account.userId,
        timestamp: new Date(),
        description: 'Bank account updated',
      }, 
      {
      headers: {
          'Authorization': `Bearer ${token}` 
      }}
      );

    } catch (error) {
      setMessageError("An error occurred while updating the account.");
    } 
  };

 const handleEdit = (item) => {
    setEditedAccount(item);
  }; 

  const handleSelectChange = (e) => {
    const { name,value } = e.target;
    setEditedAccount({...editedAccount, [name]: value});
  };

  const fetchAccounts = async () => {
    try { 
     const url =` http://localhost:8023/bankAccount/getBankAccountByInvestor/${user.id}`;
      const response = await axios.get(url,{
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
      setAccounts(response.data);
    
    } catch (error) {
      if (error.response) {
        setMessageError(error.response.data.message);
      } else {
        setMessageError("An error occurred during bankAccounts recovery.");
      }
    
    }
  };

  useEffect(() => {
    if (email) fetchUserByEmail(email);
  }, [email]);

  useEffect(() => {
    if (user.id) fetchAccounts();
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
