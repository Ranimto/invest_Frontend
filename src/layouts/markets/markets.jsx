import React, { useEffect, useRef, useState } from 'react';
import { Grid, Table } from '@mui/material';
import './style.css';
import MDButton from 'components/MDButton';
import AAPL from 'assets/images/AAPL.png'
import AMZN from 'assets/images/AMZN.png'
import MFST from 'assets/images/MFST.png'
import IBM from 'assets/images/IBM.png'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import axios from 'axios';
import CompanyCard from 'examples/Cards/CompanyCard';
import { motion } from 'framer-motion';

const Markets = () => {

const [topGainers,setTopGainers]=useState([])
const [topLosers,setTopLosers]=useState([])
const [response,setResponse]=useState({})
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
      setResponse(response.data)
       
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
      <>
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 1.5,
      delay: 0.5,
    
    }}
  >
    <Grid item xs={12} md={5} lg={4} display="flex" gap="1px">
      <Grid display="flex" gap="2%">
        <CompanyCard color="warning" image={AAPL} name="AAPL" />
        <CompanyCard color="dark" image={IBM} name="IBM" />
        <CompanyCard color="success" image={AMZN} name="AMZN" />
        <CompanyCard color="secondary" image={MFST} name="MFST" />
      </Grid>
    </Grid>
  </motion.div>

  <Grid className="sectionn">
    <h3>Top gainers</h3>
    {/* Other content here */}
  </Grid>
</>
        
        <Grid className="sectionn">
          <h3>Top gainers</h3>
          <p>Discover the Top gainers impacting the stock market.</p>
          <h6>Unlock the pulse of the market by exploring the top gainers impacting the stock market at the <strong>{response.last_updated}</strong>. explore the forces shaping market trends, and empower yourself to make informed investment decisions in an ever-changing financial landscape.</h6>
          <p></p>
          <Grid item xs={12} md={6} lg={4} display="flex" gap="1%"   
          className="scrollable-container"
          ref={containerRef}
          style={{ overflowX: "hidden", whiteSpace: "nowrap" }} 
          onMouseEnter={handleScrollStart}
          onMouseLeave={handleScrollEnd}
          onTouchStart={handleScrollStart}
          onTouchEnd={handleScrollEnd}
          >
          {topGainers.slice(0, 7).map((item,index) => (
          <CompanyCard  key={index}  color="info"  name={item.ticker} amount={item.price} changeAmount={item.change_amount} />
))}
        </Grid>
        </Grid>

        <Grid className="sectionn"  >
          <h3>Market Analyse</h3>
          <p>On the basis of recognition from top analysts.</p>
          <p>{response.metadata}</p> 
          <h6>Discovering the most actively traded US tickers offers a window into the heartbeat of the market, revealing where the action is and where opportunities may lie. Dive into this data to uncover dynamic trends, gauge investor sentiment, and potentially uncover new investment prospects</h6>
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
            {topGainers.slice(0, 5).map((item,index) => (
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

        {/* <Grid className="sectionn">
          <h3>Top Losers</h3>
          <p>Discover the Top Losers in the stock market.</p>
          <h6>Delve into the market&apos;s fluctuations by uncovering the top losers in the stock market. Stay informed about the shifting dynamics as of the <strong>{response.last_updated}</strong>, 16:15:59 US/Eastern, and gain valuable insights to navigate market downturns with confidence</h6>
          <Grid item xs={12} md={6} lg={4} display="flex" gap="1%" 
          className="scrollable-container"
          ref={containerRef}
          style={{ overflowX: "hidden", whiteSpace: "nowrap" }} 
          onMouseEnter={handleScrollStart}
          onMouseLeave={handleScrollEnd}
          onTouchStart={handleScrollStart}
          onTouchEnd={handleScrollEnd}
          >
          {topLosers.slice(0, 7).map((item,index) => (
          <CompanyCard  key={index}  color="info"  name={item.ticker} amount={item.price} changeAmount={item.change_amount}/>

))}
        </Grid>
        </Grid> */}

        </div>
        </DashboardLayout>
  );
};

export default Markets;
