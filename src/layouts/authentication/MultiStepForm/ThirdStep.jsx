import { Button, Card, CardContent, IconButton } from '@mui/material';

import React, { useContext, useState } from 'react'
import { multiStepContext } from './stepContext';
import './style.css'

function ThirdStep() {

    const {setStep,userData,setUserData,submitData}=useContext(multiStepContext);
    const [selectedOptions, setSelectedOptions] = useState({}); 
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
      
      const handleOptionChange = (event, index) => {
        const { value } = event.target;
        setSelectedOptions((prevOptions) => ({
          ...prevOptions // Utilisez l'index de la question comme clé
        }));
      };

    return (
     <div>
       
         <Card className='container'style={{backgroundColor:'rgba(251, 248, 203, 0.2)', boxShadow: '2px 4px 10px 1px rgba(255, 255, 255, 0.4'}}>
            <CardContent>
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
              
             </div >
             <div className="bbt">
               <Button className='boutton' variant="contained" style={{backgroundColor:'#8b1076eb'}} onClick ={()=>setStep(2)} >Back</Button>
               <Button variant="contained" style={{backgroundColor:'#1449aceb' }} onClick ={()=>setStep(4)} >Next</Button>
            </div>
           </CardContent>
        </Card>
    </div>  
    ); 
}

export default ThirdStep
