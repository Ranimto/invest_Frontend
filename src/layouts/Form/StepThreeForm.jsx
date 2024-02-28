import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import de PropTypes
import bgImage from "assets/images/R8Xg21.webp";
import { Formik } from 'formik';
import { Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import './style.css';
import GenericStepForm from './GenericStepForm';

function StepThreeForm({ onNextStep,updateFormData }) {
  const [data,setData] = useState([
    {
      question: "11. What is your investment timeframe? ",
      options: ["Short term", "Medium term", "Long term"],
      value: "investmentTimeframe"
    },
    {
      question: "12. How would you describe your investment style?",
      options: ["Conservative", "Moderate", "Aggressive"],
      value: "investmentStyle"
    },
    {
      question: "13. Do you have a target rate of return in mind for your investments?",
      options: ["Yes", "No"],
      value: "targetRateOfReturn"
    },
    {
      question: "14. Are there any specific industries you prefer to invest in?",
      options: ["Technology", "Healthcare", "Finance", "Real Estate", "Consumer Goods", "Energy", "Others"],
      value: "preferredIndustries"
    },
    {
      question: "15. How do you prioritize liquidity in your investment decisions?",
      options: ["High priority", "Medium priority", "Low priority"],
      value: "liquidityPriority"
    }
    ]);

   
    return (
        <GenericStepForm
          questions={data}
          onNextStep={onNextStep}
          updateFormData={updateFormData}
        />
      );
}

StepThreeForm.propTypes = {
    onNextStep: PropTypes.func.isRequired, 
    updateFormData: PropTypes.func.isRequired,
};

export default StepThreeForm;
