
import { Grid, Table } from '@mui/material'
import axios from 'axios'
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import ComponentNavbar from 'examples/Navbars/ComponentNavbar'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CustomGauge from './gaugeChart'
import { motion } from 'framer-motion';
import './style.css'
import { useSelector } from 'react-redux'

const Performance = () => {

   const { investorId, companyId, symbol, currentInvestmentAmount, initialInvestmentAmount } = useParams();

   const [showResult, setShowResult] = useState(false);
   const  [company,setCompany]=useState([]);
   const  [investment,setInvestment]=useState([]);
   const token=useSelector((state)=>state.auth.value.token)
   const[data,setData]=useState(
      {
         annual_return: 0,
         sharpe_ratio: 0,
         sortino_ratio: 0,
         total_return:0,
         gain_percentage: 0
     }
   )
   
const fetchPerformanceIndicators= async()=>{
    
   const url='http://127.0.0.1:5002/investment_performance'
   const body={
      base_url: "http://localhost:8023/investment",
      investor_id: investorId,
      company_Name:symbol,
      price_url:"http://localhost:8023/stockData/fetch",
  }
  try{
    const response= await axios.post(url, body, {
      headers: {
          'Authorization': `Bearer ${token}` 
      }
  });
    setData(response.data) ;
  }
  catch (error){
     console.error("Failed to fetch data performance",error)

  }

}

const fetchCompanyData= async(companyId)=>{
   try 
   {const url =`http://localhost:8023/company/${companyId}`
   const response = await axios.get(url, {
      headers: {
          'Authorization': `Bearer ${token}` 
      }
  }) ;

   setCompany(response.data) ;}
   catch (error){
    console.error("Failed to fetch company data" ,error)
   }
}

const fetchInvestmentData= async(investorId,symbol)=>{
  try
   {
   const url=`http://localhost:8023/investment/${investorId}/${symbol}`;
   const response = await axios.get(url, {
      headers: {
          'Authorization': `Bearer ${token}` 
      }
  }) ; 
   setInvestment(response.data);}
catch (error) {
console.error("Failed to fetch Investment Data" ,error)
}
}

const handleShowResult=()=>{
   setShowResult(true);
   setTimeout(() => {
      setShowResult(false);
    }, 5000);
}
useEffect(()=>{
   fetchPerformanceIndicators()
} ,[])

useEffect(()=>{
  if (companyId) {fetchCompanyData(companyId)}
} ,[companyId])

useEffect(()=>{
  if (investorId) 
  {  if  (symbol) 
  fetchInvestmentData(investorId,symbol)}
} ,[investorId,symbol])

  return (
   <DashboardLayout>
    <ComponentNavbar/>
   <Grid container  className="containerPerformance" >
   <MDBox>
          <h6 className="userPerformanceTitle">
          Portfolio <strong>Tracking</strong> 
          </h6>
   </MDBox>
   <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 1.5,
      delay: 0
    }}
  >
    <Grid className='performance_items'>    

     <Grid className='performance_item'>
        <p  > <strong>Sharpe</strong> Ratio</p>
        <div className="customGaugee">
           <CustomGauge value={data.sharpe_ratio.toFixed(6)}/>
        </div>
       
     </Grid>


     <Grid className='performance_item'>
        <p> <strong>Sortino</strong> Ratio</p>
        <div className="customGaugee">
           <CustomGauge value={data.sortino_ratio.toFixed(6)}/>
        </div>
      
     </Grid>


     <Grid className='performance_item'>
        <p><strong>Annual</strong> Return </p>
        <div className="customGaugee">
           <CustomGauge value={data.annual_return.toFixed(6)}/>
        </div>
        
     </Grid>


     <Grid className='performance_item'>
        <p > <strong>Total</strong> Return </p>
        <div className="customGaugee">
           <CustomGauge value={data.total_return.toFixed(6)}/>
        </div>
       
     </Grid>
    </Grid>

    </motion.div>


