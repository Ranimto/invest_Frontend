import { Button, Card, CardContent } from '@mui/material';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useContext, useState } from 'react'
import { multiStepContext } from './stepContext';
import './style.css'

function SecondStep() {
    const {setStep,userData,setUserData}=useContext(multiStepContext);
    const [selectedOptions, setSelectedOptions] = useState({}); 
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
      
      const handleOptionChange = (event, index) => {
        const { value } = event.target;
        setSelectedOptions((prevOptions) => ({
          ...prevOptions // Utilisez l'index de la question comme clé
        }));
      };

    return (
     <div>
        
         <Card className='container' style={{backgroundColor:'rgba(251, 248, 203, 0.2)', boxShadow: '2px 4px 10px 1px rgba(255, 255, 255, 0.4'}}>
            <CardContent >
              <div className="formbold-mb-5">
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
             <div className="bbt">
             <Button variant="contained"   style={{backgroundColor:'#8b1076eb'}} onClick ={()=>setStep(1)} >Back</Button>
             <Button  variant="contained"  style={{backgroundColor:'#1449aceb'}}onClick ={()=>setStep(3)} >Next</Button>
             </div>
           </CardContent>
        </Card>
    </div>  
    );  
}

export default SecondStep
