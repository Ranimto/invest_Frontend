
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Investment from "layouts/dashboard/components/Investment";
import { Button, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReplyIcon from '@mui/icons-material/Reply';
import { useSelector } from "react-redux";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [investments, setInvestments] = useState([]);
  const [allData, setAllData] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const email=useSelector((state)=> state.auth.value.email);
  const [showForm,setShowForm]=useState(false);
 

  const [investment, setInvestment] = useState({
    companyName:"",
    numberOfStock:1,
    investmentAmount:0,
    stockActualPrice:0,
    startDate:"",
    duration:"", 
    type:"Stock" 
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

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const newInvestment = {
      ...investment,  
      investmentAmount: investment.numberOfStock * investment.stockActualPrice,
      startDate:new Date()
    };
  
    try {
        console.log('investmentAdded',newInvestment)
        const url = "http://localhost:8023/investment/add";
        const response = await axios.post(url, newInvestment);
        console.log('investmentAdded',newInvestment)

        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);

        setInvestment({
          userId:user.id,
          type:"",
          amount :"",
          companyName :"",
          numberOfStock:0,
          investmentAmount:0,
          stockActualPrice:0,
          startDate:"",
          duration:"",
          status: "IN_PROGRESS", 
            
        });
        setInvestments([...investments, response.data]);
        const investmentDescription = `Adding new investment in the ${investment.companyName} company`;
        const userActivityResponse = await axios.post('http://localhost:8023/user-activity/save', {
          userId: investment.userId,
          timestamp: new Date(),
          description: investmentDescription,
        });

   console.log ( "addUserActivity",)       
    } 
    catch (error) {
      setError(true)
      setTimeout(() => {
      setError(false);
      }, 5000);

      setInvestment({
        userId: user.id,
        type:"Stock" ,
        investmentAmount: "",
        numberOfStock:1,
        startDate: "",
        duration: "",
        status: "IN_PROGRESS",   
      });
        console.log(error);

        setErrorMessage(error.response.data)
    }
};

  const handleAddInvestmentClick=()=>{
    setShowForm(true);
  }
  const handleCancelClick = () => {
    setShowForm(false); 
  };

  const handleSelectChange = (fieldName) => (e) => {
    const { value } = e.target;
    setInvestment({ ...investment, [fieldName]: value });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvestment({...investment,[name]: value});
  };

  useEffect(() => {
    setAllData(investments);
    console.log("investments updated:", investments);
    console.log("allData updated:", allData);
  }, [investments]);
  
  useEffect(() => {
    fetchUserByEmail(email);
  }, [email]);

  return (
    <DashboardLayout>
      <DashboardNavbar allData={allData}/>
      {console.log("allData",allData)}
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Investments"
                count='128'
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Comapnies"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} >
              <ComplexStatisticsCard 
                color="warning"
                icon="store"
                title="Stocks"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Bonds"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={3.5}>
          <Grid container spacing={2} style={{height:'21rem'}}>
            <Grid item xs={12} md={6} lg={4} >
              <MDBox mb={3} >
                <ReportsBarChart 
                  color="success"
                  title="compagnies Financial News"
                  description="Best Company Performance"
                  date="company sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="Companies Stocks"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="warning"
                  title="Companies Bonds"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} >
   
   
            {!showForm ? ( 
        <Button variant="contained" className='roundedAdd' onClick={handleAddInvestmentClick} style={{ margin:'1%', width:'18%'}}><AddRoundedIcon/>Add new Investment</Button>
      ) : (

        
        <Modal open={showForm}>
        <div className="modalContent">
          <form onSubmit={handleSubmit} className='formClasss'style={{width: '33%' ,height:"34rem", margin:"6% 0 0 35%"}} >
            <p>Add an investment</p>
            <Select labelId='type' fullWidth name="type" value={investment.type} onChange={handleSelectChange('type')} style={{padding: '11px'}}>
           <MenuItem value="Stock">Stock</MenuItem>
          </Select>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="StartDate"
                  
                  variant="outlined"
                  name="startDate"
                  value={new Date()}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Duration"
                  variant="outlined"
                  name="duration"
                  value={investment.duration}
                  onChange={handleInputChange}
                  type="number"
                  fullWidth
                  margin="normal"
                  required />
              </Grid>

              <Grid item xs={6}>

              <TextField 
              name="numberOfStock" 
              label="numberOfStock" 
              variant="outlined" 
              fullWidth 
              type="number"
               value={investment.numberOfStock} 
              onChange={handleInputChange}
              margin="normal"
               required />

               <TextField 
              name="stockActualPrice" 
              label="stockActualPrice" 
              variant="outlined" 
              fullWidth 
              type="number"
               value={investment.stockActualPrice} 
              onChange={handleInputChange}
              margin="normal"
               required />

              </Grid>
              <Grid item xs={6}>
            <InputLabel id ='type' style={{padding: '6px'}}>Company Name </InputLabel>
            <Select label='type' fullWidth name="type" value={investment.companyName || ''} onChange={handleSelectChange('companyName')} style={{ padding: '11px' }}>
               <MenuItem value="IBM">IBM</MenuItem>
              <MenuItem value="AAPL">AAPL</MenuItem>
              <MenuItem value="MFST">MFST</MenuItem>
              <MenuItem value="AMZN">AMZN</MenuItem>
              <MenuItem value="TESLA">TESLA</MenuItem>
              <MenuItem value="XOM">XOM</MenuItem>
              <MenuItem value="GOOGL">GOOGL</MenuItem>
            </Select>

            
               <TextField
                  label="Investment Amount"
                  variant="outlined"
                  name="investmentAmount"
                  value={investment.numberOfStock*investment.stockActualPrice}
                  onChange={handleInputChange}
                  type="number"
                  fullWidth
                  margin="normal"
                  required />
              </Grid>
            </Grid>
            <div className="formFooter">
              <Button type="submit" variant="contained" className='btnRecommandation'>
                Submit
              </Button>
              {showSuccessMessage &&  (<p style={{marginTop:"-2%", fontWeight:"100" ,color:"black" ,width:"100%"}}>Your Investment has been added <strong style={{color:"green"}}>Successfully !</strong></p>)}
             { error && (<p style={{marginTop:"-2%", fontWeight:"100", color:"black",width:"100%"}}> <strong style={{color:"red"}}>Failed</strong> to add Investment ! <strong>{errorMessage} !</strong> </p>)}
              <Link to="/dashboard" onClick={()=>handleCancelClick()} className='back'> <ReplyIcon/> Back to List</Link>
            </div>
          </form>
        </div>
      </Modal>
      )}
 <Investment/>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
