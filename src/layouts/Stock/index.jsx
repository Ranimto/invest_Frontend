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
import MAVChart from './MAVChart';
import PayPal from 'layouts/payPal/payPal';
import ReplyIcon from '@mui/icons-material/Reply';
import { useDispatch, useSelector } from 'react-redux';
import { updatePrice } from '../../authRedux/Features/auth/stock'; // update action
import ComponentNavbar from 'examples/Navbars/ComponentNavbar';
import { onFirebaseMessageListener } from "../../firebaseinit";
import ReactNotificationComponent from 'layouts/Notifications/ReactNotifications';


  const Stock = () => {
  const {company}=useParams();
  const [checkout, setCheckout] = useState(false); 
  const [SMAChart, setSMAChart] = useState(false); 


// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo     
const [priceData, setPriceData] =useState(
  []
)
/***  */

const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [data, setData] = useState([])
  const [investments, setInvestments] = useState([]) 
  const [investmentsById, setInvestmentsById] = useState([])
  const [stockData, setStockData] = useState([]);
  const [analyticData, setAnalyticData] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(company);
  const [symbols, setSymbols] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);
  const [stockActualPrice, setStockActualPrice] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const totalPrice= 6500.0
  const [user,setUser]=useState({})
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [notificationShown, setNotificationShown] = useState(true); 
  const token =useSelector((state)=>state.auth.value.token);
  const notification = {
    title: 'New notification',
    body: 'A positive change for the company ',
  };

  const [formData,setFormData]=useState({
    userId: user.id,
    companyName:"",
    type: "STOCK",
    numberOfStock: 1,
    investmentAmount: 0,
    stockActualPrice:stockActualPrice,
    startDate: new Date(),
    duration: "",
    status: "IN_PROGRESS",  
  })
  const [sellFormData,setSellFormData]=useState({
    companyName:"",
    numberOfStock: 1,
    fromAccountNo: "",
    amount: 0,
    stockActualPrice:stockActualPrice   
  })
  const email=useSelector((state)=> state.auth.value.email);
  const currentDate = new Date(); // Create a new Date object
  const year = currentDate.getFullYear(); // Extract the year
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Extract the month (adding 1 because month is zero-based)
  const day = String(currentDate.getDate()).padStart(2, '0'); // Extract the day
  const formattedDate = `${year}-${month-1}-${day}`;

  const fetchUserByEmail= async(email)=>{
    const response=axios.get(`http://localhost:8023/user/findByEmail/${email}`,{
      headers: {
          'Authorization': `Bearer ${token}` 
      }
  })
    setUser((await response).data);  
    setFormData({ ...formData, userId:(await response).data.id });
  }

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

  const handleSellInputChange = (event) => {
    const { name, value } = event.target;
    setSellFormData({
      ...sellFormData,
      [name]: value
    });
  }

  const handleCancelClick = () => {
    setShowForm(false); 
    setCheckout(false);
  };

  useEffect(() => {
    const fetchData = async (symbol) => {
      try {
        // Fetch stock data
        const stockResponse = await axios.get(`http://localhost:8023/stockData/fetch/${symbol}`,{
          headers: {
              'Authorization': `Bearer ${token}` 
          }
      });
        console.log("Stock data response:", stockResponse.data);
  
        if (stockResponse.data && stockResponse.data['Time Series (5min)']) {
          const timeSeriesData = stockResponse.data['Time Series (5min)'];
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
          console.error('Time Series (5min) data not found in stock response:', stockResponse.data);
        }
  
        // Fetch analytic data
        const analyticResponse = await axios.get(`http://localhost:8023/stockData/running_analytics?SYMBOLS=AAPL,IBM,TLSA,AMZN&RANGE=2month&INTERVAL=DAILY&OHLC=close&WINDOW_SIZE=20&CALCULATIONS=STDDEV&apikey=7B2VWMKU9SVM59DQ`,
        
        {
          headers: {
              'Authorization': `Bearer ${token}` 
          }
      });
  
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
  }, [selectedSymbol]); //company

  //dispatch of the Stock Actual Price

  const handlePriceClick = (symbol, price) => {
    setSelectedSymbol(symbol);
    setStockActualPrice(price);
    dispatch(updatePrice(price));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFormData = {
        ...formData,
        companyName: selectedSymbol,
        stockActualPrice: stockActualPrice,
        investmentAmount: formData.numberOfStock * stockActualPrice,
      };
  
      const url = "http://localhost:8023/investment/add";
  
      const response = await axios.post(url, newFormData);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);

      console.log("newFormData",newFormData)
  
      setInvestments([...investments, response.data]);
  
      const investmentDescription = `Adding new investment in the ${newFormData.companyName} company`;
      await axios.post('http://localhost:8023/user-activity/save', {
        userId: newFormData.userId,
        timestamp: new Date(),
        description: investmentDescription,
      },
      {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
  
      setFormData({
        userId:user.id,
        companyName:selectedSymbol,
        type:"STOCK",
        investmentAmount:0,
        numberOfStock:1,
        stockActualPrice:stockActualPrice,
        startDate:"",
        duration:"",
        status: "IN_PROGRESS", 
          
      });
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      setErrorMessage(error.response.data.message);
    }
  };
  
  const handleSellSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFormData = {
        ...sellFormData,
        companyName: selectedSymbol,
        stockActualPrice: stockActualPrice,
        amount: sellFormData.numberOfStock * stockActualPrice,
      };
      console.log("sellFormData",sellFormData)
      console.log("newFormData",newFormData)

      const SellFormRequest = {
        fromAccountNo:newFormData.fromAccountNo,
        amount: newFormData.amount,
      };

      console.log("newFormData",newFormData)
      console.log("SellFormRequest",SellFormRequest)

      const url = `http://localhost:8023/transaction/addSellTransaction/108/${newFormData.companyName}/${newFormData.numberOfStock}`;
      const response = await axios.post(url, SellFormRequest,{
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);

  
      const sellDescription = `Sell ${newFormData.numberOfStock} stocks in the ${newFormData.companyName} company to ${newFormData.fromAccountNo}`;
      await axios.post('http://localhost:8023/user-activity/save', {
        userId: user.id,
        timestamp: new Date(),
        description: sellDescription,
      },
      {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });

      setSellFormData({
        companyName:"",
        numberOfStock: 1,
        fromAccountNo: "",
        amount: 0,
        stockActualPrice:stockActualPrice   
      });
    
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      setErrorMessage(error.response.data.message);
    }
  };


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8023/stockData/changePriceData?symbols=IBM,AAPL,MFST,GOOGL,AMZN,TSLA,XOM,JPM,JNJ`,
        {
          headers: {
              'Authorization': `Bearer ${token}` 
          }
      }
      );
        setPriceData(response.data);
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };
  
    const fetchAnalyticData = async () => {
      try {
        const response = await axios.get(`http://localhost:8023/stockData/runningAnalyticsData?symbols=AAPL,MSFT,IBM,AMZN,GOOGL`,{
          headers: {
              'Authorization': `Bearer ${token}` 
          }
      }
      );
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

