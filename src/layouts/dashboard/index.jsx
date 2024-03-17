
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
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [investments, setInvestments] = useState([]);
  const [showForm,setShowForm]=useState(false);
  const [investment, setInvestment] = useState({
    userId:"",
    companyName:"",
    type:"",
    amount :"",
    startDate:"",
    duration:"",
    status:"",   
  });

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
          status:"",   
        });
        setShowForm(false);
        setInvestments([...investments, response.data]);
        
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


  return (
    <DashboardLayout>
      <DashboardNavbar />
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
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="store"
                title="stock"
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
                title="Bond"
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
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="success"
                  title="compagnies views"
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
                  title="daily sales"
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
                  title="completed tasks"
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

        
        <form onSubmit={handleSubmit} >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <TextField  name="companyId" label="companyId" variant="outlined" fullWidth value={investment.companyId} onChange={handleInputChange}  />
            </Grid>
            <Grid item xs={4}>
              <TextField name="userId" label="userId" variant="outlined" fullWidth value={investment.userId} onChange={handleInputChange} />
            </Grid> 
            <Grid item xs={4}>
              <TextField name="amount" label="amount" variant="outlined" fullWidth value={investment.amount} onChange={handleInputChange} />
            </Grid> 
            <Grid item xs={4}>
              <TextField name="status" label="status" variant="outlined" fullWidth value={investment.status} onChange={handleInputChange}  />
            </Grid>    
            <Grid item xs={4}>
              <TextField name="startDate" label="startDate" variant="outlined" fullWidth  value={investment.startDate} onChange={handleInputChange} />
            </Grid> 
            <Grid item xs={4}>
              <TextField name="duration" label="duration" variant="outlined" fullWidth  value={investment.duration} onChange={handleInputChange} />
            </Grid> 
            <Grid item xs={4}>
        <InputLabel id="type-label" style={{ padding: '5px' ,color:'rgba(45, 43, 43, 0.911)',fontWeight:'500'}}>Choose your investment type: </InputLabel>
      <Select labelId="type-label" variant="outlined" fullWidth style={{ padding: '6px' }} value={investment.type} onChange={handleSelectChange}>
      <MenuItem value="Stock">Stock</MenuItem>
      <MenuItem value="Bond">Bond</MenuItem>
      </Select>
        </Grid>
         

            <Grid item className='gridbtn' xs={12} style={{ margin: '2%' }}>
              <Button variant="contained" onClick={handleCancelClick} className='cancel'>Cancel</Button>
              <Button variant="contained" type="submit" className='add'>Add </Button>
            </Grid>
          </Grid>
        </form>
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
