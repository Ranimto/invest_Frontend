import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import de PropTypes
import bgImage from "assets/images/R8Xg21.webp";
import { Formik } from 'formik';
import { Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import './style.css';

function StepTwoForm({ onNextStep, updateFormData }) {
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

    const initialValues = {};
    data.forEach(questionData => {
        initialValues[questionData.value] = '';
    });

    return (

        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 2));
                    updateFormData(values);
                    onNextStep();
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit} className='form'>
                        {data.map((questionData, index) => (
                            <div key={index} className="questionContainer">
                                <FormControl className='formControl' fullWidth>
                                    <div className="selectContainer">
                                        <InputLabel className='label'>{questionData.question}</InputLabel>
                                        <Select
                                            style={{ width: '100%', height: '40px', marginTop: '10%' }}
                                            id={questionData.value}
                                            name={questionData.value}
                                            value={formik.values[questionData.value]}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem style={{ fontWeight: '600'}} value="">Select an option</MenuItem>
                                            {questionData.options.map((option, optionIndex) => (
                                                <MenuItem key={optionIndex} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </FormControl>
                            </div>
                        ))}
                        <div className="btn">
                            <Button type='submit' color='primary' variant='contained' style={{ backgroundColor: '#8b1076eb', color: 'white' }}>Next</Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

StepTwoForm.propTypes = {
    onNextStep: PropTypes.func.isRequired,
    updateFormData: PropTypes.func.isRequired,
};

export default StepTwoForm;