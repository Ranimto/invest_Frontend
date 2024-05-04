import { Button, Card, Grid, InputLabel, MenuItem, Modal, Select, Table, TextField } from '@mui/material'
import React, {useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios'
import { useSelector } from 'react-redux'
import ComponentNavbar from 'examples/Navbars/ComponentNavbar'
import MDButton from 'components/MDButton';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Box from '@mui/material/Box';
import Loading from 'assets/images/giphy.gif'
import logo from 'assets/images/logo.jpeg'


const CompaniesRecommandations = () => {

    const [showForm,setShowForm]= useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCompanyName,setSelectedCompanyName]= useState("")
    const email=useSelector((state)=> state.auth.value.email);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [predictedRisk, setPredictedRisk] = useState(0);
    const [showProfileData, setShowProfileData] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [error, setError] = useState(false);
    const [companies,setCompanies]=useState([]);
    const[analyseResponse, setAnalyseResponse]=useState("")
    const[analyseCompany, setAnalyseCompany]=useState("")
    const[analyseMessage, setAnalyseMessage]=useState(false)
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
      const response= await axios.get(`http://localhost:8023/user/findByEmail/${email}`)
      setUser( response.data);  
      setInvestment({ ...investment, userId: response.data.id });
    }

   const handleShowForm=(name)=>{
      setShowForm(true);
      setSelectedCompanyName(name);
      console.log('ssss',selectedCompanyName)
    }
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInvestment({ ...investment, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault(); 

    
      const updatedInvestment = { ...investment, companyName: selectedCompanyName,investmentAmount:investment.numberOfStock*investment.stockActualPrice};
      setInvestment(updatedInvestment);


      //save it in the historical activity 
      const investmentDescription = `Adding new investment in the ${updatedInvestment.companyName} company with amount : ${updatedInvestment.investmentAmount} $`;
      const response1 = await axios.post('http://localhost:8023/user-activity/save',
      {
        userId: user.id,
        timestamp: new Date(),
        description: investmentDescription,
      }
      );
      console.log('updatedInvestment', updatedInvestment)
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
         investor_id: user.id,     
     }
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

   const fetchPredictedToleranceRisk= async()=>{
    const url='http://127.0.0.1:5001/predict_tolerance_risk'
    const body={    
     base_url: "http://localhost:8023/profileData/findProfile/",
     investor_id: user.id,   
   }
   try{
     console.log('rrr',user.id)
     const response= await axios.post(url, body);
     console.log( "PredictedToleranceRisk", response.data.predicted_tolerance_risk );
     setPredictedRisk(response.data.predicted_tolerance_risk) ;
   }
   catch (error){
      console.error("Failed to fetch Predicted Tolerance Risk",error)
   }
 }

 const fetchProfileData= async()=>{
   try
  { const response= await axios.get(`http://localhost:8023/profileData/findProfile/${user.id}`)
  setProfileData(response.data)
  console.log("profile Data",response.data)
}

  catch(error){
   console.log(error.response.data)
  }
}

//   const analyseCompanyDataBasedOnProfileData = async ()=>{
//   const url='http://localhost:5003/generate'
//   const body={
//     company_name: analyseCompany,
//     investor_id: user.id
//   }
//   try{
//   const response= await axios.post(url,body)
//   setAnalyseResponse(response.data)
// }
//  catch(error){
//      console.log(error.response.data)
//   }
// }  

  const handleShowProfileData=()=> {
     setShowProfileData(true);
     setTimeout(() => {
    setShowProfileData(false);
     }, 5000);
 } 

const handleShowGeminiAnalyseMessage =(companyName)=>{
  setAnalyseMessage(true);
  setAnalyseCompany(companyName)
}

   /*  useEffect(() => {
      // analyseCompanyDataBasedOnProfileData(selectedCompanyName)
    }, [selectedCompanyName]); */


    useEffect(() => {
      fetchUserByEmail(email);
    }, [email]);
    
    useEffect(()=>{
      fetchRecommendedCompanies();
      fetchPredictedToleranceRisk()
      fetchProfileData();
   } ,[user.id])


  return (
 <DashboardLayout>
   <ComponentNavbar/>
  <div className="recommandationContainer">
  <h1> COMPANY SUGGESTIONS FOR YOU </h1>
  <h5>Personalized AI-driven recommendations tailored just for you</h5>
  <h5>Your Predicted Tolerance Risk is :  <strong style={{marginLeft:'1%'}} > {predictedRisk}</strong>  /5</h5>

  <h5 className="profiledata"  onClick={handleShowProfileData}> See the details of your Profile Form</h5>

{showProfileData &&
  
  <Grid display="flex" gap="1%">
    <Table>
      <tbody className="profileTable">
      <tr>
        <td><strong>Employment Status</strong> </td>
        <td>{profileData.employmentStatus}</td>
      </tr>   

       <tr>
        <td> <strong>Age</strong></td>
        <td>{profileData.age}</td>
      </tr>
      <tr>
        <td><strong>Investment Goal</strong> </td>
        <td>{profileData.investmentGoal}</td>
      </tr>
      <tr>
        <td><strong>Past Investment Experience</strong> </td>
        <td>{profileData.pastInvestmentExperience}</td>
      </tr>   
      <tr>
        <td><strong>Financial Market Knowledge</strong> </td>
        <td>{profileData.financialMarketKnowledge}</td>
      </tr> 
      </tbody>
      </Table>

      <Table>
      <tbody className="profileTable">
      <tr>
        <td> <strong>Investment Product Knowledge</strong> </td>
        <td>{profileData.investmentProductKnowledge}</td>
      </tr> 

      <tr>
        <td><strong>Investment Selection Criteria</strong> </td>
        <td>{profileData.investmentSelectionCriteria}</td>
      </tr> 

      <tr>
        <td> <strong>Avoid Specific Investments</strong> </td>
        <td>{profileData.avoidSpecificInvestments}</td>
      </tr> 

      <tr>
        <td><strong>Annual Income Range</strong> </td>
        <td>{profileData.annualIncomeRange}</td>
      </tr> 

      <tr>
        <td> <strong>Financial Market Knowledge</strong> </td>
        <td>{profileData.financialMarketKnowledge}</td>
      </tr> 

      </tbody>
      </Table>

      <Table>
      <tbody className="profileTable">
      <tr>
        <td> <strong>Debts</strong></td>
        <td>{profileData.debts}</td>
      </tr> 

      <tr>
        <td><strong>Investment Style</strong> </td>
        <td>{profileData.investmentStyle}</td>
      </tr> 

      <tr>
        <td><strong>Target Rate Of Return</strong> </td>
        <td>{profileData.targetRateOfReturn}</td>
      </tr> 

      
      <tr>
        <td><strong>Preferred Industries</strong></td>
        <td>{profileData.preferredIndustries}</td>
      </tr> 

      <tr>
        <td><strong>Liquidity Priority</strong></td>
        <td>{profileData.liquidityPriority}</td>
      </tr>

      </tbody>
      </Table>

      <Table>
      <tbody className="profileTable">

      <tr>
        <td><strong>Reaction To Market Downturn</strong></td>
        <td>{profileData.reactionToMarketDownturn}</td>
      </tr>

      <tr>
        <td><strong> Comfort With Fluctuations</strong></td>
        <td>{profileData.comfortWithFluctuations}</td>
      </tr>

      <tr>
        <td><strong> Financial Risk Comfort Level</strong></td>
        <td>{profileData.financialRiskComfortLevel}</td>
      </tr>

      <tr>
        <td> <strong>Source Of Funds</strong> </td>
        <td>{profileData.sourceOfFunds}</td>
      </tr>

      </tbody>
    </Table>
  </Grid>

}
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
   <Link to={`/stock/${item.companyName}`} > <h6 className="CompanyName">{item.companyName}</h6></Link>
   <p className="text-initial"><strong>Company Name :</strong> {item.companyName}</p> 
   <p className="text-initial"><strong>Company Activity :</strong>{item.activity}</p>
   <p className="text-initial"><strong>Profit Percentage : </strong>{item.profit.toFixed(6)} %</p>
   <p className="text-hover">{item.description}</p>
   <Grid display="flex" gap="5%">
   <MDButton variant="gradient"  fullWidth type="submit" onClick={() => handleShowForm(item.companyName)} style={{width:"80%",marginTop:'5%', fontSize:"10px"}} className="Companybtnn"> Invest now</MDButton>
   <MDButton variant="gradient"  fullWidth  onClick={handleShowGeminiAnalyseMessage(item.companyName)} style={{width:"90%",marginTop:'5%' ,fontSize:"10px" , backgroundColor:'blueviolet'}} className="Companybtnn">Analyse {item.companyName} </MDButton>
   </Grid>
  
  {analyseMessage &&
 <Modal open={analyseMessage} >
  <div className="modalContent" style={{backgroundColor:"transparent"}} >
    <Card className='geminiMessage'>
      <Grid display="flex" gap="2%">
      <img src={logo} width="2%" height="5px"/>
      <h6 className="chatHeader">InvestAI Result</h6>
      </Grid>
    <p> {analyseCompany}</p>
    <Button onClick={()=>{setAnalyseMessage(false)} }>Back</Button>
   </Card>
  </div>

 </Modal>}
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
              label="number Of Stock"
              variant="outlined"
              name="numberOfStock"
              value={investment.numberOfStock}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
              required />  

              
              <TextField
              label="stock Actual Price"
              variant="outlined"
              name="stockActualPrice"
              value={investment.stockActualPrice}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
              required />  

              <TextField
              label="investment Amount"
              variant="outlined"
              name="investmentAmount"
              value={investment.numberOfStock*investment.stockActualPrice}
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