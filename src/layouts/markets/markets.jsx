import React, { useEffect, useRef, useState } from 'react';
import { Grid, Table } from '@mui/material';
import MDBox from 'components/MDBox';
import './style.css';
import MDButton from 'components/MDButton';
import AAPL from 'assets/images/AAPL.png'
import AMZN from 'assets/images/AMZN.png'
import MFST from 'assets/images/MFST.png'
import IBM from 'assets/images/IBM.png'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import axios from 'axios';

const Markets = () => {

const [topGainers,setTopGainers]=useState([])
const [topLosers,setTopLosers]=useState([])
const [mostActivelyTraded,setMostActivelyTraded]=useState([])
const containerRef = useRef(null);
const [isScrolling, setIsScrolling] = useState(true);

useEffect(() => {
  

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8023/stockData/topGainersAndLosers`)
      setTopGainers(response.data.top_gainers);
      setTopLosers(response.data.top_losers);
      setMostActivelyTraded(response.data.most_actively_traded);
       
      console.log(response.data);
      consolwe.log("topGainers",topGainers);
      console.log("topLosers",topLosers);
       console.log("topLosers",topLosers);
      console.log("mostActivelyTraded", mostActivelyTraded);

    }catch (error) {
      console.error('Error fetching price data:', error);
    }
  }
  fetchData()
},[])



useEffect(() => {
  const container = containerRef.current;

  const scroll = () => {
    if (container && isScrolling) {
      container.scrollLeft += 2; // Vitesse de défilement
    }
  };

  const interval = setInterval(scroll, 50); // Intervalle de temps entre chaque défilement

  return () => clearInterval(interval);
}, [isScrolling]);

  const handleScrollStart = () => {
    setIsScrolling(false);
  };

  const handleScrollEnd = () => {
    setIsScrolling(true);
  };

  return (
    <DashboardLayout>
      <div className="background">
        <Grid item xs={12} md={5} lg={4} display="flex" gap="1px" >
          <MDBox  bgColor="rgb(207, 202, 111)" coloredShadow="info" mb={3} className="marketsCard">
            <h6>AAPL</h6>
            <p>Apple</p>
            <img src={AAPL} alt="AAPL Image" className='MarketImg' />
          </MDBox>

          <MDBox bgColor="rgb(220, 221, 221)"  coloredShadow="primary" mb={3}  className="marketsCard" >
            <Grid>
          <h6>IBM</h6> 
          <p>IBM</p>
          </Grid>
          <Grid>
          <img src ={IBM} className="MarketImg"/>
          </Grid>
          </MDBox>


          <MDBox  coloredShadow="primary" mb={2} className="marketsCard"  bgColor="rgb(28, 155, 21)" >
           <h6>AMZN</h6>
           <p>Amazone</p> 
           <Grid>
          <img src ={AMZN} className="MarketImg"/>
          </Grid>
          </MDBox>


          <MDBox mb={2} className="marketsCard" bgColor="rgb(255, 149, 0)"  coloredShadow="info">
          <h6>MFST</h6> 
          <p>Microsoft</p> 
          <Grid>
          <img src ={MFST} className="MarketImg"/>
          </Grid>
          </MDBox> 
        </Grid>
        
        <Grid className="section">
          <h3>Top gainers</h3>
          <p>Discover the Top gainers impacting the stock market.</p>

          <Grid item xs={12} md={6} lg={4} display="flex" gap="1%" 
          className="scrollable-container"
          ref={containerRef}
          style={{ overflowX: "hidden", whiteSpace: "nowrap" }} 
          onMouseEnter={handleScrollStart}
          onMouseLeave={handleScrollEnd}
          onTouchStart={handleScrollStart}
          onTouchEnd={handleScrollEnd}
          >
          {topGainers.slice(0, 10).map((item,index) => (
        <MDBox key={index}  mb={3} className="marketsCardSection2" style={{color:"white"}} bgColor="secondary">       
            <h6>{item.ticker} </h6>
            <div className="amount">
                <p><span>${item.price}</span> </p>
                <p>{item.change_amount}</p>                
            </div>      
    </MDBox>
))}
        </Grid>
        </Grid>

        <Grid className="section"  >
          <h3>Market Analyse</h3>
          <p>On the basis of recognition from top analysts.</p>
          <Table className='tableHeader'>
          <thead >
            <tr>
            <th>Ticker</th>
            <th>Actual price</th>
            <th>Change Amount</th>
            <th>Change Percentage</th>
            <th>ACTIONS</th>
            </tr>
          </thead>
         
            <tbody>
            {topGainers.slice(0, 6).map((item,index) => (
            <tr key={index}>
             <td>{item.ticker}</td>
             <td>{item.price}</td>
             <td>{item.change_amount}</td>
             <td>{item.change_percentage}</td>
             <td> <MDButton className="btnMarket">Invest</MDButton></td>
           </tr>
))}
      
            </tbody>
          </Table>
          
        </Grid>

        <Grid className="section">
          <h3>Top Losers</h3>
          <p>Discover the Top Losers in the stock market.</p>

          <Grid item xs={12} md={6} lg={4} display="flex" gap="1%">
          {topLosers.slice(0, 6).map((item,index) => (
        <MDBox key={index}  mb={3} className="marketsCardSection2" style={{color:"white"}}>       
            <h6>{item.ticker} </h6>
            <div className="amount">
                <p><span>${item.price}</span> </p>
                <p>{item.change_amount}</p>                
            </div>
        
    </MDBox>
))}
        </Grid>
        </Grid>

        </div>
        </DashboardLayout>
  );
};

export default Markets;