useEffect(() => {
  fetchUserByEmail(email);
}, [email]);

onFirebaseMessageListener()
    .then((payload) => {

     setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
.catch((err) => console.log("failed: ", err));


useEffect(() => {
  if (notificationShown)
     { if (user.id)
        handleShowNotification(user.idnotificationShown);}
}, [user.id, notificationShown] );

const handleShowNotification =async (id,notificationShown) => {

  const investmentsById= await getAllInvetsments(id)
 
    for (let data of priceData) {
    console.log('data', data);
    for (let investment of investmentsById) {
      console.log('investment', investment);
      console.log('testt ', data["Global Quote"]["01. symbol"] === investment.companyName && data["Global Quote"]["01. change"] > 0);

      if (data["Global Quote"]["01. symbol"] === investment.companyName && data["Global Quote"]["01. change"] > 0) {
        if (notificationShown) {
          setNotificationShown(false);
          setShow(true);
        }
        return;
      }
    }
  }
};

const getAllInvetsments= async(id)=>{
  try {
    const url = `http://localhost:8023/investment/getInvest/108`;
    const response = await axios.get(url,{
      headers: {
          'Authorization': `Bearer ${token}` 
      }
  });
    setInvestmentsById(response.data);
    return investments
  } catch (error) {
      setError(error.response.data.message); 
      return 'not disponible' 
  } 
}



  return (
    <PageLayout>
    <Grid container spacing={2} className="containerGridd" >
    <ComponentNavbar/>
{/* Left section */}
<Grid item xs={12} sm={4} className="leftContainerr" style={{paddingTop:"6%"}}  >
      <h5 >Company Fluctuations</h5>  
          <Card className="gridCardd" >
            <CardContent className='tableClass'>
              <table  >
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
          <td onClick={() => handleCompanyClick(item["Global Quote"]["01. symbol"])} style={{ color : item["Global Quote"]["09. change"]>=0 ? "#69b609" : "#f50e0e" , fontWeight:"100"}}>
            {item["Global Quote"]["09. change"]}
          </td>
          <td onClick={() => handleCompanyClick(item["Global Quote"]["01. symbol"])} style={{ color : item["Global Quote"]["10. change percent"]>=0 ? "#69b609" : "#f50e0e"  , fontWeight:"100"}}>
            {item["Global Quote"]["10. change percent"]}
          </td>
          <td>
          <Button variant="contained" type="submit" className='btnSellStock' style={{ backgroundColor:"blueviolet"}} onClick={()=>{setShowSellForm(true); handlePriceClick(item["Global Quote"]["01. symbol"], item["Global Quote"]["05. price"])}}>Sell</Button>
          </td>
          <td>
          <Button variant="contained" type="submit" className='btnStock' onClick={()=>{setShowForm(true); handlePriceClick(item["Global Quote"]["01. symbol"], item["Global Quote"]["05. price"])}}>Buy</Button>
          </td>         
        </tr>
      ))}
    </tbody>
      </table>     
            </CardContent>
          </Card> 
      </Grid>
{/* right section */}

      <Grid item xs={8} className="rightContainerr"  style={{paddingTop:"6%"}}>
       <Grid container spacing={1}>     
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

  { showSellForm &&
<Modal open={showSellForm} >
        <div className="modalContent"  >
        <div >
          <form  className='stockSellForm' style={{ height: '100px'}}  >
          <p style={{color:"rgba(0, 0, 0, 0.911)", fontSize:"14px" ,paddingBottom:"5%"}}>Make your first step and  <strong style={{color:'blueviolet'}}>SELL</strong> a stock</p>
            
          <TextField  name="fromAccountNo" 
            label="to Account Number" 
            variant="outlined"
            type="number" 
            fullWidth  
            value={sellFormData.fromAccountNo}  
            onChange={handleSellInputChange} 
            margin="normal"
            required /> 

            <TextField  name="companyName" 
            label="Company Name" 
            variant="outlined" 
            fullWidth  
            value={selectedSymbol}  
            onChange={handleSellInputChange} 
            margin="normal"
            required />  

           <TextField 
           name="numberOfStock" 
           label="number Of Stocks" 
           variant="outlined" 
            fullWidth 
            type="number"
            value={sellFormData.numberOfStock} 
            onChange={handleSellInputChange}
            margin="normal"
            required />

           <TextField name="stockActualPrice" 
           label="Stock Actual Price" 
           variant="outlined" 
            fullWidth 
            value={stockActualPrice} 
            onChange={handleSellInputChange}
            margin="normal"
            required />

            <TextField 
           name="amount" 
           label="Sell Amount" 
           variant="outlined" 
           fullWidth 
           type="text"
           value={sellFormData.numberOfStock * stockActualPrice} 
           onChange={handleSellInputChange}
           margin="normal"
           required />
      
           <div className="checkoutClass" display='grid'>            
           <Button variant="contained" type="submit" className='btnRecommandation' style={{backgroundColor:'red'}} onClick={handleSellSubmit}>Sell a stock</Button> 
           {showSuccessMessage &&  (<p style={{marginTop:"-2%", fontWeight:"100" ,color:"black" ,width:"100%"}}>Your sell transaction has been completed <strong style={{color:"green"}}>Successfully !</strong></p>)}
             { error && (<p style={{marginTop:"-2%", fontWeight:"100", color:"black",width:"100%"}}> <strong style={{color:"red"}}>Failed</strong> to add sell transaction ! <strong>{errorMessage} !</strong> </p>)}        
           <Link to="/stock/AAPL" onClick={()=>{setShowSellForm(false)}} className='back' > <ReplyIcon/> Back to stock</Link>
           </div>     
          </form>
          </div> 
        </div>
      </Modal>
}

