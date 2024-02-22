import { Button, Card, CardContent } from '@mui/material';
import React, { useContext, useState } from 'react'
import { multiStepContext } from './stepContext';
import './style.css'

function FirstStep() {
    const {setStep,userData,setUserData}=useContext(multiStepContext);
    const [selectedOptions, setSelectedOptions] = useState({}); 
    const [data,setData] = useState([
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
      
      const handleOptionChange = (event, index) => {
        const { value } = event.target;
        setSelectedOptions((prevOptions) => ({
          ...prevOptions // Utilisez l'index de la question comme clé
        }));
      };

    return (

     <div >
        
         <Card className='container' style={{backgroundColor:'rgba(251, 248, 203, 0.2)', boxShadow: '2px 4px 10px 1px rgba(255, 255, 255, 0.4'}}>
            <CardContent className='formBox'  >
              <div className="formbold-mb-5" >
                {data.map((questionData, index) => (
                  <div key={questionData.question}> {/* Utilisez question comme clé */}
                    <p className="quest">{questionData.question}</p>

                  <div className="form">
                     <select value={userData[questionData.value]}  onChange={(e)=>setUserData({...userData,[questionData.value]:e.target.value})} >
                      <option className='select' value="">Select an option</option>
                      {questionData.options.map((option, optionIndex) => (
                      <option className='selectOption' key={optionIndex} value={option}>{option}</option>
                      ))}
                    </select>
                   </div>
                    
                   </div>
             ))} 
             
             </div>
             <div className="next">
             <Button  type="submit" style={{backgroundColor:'#8b1076eb',color:'white'}}  onClick ={()=>setStep(2)}>Next</Button>
             </div>
           </CardContent>
        </Card>
    </div>  
    );  
}

export default FirstStep
