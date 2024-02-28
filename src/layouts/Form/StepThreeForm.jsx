import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import de PropTypes
import bgImage from "assets/images/R8Xg21.webp";
import { Formik } from 'formik';
import { Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import './style.css';

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
                                            <MenuItem style={{ fontWeight: '600' }} value="">Select an option</MenuItem>
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

StepThreeForm.propTypes = {
    onNextStep: PropTypes.func.isRequired, 
    updateFormData: PropTypes.func.isRequired,
};

export default StepThreeForm;
