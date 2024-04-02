import { Button, Card, Grid, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import PageLayout from 'examples/LayoutContainers/PageLayout'
import DefaultNavbaRegister from 'examples/Navbars/DefaultNavbaRegister'
import React, {useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios'
import { useSelector } from 'react-redux'

const CompaniesRecommandations = () => {

    const [showForm,setShowForm]= useState(false)
    const [selectedCompanyId,setSelectedCompanyId]= useState("")
    const email=useSelector((state)=> state.auth.value.email);
    const [companies,setCompanies]=useState([
        { name:"IBM",companyId:1, activity:"Technology", address:"", description:"" },
        { name:"AAPL", companyId:2,activity:"Finance", address:"", description:"" },
        { name:"AMZN", companyId:4,activity:"Technology", address:"", description:"" },
        { name:"Company4", companyId:21, activity:"Technology", address:"", description:"" },
        { name:"Company4", companyId:22 ,activity:"Technology", address:"", description:"" },
        { name:"Company4", companyId:3,activity:"Technology", address:"", description:"" },

    ]); 
    const [investment, setInvestment] = useState({
      companyId:"",
      companyName:"",
      type:"",
      amount :"",
      startDate :"",
      duration :"",
      status: ""
    });   
    const [user,setUser]=useState({ 
      id:"",  
      firstname:"",
      lastname:"",
      email :"",
      phone :"",
      city:"",
      nationality: "",
      postCode: 0,
      profession: ""
    })

    const fetchUserByEmail= async(email)=>{
      const response=axios.get(`http://localhost:8023/user/findByEmail/${email}`)
      setUser((await response).data);  
      setInvestment({ ...investment, userId:(await response).data.id });
    }

    useEffect(() => {
      fetchUserByEmail(email);
    }, [email]);


   const handleShowForm=(companyId)=>{
      setShowForm(true);
      setSelectedCompanyId(companyId);
    }
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInvestment({ ...investment, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault(); 
    
      // Update the companyId in the investment state
      const updatedInvestment = { ...investment, companyId: selectedCompanyId };
      setInvestment(updatedInvestment);
    
      // Send the updated investment data to the backend
      const response = axios.post("http://localhost:8023/investment/add", updatedInvestment)
        .then(() => {
          // Reset the investment state after successful submission
          setInvestment({
            companyId: "",
            companyName: "",
            type: "",
            amount: "",
            startDate: "",
            duration: "",
            status: "",   
          });
          setShowForm(false);
        })
        .catch(error => {
          console.error("Error adding investment:", error);
          // Handle error
        });
    };

    const handleClose = (event) => {
      event.preventDefault();
      setShowForm(false); 
      setInvestment({...investment,companyId:''});
    };

    const handleSelectChange = (e) => {
      const { value } = e.target;
      setInvestment({...investment, type: value === "Stock" ? "Stock" : "Bond" });
    };

    useEffect(() => {
      console.log("slected",selectedCompanyId)
      console.log(investment);
    }, [selectedCompanyId]);

   

  return (
 <PageLayout>
  <DefaultNavbaRegister />
  <div className="recommandationContainer">
  <h1> COMPANY SUGGESTIONS FOR YOU </h1>
  <h5>Personalized AI-driven recommendations tailored just for you</h5>
  <div className="recommandationContainerCard">
{companies.map((item,index)=>(
  <Grid key={index}>
    <Card className="recommandationCard">
    <Link to={`/stock/${item.name}`} className="CompanyName"> <h6>{item.name}</h6></Link>
    <p><strong>Company Id :</strong> {item.companyId}</p> 
    <p> <strong>Company Activity :</strong>{item.activity}</p>
    <p><strong>Company Address : </strong>{item.address}</p>
    <Button
                  variant="contained"
                  className='btnHomee'
                  onClick={() => handleShowForm(item.companyId)}
                >
                  Invest now
                </Button>

    </Card>
   </Grid>
))}
</div>
</div>
{ showForm &&
<Modal open={showForm} >
        <div className="modalContent">
         
          <form onSubmit={handleSubmit} className='formClasss'>
          <p>Make your first step and add an investment</p>
          
           <InputLabel id ='type' style={{padding: '6px'}}>Investment type </InputLabel>
            <Select label='type' fullWidth name="type" value={investment.type}  onChange={handleSelectChange} style={{padding: '11px'}}>
              <MenuItem value="Bond">Bond</MenuItem>
              <MenuItem value="Stock">Stock</MenuItem>
            </Select>
            <TextField
              label="StartDate"
              type="Date"
              variant="outlined"
              name="startDate"
              value={investment.startDate || '01/01/2024'}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required />

              <TextField
              label="Duration"
              variant="outlined"
              name="duration"
              value={investment.duration}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required />

              <TextField
              label="Amount"
              variant="outlined"
              name="amount"
              value={investment.amount}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required />

            <div className="formFooter">
            <Button type="submit" variant="contained" className='btnRecommandation' >
              Submit
            </Button>
            <Link to="/recommandations" onClick={handleClose} className='back'> <ArrowBackIcon/> Back to List</Link>
            </div>
          </form>
        </div>
      </Modal>
}
 </PageLayout>
  )
}

export default CompaniesRecommandations