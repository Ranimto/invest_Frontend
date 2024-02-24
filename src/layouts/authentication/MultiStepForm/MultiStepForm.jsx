import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useContext } from 'react'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import {Step, Stepper, StepLabel} from '@material-ui/core'
import {multiStepContext} from './stepContext'
import FourthStep from './FourthStep'
import Footer from '../components/Footer'

const MultiStepForm =()=> {
   
    const{currentStep, finalData}=useContext(multiStepContext)
   const showStep=(step)=>{
        switch(step)
        {
        case 1: 
            return  <FirstStep/>
        case 2: 
            return <SecondStep/>
        case 3:
            return <ThirdStep/>
        case 4:
            return <FourthStep/>
        }

    }
    return (
        <div  className='background'>
         
        <div className="center-stepper"  >
        <Stepper  style={{ marginRight:'35.3%',backgroundColor:'transparent',paddingTop:"3%"}} activeStep={currentStep - 1 }orientation='horizontal'>
           <Step>
               <StepLabel></StepLabel>
           </Step>

           <Step>
               <StepLabel></StepLabel>
           </Step>

           <Step>
               <StepLabel></StepLabel>
           </Step>
           <Step>
               <StepLabel></StepLabel>
           </Step>
        </Stepper>
        
        </div>
       
        {showStep(currentStep)}
        
        </div>
        
    )
}

export default MultiStepForm
