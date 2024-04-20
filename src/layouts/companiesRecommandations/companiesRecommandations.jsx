import { Button, Card, Grid, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import React, {useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios'
import { useSelector } from 'react-redux'
import ComponentNavbar from 'examples/Navbars/ComponentNavbar'
import MDButton from 'components/MDButton';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';

const CompaniesRecommandations = () => {

    const [showForm,setShowForm]= useState(false)
    const [selectedCompanyId,setSelectedCompanyId]= useState("")
    const email=useSelector((state)=> state.auth.value.email);
    const [companies,setCompanies]=useState([
        { name:"IBM",companyId:1, activity:"Technology", address:"", description:"IBM is a leading American multinational specializing in IT services, software, and hardware." },
        { name:"AAPL", companyId:2,activity:"Finance", address:"", description:"Apple Inc. is an American multinational technology company known for its consumer electronics, software, and services." },
        { name:"AMZN", companyId:4,activity:"Technology", address:"", description:"Amazon is a leading American multinational tech company known for e-commerce, cloud services, and AI." },
        { name:"TESLA", companyId:21, activity:"Technology", address:"", description:" Tesla is an American electric vehicle and clean energy company founded in 2003 by Elon Musk." },
        { name:"MFST", companyId:22 ,activity:"Technology", address:"", description:"Microsoft is a major American multinational technology company known for its software products and services. " },
        { name:"XOM", companyId:3,activity:"Technology", address:"", description:"XOM is the ticker symbol for Exxon Mobil Corporation, which is one of the world's largest publicly traded international oil and gas companies" },

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

   const handleShowForm=(companyId)=>{
      setShowForm(true);
      setSelectedCompanyId(companyId);
    }
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInvestment({ ...investment, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault(); 
    
      const updatedInvestment = { ...investment, companyId: selectedCompanyId };
      setInvestment(updatedInvestment);

      
      const investmentDescription = `Adding new investment in the ${updatedInvestment.companyId} company with amount : ${updatedInvestment.amount} USD`;
      const response1 = await axios.post('http://localhost:8023/user-activity/save',
      {
        userId: user.id,
        timestamp: new Date(),
        description: investmentDescription,
    }
      );
     
      const response = await axios.post("http://localhost:8023/investment/add", updatedInvestment)
        .then(() => {
      
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


    useEffect(() => {
      fetchUserByEmail(email);
    }, [email]);

  return (
 <DashboardLayout>
   <ComponentNavbar/>
  <div className="recommandationContainer">
  <h1> COMPANY SUGGESTIONS FOR YOU </h1>
  <h5>Personalized AI-driven recommendations tailored just for you</h5>
  <div className="recommandationContainerCard">
       {companies.map((item,index)=>(
 <Grid key={index} className="recommGrid">
 <Card className="recommandationCard">
   <Link to={`/stock/${item.name}`} > <h6 className="CompanyName">{item.name}</h6></Link>
   <p className="text-initial"><strong>Company Id :</strong> {item.companyId}</p> 
   <p className="text-initial"><strong>Company Activity :</strong>{item.activity}</p>
   <p className="text-initial"><strong>Company Address : </strong>{item.address}</p>
   
 
   <p className="text-hover">{item.description}</p>

   <MDButton variant="gradient"  fullWidth type="submit" onClick={() => handleShowForm(item.companyId)} style={{width:"45%",margin:'5% 0 0 30%'}} className="Companybtnn"> Invest now</MDButton>

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
</DashboardLayout>
  )
}

export default CompaniesRecommandations