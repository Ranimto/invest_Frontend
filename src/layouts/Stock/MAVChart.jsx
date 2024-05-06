import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const MAVChart = ({ selectedSymbol }) => {
  const [stockIndicatorsData, setStockIndicatorsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8023/indicators/simpleMovingAverage?symbols=IBM,AAPL,MFST,GOOGL,AMZN,TSLA,XOM,JPM,JNJ`);
        setStockIndicatorsData(response.data);
        console.log("Updated IndicatorsData", response.data);
      } catch (error) {
        console.error('Error while extracting the data:', error);
      }
    };
    fetchData();
  }, []);

  if (!stockIndicatorsData || stockIndicatorsData.length === 0) {
    return <div>Loading...</div>;
  }
  
  // Filter SMA data for the selected symbol
  const symbolData = stockIndicatorsData.filter(item => item["Meta Data"]["1: Symbol"] === selectedSymbol);
  // Extract SMA data for the selected symbol
  const smaData = symbolData.length > 0 ? symbolData[0]["Technical Analysis: SMA"] : null;
  const dates = Object.keys(smaData);
  const smaValues = Object.values(smaData).map(entry => parseFloat(entry.SMA));

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'SMA',
        data: smaValues,
        borderColor: 'rgb(0, 136, 255)',
        fill: false
      },
    ]
  };

  const options = {
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6,
          color: 'white'
        }
      },
      y: {
        ticks: {
          maxTicksLimit: 15,
          color: 'white'
        }
      }
    }
  };

  return (
    <div style={{ width: '90%', height: '480px', color: 'white', paddingTop: '1%' }}>
      <h2 style={{fontSize:"19px"}}>SMA Moving Average for {selectedSymbol}</h2>
      <Line data={chartData} options={options} style ={{color:'white'}} />
    </div>
  );
};

MAVChart.propTypes = {
  selectedSymbol: PropTypes.string.isRequired
};

export default MAVChart;
