import React, { useState } from 'react'
import MultiStepForm from './MultiStepForm';


export const multiStepContext=React.createContext();
  const StepContext=() => {
    const [currentStep, setStep]=useState(1);
    const[userData ,setUserData] =useState([]);
    const [finalData , setFinalData]=useState([]);

    const submitData = async (e) => {
		e.preventDefault();
		try {

        setFinalData(finalData=>[...finalData,userData]);
        setUserData('');
			const url = "http://localhost:8023/profileData/addProfileData";
			const {finalData: res } = await axios.post(url, finalData);
   
            navigate("/");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				alert(error.data);
			}
		}
	};

    return (
        <div>
   <multiStepContext.Provider  value={{currentStep, setStep,userData,setUserData ,finalData,setFinalData}}>  
      <MultiStepForm/>
   </multiStepContext.Provider>
        </div>

    )
}

export default StepContext
