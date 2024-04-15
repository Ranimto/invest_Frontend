import React from 'react';
import GaugeChart from 'react-gauge-chart';
import  PropTypes  from 'prop-types';

const CustomGauge = ({ value }) => {
  return <GaugeChart id="gauge-chart1" 
  percent={value /100} 
  formatTextValue={() => `${value}`} 
  textColor="#000" 
  style={{ height:"20px",width:"90%",fontWeight:"600" ,paddingTop:"10%" }}
 

  
  />;
};

CustomGauge.propTypes = {
  value: PropTypes.node
};
export default CustomGauge;
