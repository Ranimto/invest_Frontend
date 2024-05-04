import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import de PropTypes
import bgImage from "assets/images/R8Xg21.webp";
import { Formik } from 'formik';
import { Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import './style.css';

function StepFourForm({ onNextStep ,updateFormData}) {
    const [data, setData] = useState([
        {
            question: "16. How would you react to a significant market downturn or recession?",
            options: ["Stay invested and ride it out", "Rebalance portfolio", "Increase investments", "Sell investments and hold cash"],
            value: "reactionToMarketDownturn"
        },
        {
            question: "17. What is your comfort level with fluctuations in the value of your investments?",
            options: ["Very comfortable", "Comfortable", "Neutral", "Uncomfortable", "Very uncomfortable"],
            value: "comfortWithFluctuations"
        },
        {
            question: "18. What level of financial risk are you comfortable with?",
            options: ["Low", "Medium", "High"],
            value: "financialRiskComfortLevel"
        },
        {
            question: "19. What is your source of funds you intend to invest?",
            options: ["Savings", "Salary", "Inheritance", "Investment returns", "Other"],
            value: "sourceOfFunds"
        },
        {
            question: "20. What level of financial risk are you comfortable with?",
            options: ["Low", "Medium", "High"],
            value: "financialRiskComfortLevel"
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
                                            required
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
                            <Button type='submit' color='primary' variant='contained' style={{ backgroundColor: '#8b1076eb', color: 'white' }}>Submit</Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

StepFourForm.propTypes = {
    onNextStep: PropTypes.func.isRequired, 
    updateFormData: PropTypes.func.isRequired, 
};

export default StepFourForm;