<motion.div
        style={{ width: 0, overflow: 'hidden' }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, delay: 0.3 }}
 >

  <Grid className='performanceInfo' >
   <p> <strong> Sharpe Ratio </strong> is a measure used by investors to assess the return of an investment relative to its risk. 
   It helps investors make informed decisions by considering both the potential return and the associated risk of an investment.</p>

     <div className="explication">
     <span> <strong className="positive">Positive Sharpe Ratio</strong>  Indicates favorable returns relative to risk, suggesting a promising investment opportunity. </span>
     <br/>
    <span> <strong className="negative">Negative Sharpe Ratio</strong> Implies that returns may not justify the associated risk, urging caution before proceeding with the investment. </span>
    </div>

   <p> <strong>Sortino Ratio</strong> provides investors with a more targeted view of risk by focusing on the 
   potential for losses rather than overall volatility. It&apos;s especially useful for investors who prioritize capital preservation 
   and want to assess an investment&apos;s performance relative to downside risk.</p>

   <div className="explication">
   <span > <strong className="positive">Positive Sortino Ratio </strong>Signals that potential returns outweigh downside risks, making the investment appealing, particularly for risk-averse investors </span>
   <br/>
    <span ><strong className='negative'>Negative Sortino Ratio</strong> Suggests that the investment&apos;s returns might not compensate for the possibility of losses, advising careful consideration before investing further. </span>
   </div>

   <p> <strong>Annual Return </strong> , is a measure that tells you how much an investment has grown or declined on 
   average each year over a specific period. it gives a straightforward measure of how your investment has grown on average each year.</p>

   <div className="explication">
    <span><strong  className="positive">Positive Annual Return</strong>  Reflects growth in investment value, indicating a successful investment endeavor </span>
    <br/>
    <span><strong className="negative">Negative Annual Return</strong> Indicates a decline in investment value, prompting a review of the investments performance and potential future prospect </span>
   </div>
   <MDButton variant="contained" type="submit" className='btnPerformance' onClick={handleShowResult}>Show my investment&apos;s gain percentage</MDButton>

   {showResult && (
        <div className='result'>
          {data.gain_percentage > 0 ? (
            <p >Your investment has been  <strong  style={{color:"green"}}>Amplified</strong> {Math.round(data.gain_percentage)} times.</p>
          ) : (
            <p> Your investment has <strong style={{color:"rgba(194, 2, 2, 0.859)"}}>Decremented</strong> {Math.abs(data.gain_percentage.toFixed(3))} <span style={{fontWeight:"600"}}> times.</span> </p>
          )}
        </div>
      )}
   </Grid>  
   </motion.div>
   </Grid>
   
   <Grid display='flex' gap='2%' justifyContent="center" >
    
    <Grid className='performanceGrid' >
       <Table>
          <thead>
          <tr>
             <th>Company Table </th>
             </tr>
          </thead>
       <tbody>
         <tr className='performanceTable'>
             <td> <strong> Name</strong></td>
             <td>{company.companyName}</td>
         </tr>
         <tr className='performanceTable'>
             <td ><strong>Activity</strong></td>
             <td>{company.activity}</td>
         </tr>
         <tr className='performanceTable'>
             <td ><strong>Currency</strong></td>
             <td>{company.reportedCurrency}</td>
         </tr>
         <tr className='performanceTable'>
             <td><strong>operating Cash flow</strong></td>
             <td>{company.operatingCashflow}</td>
         </tr>
         <tr className='performanceTable'>
             <td><strong>payments For Operating Activities</strong></td>
             <td>{company.paymentsForOperatingActivities}</td>
         </tr>
         <tr className='performanceTable'>
             <td><strong>capital Expenditures </strong></td>
             <td>{company.capitalExpenditures}</td>
         </tr>
 
        
      
         <tr className='performanceTable'>
             <td><strong>net Income </strong></td>
             <td>{company.netIncome}</td>
         </tr>
     </tbody>
     </Table>
    </Grid>
 
        <Grid className='performanceGrid' >
        <Table>
 
        <thead>
           <tr>
             <th>Investment Table </th> 
          </tr>
          </thead>
       <tbody>
         <tr className='performanceTable'>
             <td> <strong>TYPE</strong></td>
             <td>{company.type}</td>
         </tr>
         <tr className='performanceTable'>
             <td><strong>initial Investment Amount</strong></td>
             <td>{investment.investmentAmount}</td>
         </tr>
 
         <tr className='performanceTable'>
             <td><strong>current Investment Amount</strong></td>
             <td>{investment.currentInvestmentAmount}</td>
         </tr>
         <tr className='performanceTable'>
             <td><strong>start Date</strong></td>
             <td>{investment.startDate}</td>
         </tr>
         <tr className='performanceTable'>
             <td><strong>duration</strong></td>
             <td>{investment.duration}</td>
         </tr>
         <tr className='performanceTable'>
             <td><strong>status</strong></td>
             <td>{investment.status}</td>
         </tr>
        
        
 
     </tbody>
     </Table>
        </Grid>
   </Grid>
   
   </DashboardLayout>
  )
}


export default Performance


