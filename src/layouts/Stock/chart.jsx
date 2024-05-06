import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import axios from 'axios';


const StockChart = ({ selectedSymbol }) => {

  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    const fetchData = async (symbol) => {
      try {
        const response = await axios.get(`http://localhost:8023/stockData/fetch/${symbol}`);
        console.log("SYMBOL", symbol);
        if (response.data && response.data['Time Series (5min)']) {
          const timeSeriesData = response.data['Time Series (5min)'];
          const stockEntries = Object.entries(timeSeriesData).slice(0, 80).map(([date, values]) => ({
            date,
            low: parseFloat(values['3. low']),
            high: parseFloat(values['2. high']),

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
  }, [selectedSymbol]);

  if (!stockData || stockData.length === 0) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: stockData.map(entry => entry.date),
    datasets: [
      {
        label: 'Low',
        data: stockData.map(entry => entry.low),
        borderColor: 'rgba(254, 212, 4, 0.662)',
        fill: false,

      },
      {
        label: 'High',
        data: stockData.map(entry => entry.high),
        borderColor: 'rgb(217, 195, 241)',
        fill: false
      }
    ]
  };


  const options = {
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6 ,
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
      <h2 style={{fontSize:"19px"}}>Stock Chart for {selectedSymbol}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

StockChart.propTypes = {
  selectedSymbol: PropTypes.string.isRequired
};

export default StockChart;
