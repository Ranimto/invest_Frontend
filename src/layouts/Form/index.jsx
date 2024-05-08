import React, { useEffect, useState } from 'react';
import VerificationPage from 'layouts/VerificationPage/verificationPage';

import BasicLayout from 'layouts/authentication/components/BasicLayout';
import StepOneForm from './StepOneForm';
import bgImage from "assets/images/bb.jpg";
import StepTwoForm from './StepTwoForm';
import StepThreeForm from './StepThreeForm';
import StepFourForm from './StepFourForm';
import { Stepper, Step, StepLabel, Button, Card } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function Form() {
    const [step, setStep] = useState(1);
    const[FormSuccess,setFormSuccess] =useState(false)
    const[userVerification,setUserVerification] =useState(false)
     const [prevUserVerification, setPrevUserVerification] = useState(false);
    const[user,setUser] =useState(false)
    const [formData, setFormData] = useState({ 
    userId:"", 
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
const email = useSelector((state) => state.auth.value.email);

    const fetchUserByEmail= async (email) => {
        const url = `http://localhost:8023/user/findByEmail/${email}`;
        const response = await axios.get(url);
        setUser(response.data)
        setFormData({ ...formData, userId: response.data.id }); 
        console.log('formData',formData); 
    };

     useEffect(() => {
     if (email){ fetchUserByEmail(email);}
    }, [email]);

    const navigate = useNavigate();
   
    const handleNextStep = () => {
        setStep(step + 1);
    };
     
    const handleDone = async (values) => {
        await updateFormData(values);
       handleSubmit();
       setFormSuccess(true)
       setTimeout(() => {
        navigate("/authentication/sign-in");
    }, 5000);
   
    };

    const updateFormData = (values) => {
        setFormData({ ...formData, ...values });
        console.log('hello',formData);
    };

    const handleSubmit = async () => {
        try {
            const url = "http://localhost:8023/profileData/addProfileData";
            const response = await axios.post(url, formData);
            console.log('Profile data added:', response.data);
        } catch (error) {
            console.log(error);
        }
    };




    return (

        <BasicLayout
         image={bgImage}>
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
                {FormSuccess && (
                  <div className="FormSuccess">
                   Your Form has been filled  <strong style={{color:'green' , backgroundColor:"red"}}>successfully</strong>  
                  </div>
                )}

            </div>
        </BasicLayout>


    );
}

export default Form;