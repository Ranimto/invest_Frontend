import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import de PropTypes
import bgImage from "assets/images/R8Xg21.webp";
import { Formik } from 'formik';
import { Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import './style.css';
import GenericStepForm from './GenericStepForm';

function StepTwoForm({ onNextStep ,updateFormData}) {
  const [data,setData] = useState([

    {
      question: "6. What is your level of knowledge about investment products?",
      options: ["Very high", "High", "Moderate", "Low", "Very low"],
      value: "investmentProductKnowledge"
    },
    {
      question: "7. What are your investment selection criteria?",
      options: ["Risk tolerance", "Expected return", "Liquidity", "Diversification", "Tax considerations", "Others"],
      value: "investmentSelectionCriteria"
    },
    
      {
          question: "8. Are there any specific investments you wish to avoid?",
          options: ["Yes", "No"],
          value: "avoidSpecificInvestments"
        },
        {
          question: "9. What is your annual income range?",
          options: ["Under 25,000  TND", " 25,000 TND - 50,000  TND", "50,000 TND - 100,000 TND", "Over 100,000 TND"],
          value: "annualIncomeRange"
        },
        {
          question: "10. Do you have any debts?",
          options: ["Yes", "No"],
          value: "debts"
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
    StepTwoForm.propTypes = {
        onNextStep: PropTypes.func.isRequired, 
        updateFormData: PropTypes.func.isRequired, 
    };
export default StepTwoForm;