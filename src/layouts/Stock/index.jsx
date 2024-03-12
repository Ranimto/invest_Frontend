import React, { useEffect, useRef, useState } from 'react';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import DefaultNavbar from 'examples/Navbars/DefaultNavbar';
import './stock.css';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import losses from 'assets/images/losses.webp'
import earnings from 'assets/images/earnings.png'
import axios from 'axios';
import MixedChart from 'examples/Charts/MixedChart';
import ReverseExampleNoSnap from './chart';

const Stock = () => {
  const [data, setData] = useState([
    { company: 'IBM', buy: 415.15, sell: 482.5, change: -0.52 },
    { company: 'AAPL', buy: 554, sell: 595, change: 1.35 },
    { company: 'RFY', buy: 415.15, sell: 482.5, change: -0.26 },
    { company: 'HVGD', buy: 415.15, sell: 482.5, change: -0.52 },
    { company: 'DADAL', buy: 554, sell: 595, change: 1.35 },
    { company: 'RFDADY', buy: 415.15, sell: 482.5, change: -0.26 },
    { company: 'IBFDAM', buy: 415.15, sell: 482.5, change: -0.52 },
    { company: 'AAAADAPL', buy: 554, sell: 595, change: 1.35 },
    { company: 'RFDAY', buy: 415.15, sell: 482.5, change: -0.26 },
    { company: 'IDABM', buy: 415.15, sell: 482.5, change: -0.52 },
    { company: 'ADAAPL', buy: 554, sell: 595, change: 1.35 },
    { company: 'RDDFY', buy: 415.15, sell: 482.5, change: -0.26 },
    { company: 'IBDM', buy: 415.15, sell: 482.5, change: -0.52 },
    { company: 'ADAPL', buy: 554, sell: 595, change: 1.35 },
    { company: 'RAFY', buy: 415.15, sell: 482.5, change: -0.26 },
    { company: 'IBSM', buy: 415.15, sell: 482.5, change: -0.52 },
    { company: 'AADFAPL', buy: 554, sell: 595, change: 1.35 },
 
  ])
  const [stockData, setStockData] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('');


  useEffect(() => {
    const fetchData = async (symbol) => {
      try {
        const response = await axios.get(
         ` https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=7B2VWMKU9SVM59DQ`
        );
  
       
        if (response.data && response.data['Time Series (Daily)']) {
          const timeSeriesData = response.data['Time Series (Daily)'];
          const stockEntries = Object.entries(timeSeriesData).slice(0, 10).map(([date, values]) => ({
            date,
            low: values['3. low'],
            high: values['2. high'],
            open: values['1. open'],
            close: values['4. close'],
            volume: values['5. volume'],
          }));
  
          setStockData(stockEntries);
        } else {
          console.error('Time Series (Daily) data not found in response:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
  
    fetchData(selectedSymbol);
   
  }, [selectedSymbol]);

  const handleCompanyClick = (symbol) => {
    setSelectedSymbol(symbol);
    console.log(symbol)
  };
 

/*   const handleCellChange = (index, key, newValue) => {
    setData(prevData => {
      const newData = [...prevData];
      new Data[index][key] = newValue;
      return newData;
    });
  }; */
 
/*   useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('your_backend_api_url');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []); */




  return (
    <PageLayout>
    
      <Grid container spacing={2} className="containerGridd" >

      <Grid item xs={12} sm={4}>
          <Card className="gridCardd">
            <CardContent>
              <table>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Buy</th>
                    <th>Sell</th>
                    <th>Change %</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                  
                        <td
                        onClick={() => handleCompanyClick(item.company)}
                        className={selectedSymbol === item.company ? 'selected' : ''}
                      > {item.company}</td>
                      <td onClick={() => handleCompanyClick(item.company)}>{item.buy}</td>
                      <td onClick={() => handleCompanyClick(item.company)}>{item.sell}</td>
                      <td
                        className="change-cell"
                        style={{
                          color: item.change > 0 ? 'green' : 'red'
                        }}
                      >
                        {item.change}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Grid container spacing={3}>
         
        <Grid item xs={12}>
        <Card className="gridCardd">
        <CardContent className='navbar'>
          {data
            .filter(item => item.company === selectedSymbol) 
            .map((item, index) => (
              <Grid container spacing={3} key={index}>
                <Grid item xs={12} sm={2}>
                  <div className="title">Company</div>
                  <div className="text">{item.company}</div> 
                </Grid>
                <Grid item xs={12} sm={2}>
                  <div className="title">Price</div>
                  <div className="text">584{item.price}</div>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <div className="title">Change</div>
                  <div className="text"> {item.change}%</div> 
                </Grid>
                <Grid item xs={12} sm={2}>
                  <div className="title">24h Volume</div>
                  <div className="text">544{item.volume}</div> 
                </Grid>
                <Grid item xs={12} sm={2}>
                  <div className="title">24h High</div>
                  <div className="text">4545{item.high}</div>
                </Grid>
              </Grid>
            ))}
        </CardContent>
      </Card>
      </Grid>
          <Grid item xs={12}>
            <Card className="gridCardd">
              <CardContent className='navbar'>
              <ReverseExampleNoSnap />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Card className="gridCardd" style={{paddingLeft:'18%'}} >
          <CardContent >
          <Grid item xs={12} sm={12}  style={{paddingLeft:'13%' ,paddingBottom:'15%'}}>
           <div className="text">Trade overview</div>
           <div className="txt2" style={{paddingLeft:'8%'}}>78,2333.00</div>
           </Grid>
           <Grid container spacing={3}>
           <Grid item xs={12} sm={6}>
           <div className="grp">
             <img src={earnings} style={{width:'45%'}}/>
             <div className="txt1">earnings</div>
             <div className="txt2">700.008.99</div>
           </div>
           </Grid>
           <Grid item xs={12} sm={6}>
           <div className="grp">
           <img src={losses} style={{width:'45%'}}/>
             <div className="txt1">Losses</div>
             <div className="txt2">40.008.99</div>
           </div>
           </Grid>
           </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={9}>
      <Card className="gridCardd">
        <CardContent>
          <h2 className='symbol'>{selectedSymbol}</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Low</th>
                <th>High</th>
                <th>Open</th>
                <th>Close</th>
                <th>Volume</th>
            
              </tr>
            </thead>
            <tbody>
              {stockData.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.date}</td>
                  <td>{stock.low} TND</td>
                  <td>{stock.high} TND</td>
                  <td>{stock.open} TND</td>
                  <td>{stock.close} TND</td>
                  <td>{stock.volume}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </Grid>

    </Grid>
    </PageLayout>
  );
};

export default Stock;
