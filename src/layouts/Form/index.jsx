import React, { useState } from 'react';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import StepOneForm from './StepOneForm';
import bgImage from "assets/images/R8Xg21.webp";
import StepTwoForm from './StepTwoForm';
import StepThreeForm from './StepThreeForm';
import StepFourForm from './StepFourForm';
import { Stepper, Step, StepLabel, Button, Card } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Form() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [showThankYou, setShowThankYou] = useState(false);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (data) => {
        // Merge data from each step into formData
        setFormData({ ...formData, ...data });

        // Example: Submit data to backend
        console.log('Form submitted:', formData);
    };

    const handleDone = () => {
        // Handle the "Done" button click event
        setShowThankYou(true);
    };

    return (
        <BasicLayout image={bgImage}>
          <div className="stepper">
            <Stepper  activeStep={step - 1} alternativeLabel>
                <Step key={1}>
                    <StepLabel>Step 1</StepLabel>
                </Step>
                <Step key={2}>
                    <StepLabel>Step 2</StepLabel>
                </Step>
                <Step key={3}>
                    <StepLabel>Step 3</StepLabel>
                </Step>
                <Step key={4}>
                    <StepLabel>Step 4</StepLabel>
                </Step>
            </Stepper>
            </div>
            {step === 1 && <StepOneForm onNextStep={handleNextStep} />}
            {step === 2 && <StepTwoForm onNextStep={handleNextStep} />}
            {step === 3 && <StepThreeForm onNextStep={handleNextStep} />}
            {step === 4 && <StepFourForm onNextStep={handleNextStep} />}

            <div style={{ marginTop: '20px' }}>
                {step > 4 && !showThankYou && (
                    <div className="validation">
                        <div className="btn">
                            <Button type='submit' color='primary' variant='contained' style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleDone}>Done</Button>
                        </div>
                    </div>
                )}
                {showThankYou && (
                  <Card className='card' style={{backgroundColor:'transparent', width:'120%' ,height:'150px', marginRight:'80%' ,display:'flex' }}>
                    <CheckCircleIcon style={{ color: 'rgba(212, 178, 207, 0.755)', fontSize: 40 , marginLeft:'50% ',top:'40%'}} />
                    <p className='message'>Thank you for submitting the form!</p>
                  </Card>
                )}
            </div>
        </BasicLayout>
    );
}

export default Form;
