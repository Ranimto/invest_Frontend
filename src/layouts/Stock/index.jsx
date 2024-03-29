import React, { useEffect, useRef, useState } from 'react';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import './stock.css';
import { Button, Card, CardContent, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import losses from 'assets/images/losses.webp'
import earnings from 'assets/images/earnings.png'
import axios from 'axios';
import ReverseExampleNoSnap from './chart';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

const Stock = () => {
  const {company}=useParams();
   

  const [data, setData] = useState([
    { company: 'IBM', buy: 415.15, sell: 482.5, change: -0.52 },
    { company: 'AAPL', buy: 554, sell: 595, change: 1.35 },
    { company: 'MSFT', buy: 415.15, sell: 482.5, change: -0.26 },
    { company: 'AMZN', buy: 415.15, sell: 482.5, change: -0.52 },
    { company: 'GOOGL', buy: 554, sell: 595, change: 1.35 },
    { company: 'FB', buy: 415.15, sell: 482.5, change: -0.26 },
    { company: 'JNJ', buy: 415.15, sell: 482.5, change: -0.52 },
    { company: 'TSLA', buy: 554, sell: 595, change: 1.35 },
    { company: 'JPM', buy: 415.15, sell: 482.5, change: -0.26 },
    { company: 'V', buy: 415.15, sell: 482.5, change: -0.52 },
    { company: 'WMT', buy: 554, sell: 595, change: 1.35 },
    { company: 'XOM', buy: 415.15, sell: 482.5, change: -0.26 },
    { company: 'BAC', buy: 554, sell: 595, change: 1.35 },
 
  
   
 
  ])
  const [stockData, setStockData] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(company);
  const [showForm, setShowForm] = useState(false);
  const [formData,setFormData]=useState({
    companyName:'',
    number:'',
    amount:'',
    currency:'',
  })

  useEffect(() => {
    const fetchData = async (symbol) => {
      try {
 const response = await axios.get(`http://localhost:8023/stockData/fetch/${symbol}`);
 console.log ("SYMBOL",symbol);
  
       
        if (response.data && response.data['Time Series (5min)']) {
          const timeSeriesData = response.data['Time Series (5min)'];
          const stockEntries = Object.entries(timeSeriesData).slice(0, 6).map(([date, values]) => ({
            date,
            low: values['3. low'],
            high: values['2. high'],
            open: values['1. open'],
            close: values['4. close'],
            volume: values['5. volume'],
          }));
  
          setStockData(stockEntries);
        } else {
          console.error('Time Series (5min) data not found in response:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData(selectedSymbol);
    
   
  }, [selectedSymbol, company]);

  const handleCompanyClick = (symbol) => {
    setSelectedSymbol(symbol);
    setShowForm(true);
  };
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      currecny: value === formData.currency 
    });
  };

  const handleCancelClick = () => {
    setShowForm(false); 
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

      <Grid item xs={12} sm={showForm ? 3 : 4}>
          <Card className="gridCardd">
            <CardContent>
              <table className='tableClass'>
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

      <Grid item xs={12} sm={showForm ? 6 : 8}>

       <Grid container spacing={1}>
         
        <Grid item xs={12}>
        <Link to={'/dashboard'} className='backToDash'>Back to dashboard</Link>
        <Card className="gridCardd">
        <CardContent className='navbar'>

          {data.filter(item => item.company === selectedSymbol) .map((item, index) => (
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
        <Grid item xs={12} >
            <Card className="Cardd" >
              <CardContent className='navbar'>
              <ReverseExampleNoSnap selectedSymbol={selectedSymbol} />              
              </CardContent>             
            </Card>           
        </Grid>
    </Grid>  
  </Grid>

  {showForm &&
       
       (   
        <Grid item xs={12} sm={3} >
       <form className='formClass'>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField  name="CompanyName" label="CompanyName" variant="outlined" fullWidth  value={selectedSymbol}  onChange={handleInputChange}  />
          </Grid>
          <Grid item xs={6}>
            <TextField name="number" label="number" variant="outlined" fullWidth   value={formData.number}  onChange={handleInputChange}  />
          </Grid> 
          <Grid item xs={6}>
            <TextField name="amount" label="amount" variant="outlined" fullWidth value={formData.amount} onChange={handleInputChange}  />
          </Grid> 
             
          <Grid item xs={6}>
            <Select labelId="active-label" variant="outlined" fullWidth style={{ height:'43px' }} value={formData.currency} onChange={handleSelectChange} >
            <MenuItem value="EURO">EURO</MenuItem>
            <MenuItem value="TND">TND</MenuItem>
            <MenuItem value="DOLLAR">DOLLAR</MenuItem>
           </Select>
          </Grid>
          <Grid item className='gridbtn' xs={12}>
            <Button variant="contained" type="submit" className='buy' style={{backgroundColor:'rgb(22, 1, 41)' ,color:'white', width:'10%'}}>BUY </Button>
            <Button variant="contained" type="submit"  className='cancel'  style={{backgroundColor:'rgb(127, 9, 9)' ,color:'white'}} onClick={handleCancelClick}>NOT NOW </Button>
          </Grid>
        </Grid> 
      </form>
      </Grid>
      )
      }
  
      <Grid item xs={12} sm={3} >
        <Card className="gridCardd" style={{paddingLeft:'14%',height:'97%',paddingTop:'25%'}}  >
          <CardContent >
          <Grid item xs={12} sm={12}  style={{paddingLeft:'21%' ,paddingBottom:'10%'}}>
           <div className="text">Trade overview</div>
           <div className="txt2" style={{paddingLeft:'7%'}}>78,2333.00</div>
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

      <Grid item xs={12} sm={showForm ? 6 : 9} >
      <Card className="gridCardd">
        <CardContent>
          <h2 className='symbol'>{selectedSymbol}</h2>
          <table className='tableClass'>
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

Stock.propTypes = {
  company: PropTypes.string.isRequired
};

export default Stock;
