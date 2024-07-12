import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useSelector } from 'react-redux';


const StockPredictionChart = ({ selectedSymbol }) => {

  const [stockPedictionData, setStockPedictionData] = useState([]);
  const token=useSelector((state)=>state.auth.value.token)
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const body={
          company_Name: selectedSymbol
        }
        print("body",body)
        const response = await axios.post(`http://127.0.0.1:5011/predictStockData`, body,
        {
          headers: {
              'Authorization': `Bearer ${token}` 
          }
      });
        console.log('responsee',response.data)
        setStockPedictionData(response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchData();
  }, [selectedSymbol]);


  if (!stockPedictionData || stockPedictionData.length === 0) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: stockPedictionData.map(entry => entry.date),
    datasets: [
      {
        label: 'Low',
        data: stockPedictionData.map(entry => entry.predicted_low),
        borderColor: 'rgba(254, 212, 4, 0.662)',
        fill: false,

      },
      {
        label: 'High',
        data: stockPedictionData.map(entry => entry.predicted_high),
        borderColor: 'rgb(217, 195, 241)',
        fill: false
      }
    ]
  };


  const options = {
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
          color: 'white'
        }

      },
      y: {
        ticks: {
          maxTicksLimit: 15 ,
          color: 'white'
        }
        
      }
    }
  };

  return (
    <div style={{ width: '90%', height: '480px',color:'white' , paddingTop:'1%' , fontWeight:"100"}}>
      <h2 style={{fontSize:"19px"}}>Stock Prediction for {selectedSymbol} after 10 days</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

 StockPredictionChart.propTypes = {
  selectedSymbol: PropTypes.string.isRequired
}; 

export default StockPredictionChart;
