import { Button, Card, Grid, InputLabel, MenuItem, Modal, Select, Table, TextField } from '@mui/material'
import React, {useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux'
import ComponentNavbar from 'examples/Navbars/ComponentNavbar'
import MDButton from 'components/MDButton';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Box from '@mui/material/Box';
import Loading from 'assets/images/giphy.gif'
import logo from 'assets/images/logo.jpeg'
import MDProgress from 'components/MDProgress';
import ReplyIcon from '@mui/icons-material/Reply';


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
    const[showStrategy, setShowStrategy]=useState(false)
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
    }
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInvestment({ ...investment, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault(); 

    
      const updatedInvestment = { ...investment, companyName: selectedCompanyName,
        investmentAmount:investment.numberOfStock*investment.stockActualPrice,
        startDate: new Date()};
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
       const sortedCompanies = response.data.recommended_companies.sort((a, b) => b.profit - a.profit);
       setCompanies(sortedCompanies) ;
       setIsLoading(false);
     }
     catch (error){
        console.error("Failed to fetch recommended companies",error)
     }
   }

   const fetchPredictedToleranceRisk= async()=>{
    const url='http://127.0.0.1:5004/predict_tolerance_risk'

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
      if (email) {
        fetchUserByEmail(email);
      }
    }, [email]);


    useEffect(()=>{
      if (user.id)
     { fetchRecommendedCompanies();
      fetchProfileData();
      fetchPredictedToleranceRisk();
 }
   } ,[user.id])



   const handleProgress=(value)=>{
    return value;
   }

  return (
 <DashboardLayout>
   <ComponentNavbar/>
  <div className="recommandationContainer" >
  <h1> COMPANY SUGGESTIONS FOR YOU </h1>
  <h5>Personalized AI-driven recommendations tailored just for you</h5>
  <h5>Your Predicted Tolerance Risk based in the <strong style={{padding:"0 0.3% 0 0.3%"}}> AI </strong> process is :  <strong style={{marginLeft:'1%'}} > {Math.round(predictedRisk)}</strong> %</h5>
    <div>
      <MDProgress value={handleProgress(Math.round(predictedRisk))} label={true} color="success" />
    </div>
  <h5 className="profiledata"  onClick={()=>handleShowProfileData()}> See the details of your Profile Form</h5> 
  <h5 className="profiledata" onClick={()=>setShowStrategy(true)}> Why these companies ?</h5> 
  {
    showStrategy &&
    <Modal open={showStrategy}>
      <div className="modalContent">
      <Grid className="strategyModal" style={{backgroundColor:'white', padding:'2% 3% 3% 3%' ,margin:'3% 0 0 40%' , width:'30rem' , listStyle: "none", overflowY: "auto", maxHeight: "42rem" }}>
        <h5>Discover Our Strategy</h5>
        <h6> This strategy categorizes investors based on their predicted risk tolerance into five ranges. Each range represents a different level of risk tolerance, from very low to very high.</h6>
        <ul type='none'>
         <li>Tolerance Range in [0% .. 20%]</li>
          <p>If an investor&apos;s predicted risk tolerance falls between <span> 0 and 20 </span> , only companies projecting an expected profit of <span>80% to 100% </span> will be recommended.</p>
        </ul>

          <ul type='none' >
         <li>Tolerance Range in [20% .. 40%]</li>
         <p>For investors with a predicted risk tolerance between <span>20% and 40%</span> , recommended companies should anticipate profits ranging from<span>  60% to 100% </span>.</p>
         </ul>

         <ul type='none' >
         <li>Tolerance Range in [40% .. 60%]</li>
         <p>Investors expecting a risk tolerance within the range of<span> 40% to 60%</span> would be recommended companies forecasting profits between <span>40% and 100% </span>.</p>
        </ul>

         <ul type='none'>
         <li>Tolerance Range in [60% .. 80%]</li>
         <p>If an investor&apos;s predicted risk tolerance is between <span> 60% and 80%</span>, recommended companies should aim for profits  ranging from <span>20% to 100% </span>.</p>
        </ul>

        <ul type='none'>
         <li>Tolerance Range in [80% .. 100%]</li>
          <p>Investors with a high predicted risk tolerance of <span>80% to 100%</span> would be recommended companies with expected profits  between <span> 0% and 100% </span>. </p>
        </ul>

      
         <Button style={{marginLeft:'75%'}} onClick={()=>setShowStrategy(false)}>Understand</Button>
      </Grid>
      </div>
    </Modal>
  } 
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
     <Box sx={{ display: 'flex', width:"400%" , marginTop:"13%" ,marginLeft:'31%'}}>
      <div className="text-animation">HEY <strong>{user.firstname} !</strong> ... Please Wait For The <strong>AI </strong>  Process  To Find Suitable Companies For <strong>Your Profile</strong> ... </div>   
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
   <p className="text-initial"><strong>Profitability Percentage : </strong>{item.profit.toFixed(3)} %</p>
   <p className="text-hover">{item.description}</p>
   <Grid display="flex" gap="5%">
   <MDButton variant="gradient"  fullWidth type="submit" onClick={() => handleShowForm(item.companyName)} style={{width:"80%",marginTop:'5%', fontSize:"10px"}} className="Companybtnn"> Invest now</MDButton>
   <MDButton variant="gradient"  fullWidth  onClick={()=>handleShowGeminiAnalyseMessage(item.companyName)} style={{width:"90%",marginTop:'5%' ,fontSize:"10px" , backgroundColor:'blueviolet'}} className="Companybtnn">Analyse {item.companyName} </MDButton>
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
    <Button onClick={()=>setAnalyseMessage(false) }>Back</Button>
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
        <div className="recommandContent">
         
          <form onSubmit={handleSubmit} className='formClasss'>
          <p>Make your first step and add an investment</p>
          
           <InputLabel id ='type' style={{padding: '6px'}}>Investment type </InputLabel>
            <Select label='type' fullWidth name="type" value={investment.type}  onChange={handleSelectChange} style={{padding: '11px'}}>
              <MenuItem value="Stock">Stock</MenuItem>
            </Select>
            <TextField
              label="StartDate"
          
              variant="outlined"
              name="startDate"
              value={new Date()}
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
            <Link to="/recommandations" onClick={handleClose} className='back'> <ReplyIcon/> Back to List</Link>
            </div>
            
          </form>
        </div>
      </Modal>
}
</DashboardLayout>
  )
}

export default CompaniesRecommandations