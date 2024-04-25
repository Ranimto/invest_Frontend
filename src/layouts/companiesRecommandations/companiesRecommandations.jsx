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
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Loading from 'assets/images/giphy.gif'

const CompaniesRecommandations = () => {

    const [showForm,setShowForm]= useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCompanyName,setSelectedCompanyName]= useState("")
    const email=useSelector((state)=> state.auth.value.email);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [error, setError] = useState(false);
    const [companies,setCompanies]=useState([]); 
    const [investment, setInvestment] = useState({
      companyName:"",
      type:"",
      investmentAmount :"",
      startDate :"",
      duration :"",
      status: "IN_PROGRESS"
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

   const handleShowForm=(name)=>{
      setShowForm(true);
      setSelectedCompanyName(name);
    }
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInvestment({ ...investment, [name]: value });
    };


  
    const handleSubmit = async (event) => {
      event.preventDefault(); 
    
      const updatedInvestment = { ...investment, companyName: selectedCompanyName };
      setInvestment(updatedInvestment);

      const investmentDescription = `Adding new investment in the ${updatedInvestment.companyName} company with amount : ${updatedInvestment.investmentAmount} USD`;
      const response1 = await axios.post('http://localhost:8023/user-activity/save',
      {
        userId: user.id,
        timestamp: new Date(),
        description: investmentDescription,
      }
      );
      const response = await axios.post("http://localhost:8023/investment/add", updatedInvestment).then(() => {

        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);

          setInvestment({
            userId: user.id,
            type: "",
            investmentAmount: "",
            startDate: "",
            duration: "",
            status: "IN_PROGRESS",   
          });
         
          
        })
        .catch(error => {
          setError(true)
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 5000);
          setInvestment({
            userId: user.id,
            type: "",
            investmentAmount: "",
            startDate: "",
            duration: "",
            status: "IN_PROGRESS",   
          });
          console.error("Error adding investment:", error);
          
        });
    };

    
    const handleClose = (event) => {
      event.preventDefault();
      setShowForm(false); 
      setInvestment({...investment,companyName:''});
    };

    const handleSelectChange = (e) => {
      const { value } = e.target;
      setInvestment({...investment, type: value === "Stock" ? "Stock" : "Bond" });
    };


    const fetchRecommendedCompanies= async()=>{
    
      const url='http://127.0.0.1:5000/recommend_companies'
      const body={ 
         investor_id:122,     
     }
     console.log("bodyyyy",body)
     try{
       const response= await axios.post(url, body);
       console.log( "Recommended Companies", response.data );
       setCompanies(response.data.recommended_companies) ;
       setIsLoading(false);
     }
     catch (error){
        console.error("Failed to fetch recommended companies",error)
     }

   }

    useEffect(() => {
      console.log("slected",selectedCompanyName)
      console.log(investment);
    }, [selectedCompanyName]);


    useEffect(() => {
      fetchUserByEmail(email);
    }, [email]);


    useEffect(()=>{
      fetchRecommendedCompanies()
   } ,[])

  return (
 <DashboardLayout>
   <ComponentNavbar/>
  <div className="recommandationContainer">
  <h1> COMPANY SUGGESTIONS FOR YOU </h1>
  <h5>Personalized AI-driven recommendations tailored just for you</h5>
  <div className="recommandationContainerCard">
  

  {isLoading ? (
    <>
     <Box sx={{ display: 'flex', width:"250%" , marginTop:"13%" ,marginLeft:'91%'}}>
      <div className="text-animation">HEY <strong>{user.firstname} !</strong> ... Please Wait For The <strong>AI </strong>  Process ... </div>   
     </Box>
      <img  className="imageStyle" style={{paddingTop:"28%", marginLeft:"-8%"}}  src={Loading} />  
      </>
  ) : ( 
  companies.map((item,index)=>(

 <Grid key={index} className="recommGrid">
 <Card className="recommandationCard">
   <Link to={`/stock/${item.name}`} > <h6 className="CompanyName">{item.name}</h6></Link>
   <p className="text-initial"><strong>Company Name :</strong> {item.companyName}</p> 
   <p className="text-initial"><strong>Company Activity :</strong>{item.activity}</p>
   <p className="text-initial"><strong>Profit Percentage : </strong>{item.profit.toFixed(6)} %</p>
  
   <p className="text-hover">{item.description}</p>

   <MDButton variant="gradient"  fullWidth type="submit" onClick={() => handleShowForm(item.name)} style={{width:"45%",margin:'5% 0 0 30%'}} className="Companybtnn"> Invest now</MDButton>

 </Card>
</Grid>
))
)}
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
              type="number"
              fullWidth
              margin="normal"
              required />

              <TextField
              label="investment Amount"
              variant="outlined"
              name="investmentAmount"
              value={investment.investmentAmount}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
              required />

          

            <div className="formFooter">
            <Button type="submit" variant="contained" className='btnRecommandation' >
              Submit
            </Button>
            {showSuccessMessage &&  (<p style={{marginTop:"-2%", fontWeight:"100" ,color:"black"}}>Your Investment has been added <strong style={{color:"green"}}>Successfully !</strong></p>)}
            { error && (<p style={{marginTop:"-2%", fontWeight:"100", color:"black"}}> <strong style={{color:"red"}}>Failed</strong> to add Investment ! please try again {error} </p>)}
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