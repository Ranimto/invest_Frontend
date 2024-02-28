import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import de PropTypes
import bgImage from "assets/images/R8Xg21.webp";
import { Formik } from 'formik';
import { Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import './style.css';

function StepOneForm({ onNextStep , updateFormData}) {
    const [data] = useState([
        {
            question: "1. What is your employment status?",
            options: ["Employed full-time", "Employed part-time", "Unemployed", "Self-employed", "Student", "Retired", "Other"],
            value: "employmentStatus"
        },
        {
            question: "2. What is your age?",
            options: ["Under 18", "18-25", "26-35", "36-50", "Over 50"],
            value: "age"
        },
        {
            question: "3. What is your primary investment goal in the short and long term?",
            options: ["Wealth accumulation", "Retirement planning", "Education funding", "Buying a home", "Starting a business", "Other"],
            value: "investmentGoal"
        },
        {
            question: "4. Do you have any past investment experience?",
            options: ["Yes", "No"],
            value: "pastInvestmentExperience"
        },
        {
            question: "5. What is your level of knowledge about financial markets?",
            options: ["Very high", "High", "Moderate", "Low", "Very low"],
            value: "financialMarketKnowledge"
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

StepOneForm.propTypes = {
    onNextStep: PropTypes.func.isRequired,
    updateFormData: PropTypes.func.isRequired,
};

export default StepOneForm;