{ showForm &&
<Modal open={showForm} >
        <div className="modalContent" >
        <div style={{ maxHeight: '680px', overflowY: 'auto' }}>
          <form  className='stockForm' style={{ height: checkout ? "43rem" : "35rem" }}>
          <p style={{color:"rgba(0, 0, 0, 0.911)", fontSize:"14px" ,paddingBottom:"3%"}}> Make your first step and <strong style={{color:'blueviolet'}}>BUY</strong> a stock</p>
           
            <TextField  name="companyName" 
            label="Company Name" 
            variant="outlined" 
            fullWidth  value={selectedSymbol}  
            onChange={handleSellInputChange} 
            margin="normal"
            required />  

          <TextField 
           name="numberOfStock" 
           label="number Of Stocks" 
           variant="outlined" 
           fullWidth 
           type="number"
           value={formData.numberOfStock} 
           onChange={handleInputChange}
           margin="normal"
           required />

           <TextField 
           name="investment Amount" 
           label="investmentAmount" 
           variant="outlined" 
           fullWidth 
           type="number"
           value={formData.numberOfStock * stockActualPrice} 
           onChange={handleInputChange}
           margin="normal"
           required />  

          <TextField name="stock Actual Price" 
           label="Stock Actual Price" 
           variant="outlined" 
            fullWidth 
            value={stockActualPrice} 
            onChange={handleInputChange}
            margin="normal"
            required />

                <TextField
                  label="Duration ( In Months )"
                  variant="outlined"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  type="number"
                  fullWidth
                  margin="normal"
                  required />
       

           <div className="formFooter">
           <div className="checkoutClass" display='grid'>
            {checkout ? 
            (<PayPal totalPrice={totalPrice} nameProgram="investAI"/>) :
            (<Button variant="contained" type="submit" className='btnRecommandation'  onClick={()=>{setCheckout(true);}}>Checkout with PayPal</Button>)
            }
           <Button variant="contained" type="submit" className='btnCheckout'  onClick={handleSubmit}>Checkout</Button>
             {showSuccessMessage &&  (<p style={{marginTop:"-2%", fontWeight:"100" ,color:"black" ,width:"100%"}}>Your Investment has been added <strong style={{color:"green"}}>Successfully !</strong></p>)}
             { error && (<p style={{marginTop:"-2%", fontWeight:"100", color:"black",width:"100%"}}> <strong style={{color:"red"}}>Failed</strong> to add Investment ! <strong>{errorMessage} !</strong> </p>)}
           </div>
           <Link to="/stock/AAPL" onClick={handleCancelClick} className='back'> <ReplyIcon/> Back to stock</Link>
           </div>     
          </form>
          </div> 
        </div>
      </Modal>
}

