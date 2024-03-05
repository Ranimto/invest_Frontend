import React, { useState } from 'react';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import StepOneForm from './StepOneForm';
import bgImage from "assets/images/R8Xg21.webp";
import validationImage from "assets/images/3d-checklist-icon-png.webp";
import StepTwoForm from './StepTwoForm';
import StepThreeForm from './StepThreeForm';
import StepFourForm from './StepFourForm';
import { Stepper, Step, StepLabel, Button, Card } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Form() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({  
    employmentStatus: "",
    age: "",
    investmentGoal: "",
    pastInvestmentExperience: "",
    financialMarketKnowledge: "",
    investmentProductKnowledge: "",
    investmentSelectionCriteria: "",
    avoidSpecificInvestments: "",
    annualIncomeRange: "",
    debts: "",
    investmentTimeframe: "",
    investmentStyle: "",
    targetRateOfReturn: "",
    preferredIndustries: "",
    liquidityPriority: "",
    reactionToMarketDownturn: "",
    comfortWithFluctuations: "",
    financialRiskComfortLevel: "",
    sourceOfFunds: "",
});
    const [showThankYou, setShowThankYou] = useState(false);
    const navigate = useNavigate();

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

     
    const handleDone = async (values) => {
        setShowThankYou(true);
        await updateFormData(values);
        handleSubmit(values);
        alert('Formulaire soumis avec succès');
        navigate("/dashboard");
    };

    const updateFormData = (values) => {
        setFormData({ ...formData, ...values });
        console.log('hello',formData);
    };

    const handleSubmit = async (values) => {
        try {
            const url = "http://localhost:8023/profileData/addProfileData";
            const response = await axios.post(url, values);
            console.log('Profile data added:', response.data);
        } catch (error) {
            console.log(error);
        }
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
            {step === 1 && <StepOneForm onNextStep={handleNextStep} updateFormData={updateFormData} />}
            {step === 2 && <StepTwoForm onNextStep={handleNextStep} updateFormData={updateFormData}/>}
            {step === 3 && <StepThreeForm onNextStep={handleNextStep} updateFormData={updateFormData}/>}
            {step === 4 && <StepFourForm onNextStep={handleNextStep} updateFormData={updateFormData} />}
            
            <div style={{ marginTop: '20px' }}>
                {step > 4 && !showThankYou && (
                    <div className="validation">
                        <div className="btn">
                            <Button type='submit' color='primary' variant='contained' style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => { handleDone(formData); }}>Done</Button>
                        </div>
                    </div>
                )}
                {showThankYou && (
                  <Card className='card' style={{backgroundColor:'transparent', width:'120%' }}>
                    <img src={validationImage}style={{ width:'35%', marginLeft:'30%'}}/>
                    <p className='message'>Thank you for submitting the form!</p>
                  </Card>
                )}
            </div>
        </BasicLayout>
    );
}

export default Form;