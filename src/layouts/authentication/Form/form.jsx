import React, { useEffect, useState } from 'react';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { CardContent, Card, Typography, Pagination, Button } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import IconButton from '@mui/material/IconButton';
import './style.css'

const questionsPerPage = 5;

function Form() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({}); 
  const [responses, setResponses] = useState({});

 const [data,setData] = useState([
  {
    question: "1. What is your employment status?",
    options: ["Employed full-time", "Employed part-time", "Unemployed", "Self-employed", "Student", "Retired", "Other"]
  },
  {
    question: "2. What is your age?",
    options: ["Under 18", "18-25", "26-35", "36-50", "Over 50"]
  },
  {
    question: "3. What is your primary investment goal in the short and long term?",
    options: ["Wealth accumulation", "Retirement planning", "Education funding", "Buying a home", "Starting a business", "Other"]
  },
  {
    question: "4. Do you have any past investment experience?",
    options: ["Yes", "No"]
  },
  {
    question: "5. What is your level of knowledge about financial markets?",
    options: ["Very high", "High", "Moderate", "Low", "Very low"]
  },
  {
    question: "6. What is your level of knowledge about investment products?",
    options: ["Very high", "High", "Moderate", "Low", "Very low"]
  },
  {
    question: "7. What are your investment selection criteria?",
    options: ["Risk tolerance", "Expected return", "Liquidity", "Diversification", "Tax considerations", "Others"]
  },
  {
    question: "8. Are there any specific investments you wish to avoid?",
    options: ["Yes", "No"]
  },
  {
    question: "9. What is your annual income range?",
    options: ["Under 25,000  TND", " 25,000 TND - 50,000  TND", "50,000 TND - 100,000 TND", "Over 100,000 TND"]
  },
  {
    question: "10. Do you have any debts?",
    options: ["Yes", "No"]
  },
  {
    question: "11. What is your investment timeframe? Are you looking to invest for the short, medium, or long term?",
    options: ["Short term", "Medium term", "Long term"]
  },
  {
    question: "12. How would you describe your investment style? Are you more conservative, moderate, or aggressive?",
    options: ["Conservative", "Moderate", "Aggressive"]
  },
  {
    question: "13. Do you have a target rate of return in mind for your investments?",
    options: ["Yes", "No"]
  },
  {
    question: "14. Are there any specific industries you prefer to invest in?",
    options: ["Technology", "Healthcare", "Finance", "Real Estate", "Consumer Goods", "Energy", "Others"]
  },
  {
    question: "15. How do you prioritize liquidity in your investment decisions?",
    options: ["High priority", "Medium priority", "Low priority"]
  },
  {
    question: "16. How would you react to a significant market downturn or recession?",
    options: ["Stay invested and ride it out", "Rebalance portfolio", "Increase investments", "Sell investments and hold cash"]
  },
  {
    question: "17. What is your comfort level with fluctuations in the value of your investments?",
    options: ["Very comfortable", "Comfortable", "Neutral", "Uncomfortable", "Very uncomfortable"]
  },
  {
    question: "18. What level of financial risk are you comfortable with?",
    options: ["Low", "Medium", "High"]
  },
  {
    question: "19. What is your source of funds you intend to invest?",
    options: ["Savings", "Salary", "Inheritance", "Investment returns", "Other"]
  },
  {
    question: "20. What level of financial risk are you comfortable with?",
    options: ["Low", "Medium", "High"]
  },
]);

useEffect(() => {
  setCurrentPage(0);
  setSelectedOptions({});
  setResponses({}); // Réinitialiser les réponses à chaque changement de questions
}, [data]);

const handlePageChange = (event, newPage) => {
  setCurrentPage(newPage - 1);
};

const handlePreviousClick = () => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  }
};

const handleNextClick = () => {
  setCurrentPage(currentPage + 1);
};

const handleOptionChange = (event, index) => {
  const { value } = event.target;
  setSelectedOptions((prevOptions) => ({
    ...prevOptions,
    [currentPage * questionsPerPage + index]: value, // Utilisez l'index de la question comme clé
  }));
};

const handleSubmit = async () => {
  try {
  d
    await axios.post('http://localhost:8023/profilData/saveResponses', responses);
    setResponses({});
    // Afficher un message de succès ou rediriger l'utilisateur
  } catch (error) {
    // Gérer les erreurs
  }
};

  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = data.slice(startIndex, endIndex);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <div className="column">
          <Card className='container'>
            <CardContent >
              <div className="formbold-mb-5">
                {currentQuestions.map((questionData, index) => (
                  <div key={questionData.question}> {/* Utilisez question comme clé */}
                    <p className="quest">{questionData.question}</p>

                  <div className="form">
                    <select id={selectedOptions[index] || ''}  onChange={(event) => handleOptionChange(event, index)} >
                      <option className='select' value="">Select an option</option>
                      {questionData.options.map((option, optionIndex) => (
                      <option className='selectOption' key={optionIndex} value={option}>{option}</option>
                   ))}
                    </select>
                  </div>
                    
                  </div>
                ))}
               
                 {currentPage===Math.ceil(data.length / questionsPerPage)-1?
                 (
                 <div className="btn">
                    <IconButton onClick={handlePreviousClick} disabled={currentPage === 0}>
                     <p style={{ color: currentPage === 0 ? 'grey' : 'rgba(5, 0, 28, 0.834)' }}>Previous</p> <SkipPreviousIcon  className='icon' />
                    </IconButton>
                    <Button type="submit" variant="contained" style={{backgroundColor:'#6a64f1' ,color:'white'}} onClick={handleSubmit} >Submit</Button>
                   
                 </div>

                 ):(
                <div className="nextPrev" >
                
                  <IconButton onClick={handlePreviousClick} disabled={currentPage === 0}>
                   <p style={{ color: currentPage === 0 ? 'grey' : 'rgba(5, 0, 28, 0.834)' }}>Previous</p> <SkipPreviousIcon  className='icon' />
                  </IconButton>
                  <IconButton onClick={handleNextClick}>
                    <SkipNextIcon  className='icon'/><p>Next</p>
                  </IconButton>
                  
                </div>
                )}
                 <br/>
                <div>
                  <Pagination className='pagination'
                    count={Math.ceil(data.length / questionsPerPage)}
                    page={currentPage + 1}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Form;