<Grid display="flex" >
<Grid display="flex" style={{flexDirection:"column"}} className="downLeftContainer">
        <Card className="downCardd" style={{}}  >
          <CardContent >
          <Grid item xs={12} sm={12} >
           <div className="stockText"  style={{paddingLeft:'22%'}}>Trade overview</div>
           <div className="txt2" style={{paddingLeft:'27%'}}>78,2333.00</div>
           </Grid>
           <Grid container spacing={3}>
           <Grid item xs={12} sm={6}>
           <div className="grp">
             <img src={earnings} />
             <div className="txt1">earnings</div>
             <div className="txt2">700.008.99</div>
           </div>
           </Grid>
           <Grid item xs={12} sm={6}>
           <div className="grp">
           <img src={losses} style={{}}/>
             <div className="txt1">Losses</div>
             <div className="txt2">40.008.99</div>
           </div>
           </Grid>
           </Grid>
          </CardContent>
        </Card>
   
          <Card className="downCardd" style={{}}>
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
                      <td onClick={() => handleCompanyClick(item)} style={{ color: analyticData.payload.RETURNS_CALCULATIONS.MEAN[item] >= 0 ? "#69b609" : "#f50e0e" , fontWeight:"100" }} >
                        { analyticData.payload.RETURNS_CALCULATIONS.MEAN[item].toFixed(6)}</td>
                      <td onClick={() => handleCompanyClick(item)} style={{ color: analyticData.payload.RETURNS_CALCULATIONS.STDDEV[item] >= 0 ? "#69b609" : "#f50e0e" , fontWeight:"100" }}>
                        { analyticData.payload.RETURNS_CALCULATIONS.STDDEV[item].toFixed(6)}</td>
                      <td>{ analyticData.meta_data.max_dt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
         
 </Grid>
      <Grid  className="downRightContainer">
      <Card className="gridCard">
          <h2 className='symbol'>{selectedSymbol}</h2>
          <table className='tableClass' >
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
      </Card>
    </Grid>
    </Grid>
    </Grid> 
   
    {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
   

    </PageLayout>
  );
};

Stock.propTypes = {
  company: PropTypes.string
};

export default Stock;
