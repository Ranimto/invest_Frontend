import { Button } from '@mui/base'
import { Grid, Table } from '@mui/material'
import axios, { AxiosHeaders } from 'axios'
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import PageLayout from 'examples/LayoutContainers/PageLayout'
import { setIn } from 'formik'
import NavbarPerformance from 'layouts/navbarPerformance'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CustomGauge from './gaugeChart'



import './style.css'

const Performance = () => {

   const { investorId, companyId, symbol, currentInvestmentAmount, initialInvestmentAmount } = useParams();
   const [hoveredTitle, setHoveredTitle] = useState('');
   const [showResult, setShowResult] = useState(false);
   const  [company,setCompany]=useState([]);
   const  [investment,setInvestment]=useState([]);
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
      company_id:companyId,
      price_url:"http://localhost:8023/stockData/fetch",
      symbol:symbol
  }
  console.log("bodyyyy",body)
  try{
    const response= await axios.post(url, body);
    console.log( "dataaa", response.data );
    setData(response.data) ;
  }
  catch (error){
     console.error("Failed to fetch data performance",error)

  }

}

const fetchCompanyData= async(companyId)=>{
   try 
   {const url =`http://localhost:8023/company/${companyId}`
   const response = await axios.get(url) ;

   setCompany(response.data) ;}
   catch (error){
    console.error("Failed to fetch company data" ,error)
   }
}

const fetchInvestmentData= async(investorId,companyId)=>{
  try
   {
   const url=`http://localhost:8023/investment/${investorId}/${companyId}`;
   const response = await axios.get(url) ; 
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
   fetchCompanyData(companyId)
} ,[companyId])

useEffect(()=>{
   fetchInvestmentData(investorId,companyId)
} ,[investorId,companyId])

  return (
   <DashboardLayout>

   <Grid container spacing={3} className="containerPerformance" >
   <NavbarPerformance/>
   <MDBox>
          <h6 className="userPerformanceTitle">
          Portfolio <strong>Tracking</strong> 
          </h6>
   </MDBox>

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

  
    <Grid display='flex' gap='2%' justifyContent="center" >
    
   <Grid className='performanceGrid' >
      <Table>
         <thead>
            <th>Company Table </th>
         </thead>
      <tbody>
        <tr className='performanceTable'>
            <td> <strong>Company Name</strong></td>
            <td>{company.name}</td>
        </tr>
        <tr className='performanceTable'>
            <td ><strong>Activity</strong></td>
            <td>{company.activity}</td>
        </tr>
        <tr className='performanceTable'>
            <td ><strong>Number Of Investors</strong></td>
            <td>{company.nbOfInvestors}</td>
        </tr>
        <tr className='performanceTable'>
            <td><strong>Debt Ratio</strong></td>
            <td>{company.debtRatio}</td>
        </tr>
        <tr className='performanceTable'>
            <td><strong>Liquidity Ratio</strong></td>
            <td>{company.liquidityRatio}</td>
        </tr>
        <tr className='performanceTable'>
            <td><strong>Profitability Ratio</strong></td>
            <td>{company.profitabilityRatio}</td>
        </tr>
        
    </tbody>
    </Table>
   </Grid>

       <Grid className='performanceGrid' >
       <Table>

       <thead>
            <th>Investment Table </th>
         </thead>
      <tbody>
        <tr className='performanceTable'>
            <td> <strong>TYPE</strong></td>
            <td>{company.name}</td>
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
  <Grid className='performanceInfo'>
   <p> <strong> Sharpe Ratio </strong> is a measure used by investors to assess the return of an investment relative to its risk. 
   It helps investors make informed decisions by considering both the potential return and the associated risk of an investment.</p>

   <p> <strong>Sortino Ratio</strong> provides investors with a more targeted view of risk by focusing on the 
   potential for losses rather than overall volatility. It&apos;s especially useful for investors who prioritize capital preservation 
   and want to assess an investment&apos;s performance relative to downside risk.</p>

   <p> <strong>Annual Return </strong> , is a measure that tells you how much an investment has grown or declined on 
   average each year over a specific period. it gives a straightforward measure of how your investment has grown on average each year.</p>

   <MDButton variant="contained" type="submit" className='btnPerformance' onClick={handleShowResult}>Show my investment&apos;s gain percentage</MDButton>

   {showResult && (
        <div className='result'>
          {data.gain_percentage > 0 ? (
            <p >Your investment has been  <strong  style={{color:"green"}}>amplified</strong> {data.gain_percentage} times.</p>
          ) : (
            <p> Your investment has <strong style={{color:"red"}}>decremented</strong>  {Math.abs(data.gain_percentage)} times.</p>
          )}
        </div>
      )}
   </Grid>  
   </Grid>
   
   
   </Grid>
   
   </DashboardLayout>
  )
}


export default Performance


