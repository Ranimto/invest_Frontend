import { Grid } from '@mui/material'
import PageLayout from 'examples/LayoutContainers/PageLayout'
import React, { useEffect, useState } from 'react'
import emailVerification from 'assets/images/email3.gif'
import './style.css'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const VerificationPage = () => {
    const [userVerification,setUserVerification]=useState(false)
    const [verificationCode,setVerificationCode]=useState("gr")
    const [enabled,setEnabled]=useState(false)
    const [user,setUser]=useState({
        firstname:"",
        lastname:"",
        email :"",
        password :"",
		phone :"",
        nationality :"",
        city :"",
        profession:"",
        postCode:"",
		enabled: false,
		verificationCode : null
    })
    const email = useSelector((state) => state.auth.value.email);
    const navigate=useNavigate();

    const fetchUserByEmail= async (email) => {
        const url = `http://localhost:8023/user/findByEmail/${email}`;
        const response = await axios.get(url);
        setUser(response.data)
    };
       
    useEffect(() => {

       setEnabled(user.enabled)
       setVerificationCode(user.verificationCode)
       console.log(user.enabled)
       console.log(user.verificationCode)
        if (enabled && verificationCode === null) 
            {setUserVerification(true);
               
            }
            console.log('tuyj',user.enabled, user.verificationCode )
    }, [user.enabled,user.verificationCode]);

    useEffect(()=>{
        fetchUserByEmail(email);
    },[email])


  return (
      <PageLayout>
            {userVerification &&
          <Grid >
             <p  className='confirmation'>Thank you for verifying your Account. To continue the registration process please click here...<Link to='/form'> <strong> Click Here !</strong></Link> </p> 
          </Grid>       
          }
          <Grid className='GridVerification'>
              <img src={emailVerification} style={{width:"65%",height:"200px"}}/>
              <h2>Check Your Verification E-mail</h2>
              <p>We required you to verify your email address. For this purpose we have sent you a verification mail. If you do not find a mail in the box check if your address mail is correct.</p>
          </Grid>

        
      </PageLayout>  
  )  
}
export default VerificationPage