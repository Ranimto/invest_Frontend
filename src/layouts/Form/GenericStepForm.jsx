import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import de PropTypes
import bgImage from "assets/images/R8Xg21.webp";
import { Formik } from 'formik';
import { Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import './style.css';

const GenericStepForm = ({ questions, onNextStep, updateFormData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (questions && Array.isArray(questions)) {
      setData(questions);
    }
  }, [questions]);

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
              <Button type='submit' color='primary' variant='contained'bgColor="info" style={{ backgroundColor: 'blueviolet', color: 'white' }}>Next</Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

GenericStepForm.propTypes = {
  questions: PropTypes.array,
  onNextStep: PropTypes.func,
  updateFormData: PropTypes.func,
};

export default GenericStepForm;
