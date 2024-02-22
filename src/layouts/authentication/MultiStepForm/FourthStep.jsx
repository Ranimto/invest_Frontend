import { Button, Card, CardContent } from '@mui/material';
import React, { useContext, useState } from 'react'
import { multiStepContext } from './stepContext';
import './style.css'

function FourthStep() {
    const {setStep,userData,setUserData,submitData}=useContext(multiStepContext);
    const [selectedOptions, setSelectedOptions] = useState({}); 
    const [data,setData] = useState([
    
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
               <Button  variant="contained" style={{backgroundColor:'#8b1076eb'}} onClick ={()=>setStep(3)} >Back</Button>
               <Button className='btn' variant="contained"  style={{backgroundColor:'#1449aceb' ,color:'white'}}onClick={submitData} >Submit</Button>
            </div>
           </CardContent>
        </Card>
    </div>  
    ); 
}

export default FourthStep
