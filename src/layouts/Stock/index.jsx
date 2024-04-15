import React, { useEffect, useRef, useState } from 'react';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import './stock.css';
import { Box, Button, Card, CardContent, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import losses from 'assets/images/losses.webp'
import earnings from 'assets/images/earnings.png'
import axios from 'axios';
import ReverseExampleNoSnap from './chart';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MAVChart from './MAVChart';
import PayPal from 'layouts/payPal/payPal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

  const Stock = () => {
  const {company}=useParams();
  const [checkout, setCheckout] = useState(false); 
  const [SMAChart, setSMAChart] = useState(false); 


// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo     
const [priceData, setPriceData] =useState(
  []
)
/***  */


  const [data, setData] = useState([])
  const [stockData, setStockData] = useState([]);
  const [analyticData, setAnalyticData] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(company);
  const [symbol, setSymbol] = useState(company);
  const [symbols, setSymbols] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const totalPrice= 6500.0
  const [formData,setFormData]=useState({
    companyName:'',
    number:'',
    amount:'',
    currency:'',
  })

  const currentDate = new Date(); // Create a new Date object
  const year = currentDate.getFullYear(); // Extract the year
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Extract the month (adding 1 because month is zero-based)
  const day = String(currentDate.getDate()).padStart(2, '0'); // Extract the day

  const formattedDate = `${year}-${month-1}-${day}`;

  
  const handleCompanyClick = (symbol) => {
    setSelectedSymbol(symbol);

  };

  const handleSwitchSMA = () => {
    setSMAChart(true);
  };
  const handleSwitchStock = () => {
    setSMAChart(false);
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
    setCheckout(false);
  };

  useEffect(() => {
    const fetchData = async (symbol) => {
      try {
        // Fetch stock data
        const stockResponse = await axios.get(`http://localhost:8023/stockData/fetch/${symbol}`);
        console.log("Stock data response:", stockResponse.data);
  
        if (stockResponse.data && stockResponse.data['Time Series (5min)']) {
          const timeSeriesData = stockResponse.data['Time Series (5min)'];
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
          console.error('Time Series (5min) data not found in stock response:', stockResponse.data);
        }
  
        // Fetch analytic data
        const analyticResponse = await axios.get(`https://alphavantageapi.co/timeseries/running_analytics?SYMBOLS=AAPL,IBM,TLSA,AMZN&RANGE=2month&INTERVAL=DAILY&OHLC=close&WINDOW_SIZE=20&CALCULATIONS=STDDEV&apikey=7B2VWMKU9SVM59DQ`);
        console.log("Analytics data response:", analyticResponse.data);
  
        const  list=["AAPL","IBM","TLSA","AMZN"]
        for (let  symbol in list){

        const payload = analyticResponse.data.payload.RETURNS_CALCULATIONS.MEAN.RUNNING_MEAN[symbol];
        const analyticEntries = [];
        console.log("payload:",payload);

        for (const [date, value] of Object.entries(payload)) {
          analyticEntries.push({ date, value });
        }
        console.log("analyticEntries i:",analyticEntries);
       // setAnalyticData(analyticEntries);
        console.log("Analytic i data:", analyticData);
      }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
  
    fetchData(selectedSymbol);
  }, [selectedSymbol, company]);
  
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8023/stockData/changePriceData?symbols=IBM,AAPL,MFST,GOOGL,AMZN,TSLA,XOM,JPM,JNJ`);
        setPriceData(response.data);
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };
    const fetchAnalyticData = async () => {
      try {
        const response = await axios.get(`http://localhost:8023/stockData/runningAnalyticsData?symbols=AAPL,MSFT,IBM,AMZN,GOOGL`);
        setAnalyticData(response.data);
        console.log("analyticData",response.data);
        console.log("analyticDataaa",analyticData);   
        setSymbols(response.data.meta_data.symbols.split(","));      
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchAnalyticData()
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []); 

  
  const addPaypalScript =() =>{
    const script = document.createElement("script");
    script.src =
   "https://www.paypal.com/sdk/js?client-id=AQ80EfhRfK0GpwWi1NFrdDwzFPn48J1hMc8BF7Gi2-oZusuicOEMcDoN2JdDgzmtyhUKSX-xB1ofsHpy&currency=CAD"
    script.type="text/javascript";
    script.async= true;
    document.body.appendChild(script);
}

useEffect(()=>{
  addPaypalScript() ;  
},[])

  return (
    <PageLayout>
    <Grid container spacing={2} className="containerGridd" >
     

      <Grid item xs={12} sm={4}>
      <h5 >Company Fluctuations:</h5>
          <Card className="gridCardd">
            <CardContent>
              <table className='tableClass'>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Price</th>
                    <th>change</th>
                    <th>change %</th>
                    
                    
                  </tr>
                </thead>
                <tbody>
      {priceData.map((item, index) => (
        <tr key={index}>
          <td
            onClick={() => handleCompanyClick(item["Global Quote"]["01. symbol"])}
            className={selectedSymbol === item["Global Quote"]["01. symbol"] ? 'selected' : ''}
          >
            {item["Global Quote"]["01. symbol"]}
          </td>
          <td onClick={() => handleCompanyClick(item["Global Quote"]["01. symbol"])}>
            {item["Global Quote"]["05. price"]}
          </td>
          <td onClick={() => handleCompanyClick(item["Global Quote"]["01. symbol"])} style={{ color : item["Global Quote"]["09. change"]>=0 ? "green" : "red"}}>
            {item["Global Quote"]["09. change"]}
          </td>
          <td onClick={() => handleCompanyClick(item["Global Quote"]["01. symbol"])} style={{ color : item["Global Quote"]["10. change percent"]>=0 ? "green" : "red"}}>
            {item["Global Quote"]["10. change percent"]}
          </td>
          <td>
          <Button variant="contained" type="submit" className='btnStock' onClick={()=>{setShowForm(true);}}>Buy</Button>
          </td>
        </tr>
      ))}
    </tbody>
              </table>
            </CardContent>
          </Card>
          
         
           <Grid>
          <h5 >Company Running Analytics :</h5>
          <Card className="gridCardd">
            <CardContent>
              <table className='tableClass'>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>MEAN</th>
                    <th>STDDEV</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {symbols.map((item, index) => (
                    <tr key={index}>
                  
                      <td
                        onClick={() => handleCompanyClick(item)}
                        className={selectedSymbol === item ? 'selected' : ''}
                      > {item}</td>
                      <td onClick={() => handleCompanyClick(item)} style={{ color: analyticData.payload.RETURNS_CALCULATIONS.MEAN[item] >= 0 ? 'green' : 'red' }} >
                        { analyticData.payload.RETURNS_CALCULATIONS.MEAN[item].toFixed(6)}</td>
                        {console.log("hello",analyticData.payload.RETURNS_CALCULATIONS.MEAN[item].toFixed(6))}
                      <td onClick={() => handleCompanyClick(item)} style={{ color: analyticData.payload.RETURNS_CALCULATIONS.STDDEV[item] >= 0 ? 'green' : 'red' }}>
                        { analyticData.payload.RETURNS_CALCULATIONS.STDDEV[item].toFixed(6)}</td>
                      <td>{ analyticData.meta_data.max_dt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          </Grid>
      </Grid>
      

      <Grid item xs={12} sm={8}>
       <Grid container spacing={1}>
         
        <Grid item xs={12} style={{paddingTop:"3%"}}>
        <Link to={'/dashboard'} className='backToDash'>Back to dashboard <NavigateNextIcon/></Link>
        <Card className="gridCardd">
        <CardContent className='navbar'>

          {data.filter(item => item.company === selectedSymbol) .map((item, index) => (
              <Grid container spacing={3} key={index}>
                <Grid item xs={12} sm={2}>
                  <div className="stockTitle ">Company</div>
                  <div className="stockText">{item.company}</div> 
                </Grid>
                <Grid item xs={12} sm={2}>
                  <div className="stockTitle ">Price</div>
                  <div className="stockText">584{item.price}</div>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <div className="stockTitle ">Mean</div>
                  <div className="stockText"> {item.Mean}%</div> 
                </Grid>
                <Grid item xs={12} sm={2}>
                  <div className="stockTitle ">24h Volume</div>
                  <div className="stockText">5464{item.volume}</div> 
                </Grid>
                <Grid item xs={12} sm={2}>
                  <div className="stockTitle ">24h High</div>
                  <div className="stockText">4545{item.high}</div>
                </Grid>
              </Grid>
            ))}
            
        </CardContent>
      </Card>

        </Grid>      
        <Grid item xs={12} className="chartClass">
          <div style={{display:"flex" , gap:"35%"}}>
        <div>
         <h6> <strong>Actual Date</strong>  {formattedDate} (NQ=F)</h6> 
         <h6> CME - CME Delayed Price. <strong>Currency</strong> in USD</h6>
        </div>
        <div>
          {priceData.filter(item => item["Global Quote"]["01. symbol"] === selectedSymbol).map((element,index)=>
          <h6 key={index}> <strong>{selectedSymbol}</strong>  {element["Global Quote"]["05. price"]}+ <strong>{element["Global Quote"]["09. change"]}({element["Global Quote"]["10. change percent"]}) </strong> </h6> )}
          <h6>  As of 05:40AM EDT. <strong>Market open.</strong> </h6>
        </div>
        </div>
         <div className="indicators">
          <Button className='option'><h5 onClick={handleSwitchSMA}>Simple Moving Average (SMA)</h5> </Button> 
          <Button className='option'><h5 onClick={handleSwitchStock}>Stock Chart (HIGH/LOW)</h5> </Button> 
         </div>
            <Card className="Cardd" >
              <CardContent className='navbar'>
                {!SMAChart ?
              (<ReverseExampleNoSnap selectedSymbol={selectedSymbol} /> ):
             (<MAVChart selectedSymbol={selectedSymbol}/> )
            }             
              </CardContent>             
            </Card>           
        </Grid>
    </Grid>  
  </Grid>

  { showForm &&
<Modal open={showForm} >
        <div className="modalContent">
         
          <form  className='stockForm' style={{ height: checkout ? "43rem" : "35rem" }}>
          <p>Make your first step and BUY a stock</p>
           
            <TextField  name="CompanyName" label="CompanyName" variant="outlined" fullWidth  value={selectedSymbol}  onChange={handleInputChange} 
              margin="normal"
              required />
          
          <TextField name="number" label="number" variant="outlined" fullWidth   value={formData.number}  onChange={handleInputChange} margin="normal"
              required />

          <TextField name="amount" label="amount" variant="outlined" fullWidth value={formData.amount} onChange={handleInputChange} margin="normal"
              required />

           <Select labelId="active-label" variant="outlined" fullWidth style={{ height:'43px' }} value={formData.currency} onChange={handleSelectChange} >
            <MenuItem value="EURO">EURO</MenuItem>
            <MenuItem value="TND">TND</MenuItem>
            <MenuItem value="DOLLAR">DOLLAR</MenuItem>
           </Select>

           <div className="formFooter">
     
            {checkout ? 
            (<PayPal totalPrice={totalPrice} nameProgram="investAI"/>) :
            (<Button variant="contained" type="submit" className='btnRecommandation'  onClick={()=>{setCheckout(true);}}>Checkout</Button>)
            }
           <Link to="/stock/AAPL" onClick={handleCancelClick} className='back'> <ArrowBackIcon/> Back to stock</Link>
           </div>     
          </form>
        </div>
      </Modal>
}





  
  
      <Grid item xs={12} sm={3} >
        <Card className="gridCardd" style={{paddingLeft:'14%',height:'97%',paddingTop:'25%'}}  >
          <CardContent >
          <Grid item xs={12} sm={12}  style={{paddingLeft:'21%' ,paddingBottom:'10%'}}>
           <div className="stockText">Trade overview</div>
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
