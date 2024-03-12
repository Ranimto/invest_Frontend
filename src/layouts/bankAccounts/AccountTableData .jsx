import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './accountStyle.css';
import { useSelector } from 'react-redux';

export default function Data() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editedAccount, setEditedAccount] = useState(null);
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
      await axios.delete(`http://localhost:8023/BankAccount/delete/${id}`);
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
      await axios.put(`http://localhost:8023/BankAccount/update`, editedAccount);
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
    } catch (error) {
      setError("An error occurred while updating the account.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditedAccount(item);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchAccounts = async (id) => {
      try {
        setLoading(true);
        const url =` http://localhost:8023/bankAccount/getBankAccountByInvestor/${id}`;
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
    { Header: "idAccount", accessor: "idAccount", width: "20%", align: "left" },
    { Header: "accountNo", accessor: "accountNo", align: "center" },
    { Header: "bankName", accessor: "bankName", align: "center" },
    { Header: "balance", accessor: "balance", align: "center" },
    { Header: "currency", accessor: "currency", align: "center" },
    { Header: "active", accessor: "active", align: "center" },
    { Header: "actions", accessor: "actions", align: "center" },
  ];

  const rows = accounts.map((item) => ({
    idAccount: (
      editedAccount && editedAccount.id === item.id ?
      <TextField name="id" value={editedAccount.id} onChange={handleFieldChange} />
      : <h3 className="idAccount">{item.id}</h3>
    ),
    accountNo: (
      editedAccount && editedAccount.id === item.id ?
      <TextField name="accountNo" value={editedAccount.accountNo} onChange={handleFieldChange} />
      : <h3>{item.accountNo}</h3>
    ),
    bankName: (
      editedAccount && editedAccount.id === item.id ?
      <TextField name="bankName" value={editedAccount.bankName} onChange={handleFieldChange} />
      : <h3>{item.bankName}</h3>
    ),
    balance: (
      editedAccount && editedAccount.id === item.id ?
      <TextField name="balance" value={editedAccount.balance} onChange={handleFieldChange} />
      : <h3>{item.balance}</h3>
    ),
    currency: (
      editedAccount && editedAccount.id === item.id ?
      <TextField name="currency" value={editedAccount.currency} onChange={handleFieldChange} />
      : <h3>{item.currency}</h3>
    ),
    active: (
      editedAccount && editedAccount.id === item.id ?
      <TextField name="active" value={editedAccount.active} onChange={handleFieldChange} />
      : <h3>{item.active}</h3>
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
