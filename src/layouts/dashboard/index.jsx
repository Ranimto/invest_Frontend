
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from "react-redux";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [investments, setInvestments] = useState([]);
  const [allData, setAllData] = useState([]);
  const email=useSelector((state)=> state.auth.value.email);
  const [showForm,setShowForm]=useState(false);
  const [investment, setInvestment] = useState({
    userId:"",
    companyName:"",
    type:"",
    investmentAmount :"",
    startDate:"",
    duration:"",
      
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
    try {
      
        const url = "http://localhost:8023/investment/add";
        const response = await axios.post(url, investment);
        console.log('Investment added:', response.data);
        setInvestment({
          userId:"",
          companyId:"",
          type:"",
          amount :"",
          startDate:"",
          duration:"",
            
        });
        setShowForm(false);
        setInvestments([...investments, response.data]);
        const investmentDescription = `Adding new investment in the ${investment.companyName} company`;
        const userActivityResponse = await axios.post('http://localhost:8023/user-activity/save', {
          userId: investment.userId,
          timestamp: new Date(),
          description: investmentDescription,
        });
   console.log ( "addUserActivity",)
        
    } catch (error) {
        console.log(error);
    }
};

  const handleAddInvestmentClick=()=>{
    setShowForm(true);
  }
  const handleCancelClick = () => {
    setShowForm(false); 
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setInvestment({...investment, type: value === "Stock" ? "Stock" : "Bond" });
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
          <form onSubmit={handleSubmit} className='formClasss'style={{width: '30%' ,height:"30rem", marginLeft:"40%"}} >
            <p>Add an investment</p>
            <InputLabel id='type' style={{padding: '6px'}}>Investment type </InputLabel>
            <Select label='type' fullWidth name="type" value={investment.type} onChange={handleSelectChange} style={{padding: '11px'}}>
              <MenuItem value="Bond">Bond</MenuItem>
              <MenuItem value="Stock">Stock</MenuItem>
            </Select>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="StartDate"
                  type="Date"
                  variant="outlined"
                  name="startDate"
                  value={investment.startDate || '01/01/2024'}
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
                  fullWidth
                  margin="normal"
                  required />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Investment Amount"
                  variant="outlined"
                  name="investmentAmount"
                  value={investment.investmentAmount}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required />
              </Grid>
              {/* Add more pairs of fields here */}
              <Grid item xs={6}>
                <TextField
                  label="companyId"
                  variant="outlined"
                  name="companyId"
                  value={investment.companyId}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required />
              </Grid>
            </Grid>
            <div className="formFooter">
              <Button type="submit" variant="contained" className='btnRecommandation'>
                Submit
              </Button>
              <Link to="/dashboard" onClick={handleCancelClick} className='back'> <ArrowBackIcon/> Back to List</Link>
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
