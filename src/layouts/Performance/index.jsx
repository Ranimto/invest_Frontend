import { Grid, Table } from '@mui/material'
import axios, { AxiosHeaders } from 'axios'
import MDBox from 'components/MDBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import { setIn } from 'formik'
import NavbarPerformance from 'layouts/navbarPerformance'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CustomGauge from './gaugeChart'



import './style.css'

const Performance = () => {

   const { investorId, companyId, symbol, currentInvestmentAmount, initialInvestmentAmount } = useParams();
   const [hoveredTitle, setHoveredTitle] = useState('');
   const  [company,setCompany]=useState([]);
   const  [investment,setInvestment]=useState([]);
   const[data,setData]=useState(
      {
         annual_return: 0,
         sharpe_ratio: 0,
         sortino_ratio: 0,
         total_return:0
     }
   )

   const handleTitleHover = (title) => {
      setHoveredTitle(title);
   };
   
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
   <NavbarPerformance/>
   <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <h6 className="userAcitivityTitle">
          Portfolio <strong>Tracking</strong> 
          </h6>
        </MDBox>
      </MDBox>
    <Grid className='performance_items'>    

     <Grid className='performance_item'>
        <p onMouseEnter={() => handleTitleHover("Sharpe Ratio")} onMouseLeave={() => handleTitleHover("")} > <strong>Sharpe</strong> Ratio</p>
        <div className="customGaugee">
           <CustomGauge value={data.sharpe_ratio.toFixed(5)}/>
        </div>
        {hoveredTitle === "Sharpe Ratio" && (
                  <Grid className="additional-info-grid">
                  <p> <strong> Sharpe Ratio </strong> is a measure used by investors to assess the return of an investment relative to its risk. 
                  It helps investors make informed decisions by considering both the potential return and the associated risk of an investment.</p>
                  </Grid>
               )}
     </Grid>


     <Grid className='performance_item'>
        <p onMouseEnter={() => handleTitleHover("Sortino Ratio")} onMouseLeave={() => handleTitleHover("")}> <strong>Sortino</strong> Ratio</p>
        <div className="customGaugee">
           <CustomGauge value={data.sortino_ratio.toFixed(5)}/>
        </div>
        {hoveredTitle === "Sortino Ratio" && (
                  <Grid className="additional-info-grid">
                  <p> <strong>Sortino Ratio</strong> provides investors with a more targeted view of risk by focusing on the 
                  potential for losses rather than overall volatility. It&apos;s especially useful for investors who prioritize capital preservation 
                  and want to assess an investment&apos;s performance relative to downside risk.</p>
                  </Grid>
               )}
     </Grid>


     <Grid className='performance_item'>
        <p onMouseEnter={() => handleTitleHover("Annual Return")} onMouseLeave={() => handleTitleHover("")}><strong>Annual</strong> Return </p>
        <div className="customGaugee">
           <CustomGauge value={data.annual_return.toFixed(5)}/>
        </div>
        {hoveredTitle === "Annual Return" && (
                  <Grid className="additional-info-grid">
                  <p> <strong>Annual Return </strong> , is a measure that tells you how much an investment has grown or declined on 
                  average each year over a specific period. it gives a straightforward measure of how your investment has grown on average each year.</p>
                  </Grid>
               )}
     </Grid>


     <Grid className='performance_item'>
        <p onMouseEnter={() => handleTitleHover("Total Return")} onMouseLeave={() => handleTitleHover("")}> <strong>Total</strong> Return </p>
        <div className="customGaugee">
           <CustomGauge value={data.total_return.toFixed(5)}/>
        </div>
        {hoveredTitle === "Total Return" && (
                  <Grid className="additional-info-grid">
                  <p> <strong>Total Return </strong> Total Return is a comprehensive measure of investment performance that takes
                   into account both the change in the investment&apos;s value over time and any additional income generated by the investment, such as dividends or interest. </p>
                  </Grid>
               )}
     </Grid>
    </Grid>

  
    <Grid display='flex' gap='5%' justifyContent="center" >
    
   <Grid className='performanceGrid' >
      <Table>
         <thead>
            <th>Company Table </th>
         </thead>
      <tbody>
        <tr className='performanceTable'>
            <td> <strong>CompanyName</strong></td>
            <td>{company.name}</td>
        </tr>
        <tr className='performanceTable'>
            <td><strong>Activity</strong></td>
            <td>{company.activity}</td>
        </tr>
        <tr className='performanceTable'>
            <td><strong>NumberOfInvestors</strong></td>
            <td>{company.nbOfInvestors}</td>
        </tr>
        <tr className='performanceTable'>
            <td><strong>DebtRatio</strong></td>
            <td>{company.debtRatio}</td>
        </tr>
        <tr className='performanceTable'>
            <td><strong>LiquidityRatio</strong></td>
            <td>{company.liquidityRatio}</td>
        </tr>
        <tr className='performanceTable'>
            <td><strong>ProfitabilityRatio</strong></td>
            <td>{company.profitabilityRatio}</td>
        </tr>
        <tr className='performanceTable'>
            <td>AnotherProfitabilityRatio</td>
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
            <td><strong>initialInvestmentAmount</strong></td>
            <td>{investment.investmentAmount}</td>
        </tr>

        <tr className='performanceTable'>
            <td><strong>currentInvestmentAmount</strong></td>
            <td>{investment.currentInvestmentAmount}</td>
        </tr>
        <tr className='performanceTable'>
            <td><strong>startDate</strong></td>
            <td>{investment.startDate}</td>
        </tr>
        <tr className='startDate'>
            <td><strong>duration</strong></td>
            <td>{investment.duration}</td>
        </tr>
        <tr className='performanceTable'>
            <td><strong>status</strong></td>
            <td>{investment.status}</td>
        </tr>
        <tr className='performanceTable'>
            <td><strong>dividendPayout</strong></td>
            <td>{investment.dividendPayout}</td>
        </tr>
       

    </tbody>
    </Table>
       </Grid>
      
   </Grid>

    </DashboardLayout>
  )
}


export default Performance


