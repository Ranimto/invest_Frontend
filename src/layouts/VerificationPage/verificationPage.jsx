import { Grid } from '@mui/material';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import React, { useEffect, useState } from 'react';
import emailVerification from 'assets/images/email3.gif';
import './style.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VerificationPage = () => {
    const [userVerification, setUserVerification] = useState(false);
    const [user, setUser] = useState({ });
    
    const email = useSelector((state) => state.auth.value.email);
    const token = useSelector((state) => state.auth.value.token);

    const fetchUserByEmail = async (email) => {
        const url = `http://localhost:8023/user/findByEmail/${email}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        setUser(response.data);
        
    };

    const handleConfirmEmail = async(verificationCode, enabled) => {
       
          if (enabled && verificationCode==null)
            setUserVerification(true)
    };

    // useEffect(() => {
    //     if (user.enabled) {
    //         handleConfirmEmail();
    //     }
    // }, [user.enabled, user.verificationCode]);


    useEffect(() => {
        if (email) 
           { fetchUserByEmail(email)
            console.log(user)
            console.log("user.verificationCode" ,user.verificationCode ,  user.enabled)
           handleConfirmEmail(user.verificationCode, user.enabled); } 
    }, [email]);

    

    return (
        <PageLayout>
            {userVerification && (
                <Grid>
                    <p className='confirmation'>
                        Thank you for verifying your Account. To continue the registration process please click here...
                        <Link to='/form'><strong> Click Here !</strong></Link>
                    </p>
                </Grid>
            )}
            <Grid className='GridVerification'>
                <img src={emailVerification} alt="Email Verification" style={{ width: "65%", height: "200px" }} />
                <h2>Check Your Verification E-mail</h2>
                <p>We required you to verify your email address. For this purpose, we have sent you a verification mail. If you do not find a mail in the box check if your email address is correct.</p>
            </Grid>
        </PageLayout>
    );
};


export default VerificationPage;
