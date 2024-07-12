import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/trading.jpg";
import axios from 'axios'
import './style.css'
import { useEffect, useState } from "react";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import { useDispatch } from "react-redux";
import { login } from '../../../authRedux/Features/auth/auth';

function Cover() {

const [data, setData] = useState({
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
		    verificationCode :""
	});
	const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState('');
  const [registred, setRegistred] = useState(false);
	const navigate = useNavigate();
  const dispatch = useDispatch();
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8023/auth/register";
			const { data: res } = await axios.post(url, data);
      dispatch(login({isAuthenticated:true, token: res.token, email: data.email }));
      setRegistred(true);
      showAlertAndNavigate("you've been successfully registered", "/verification");
		} catch (error) {
      console.log(error.response.data.message); 
        showAlertAndNavigate(error.response.data.message);
		
		}
	};

  const showAlertAndNavigate = ( message, destination) => {
    setError(message); 
    setTimeout(() => {
      navigate(destination); 
    }, 1500); 
  };


  const calculatePasswordStrength = (password) => {
    if (password.length >= 8) {
      setPasswordStrength('Strong');
    } else if (password.length >= 6) {
      setPasswordStrength('Medium');
    } else if (password.length >= 0) {
      setPasswordStrength('Weak'); 
    }
    else{
      setPasswordStrength(''); 
    }
  };
useEffect(()=>{
  if (data.password) calculatePasswordStrength(data.password)
},[data.password])


useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(login({ isAuthenticated: true, token }));
  }
}, [dispatch]);
  
  return (
    
    <CoverLayout image={bgImage}>
      
      <Card className="signUpCard">
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-9}
          p={2}
          mb={1}
          textAlign="center"
          className="signUpText"
        >
           <h4>
            Join us today
          </h4>
            <p >Enter your email and password to register</p>     
         
        </MDBox>
        <MDBox pt={2} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>

            <MDBox mb={2}  display="flex">
              <MDInput type="text" label="Firstname" variant="standard" fullWidth  	
              name="firstname"
							onChange={handleChange}
							value={data.firstname}
              required/>

             <MDInput type="text" label="Lastname" variant="standard" fullWidth
                    name="lastname"
                    onChange={handleChange}
                    value={data.lastname}
                    required
              />
            </MDBox>


            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth 
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required

              />
             {passwordStrength && (
                <div className="passwordResult">Password strength: <strong style={{ color: passwordStrength === 'Strong' ? 'green' : 'red', fontWeight:'200' }}> {passwordStrength}</strong></div>
              )}
            </MDBox>

            <MDBox mb={2}  display="flex">
              <MDInput type="number" label="Number" variant="standard" fullWidth
                    name="phone"
                    onChange={handleChange}
                    value={data.phone}
                    required
              />


             <MDInput type="text" label="Profession" variant="standard" fullWidth
                    name="profession"
                    onChange={handleChange}
                    value={data.profession}
                    required
              />
            </MDBox>

            <MDBox mb={2}  display="flex">
              <MDInput type="text" label="City" variant="standard" fullWidth 
                    name="city"
                    onChange={handleChange}
                    value={data.city}
                    required
              />

               <MDInput type="number" label="PostCode"
                    variant="standard" 
                    fullWidth 
                    name="postCode"
                    onChange={handleChange}
                    value={data.postCode}
                    required
              />

            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox required/>
              <h6>
                &nbsp;&nbsp;I agree the&nbsp;<span style={{color:'rgba(16, 16, 131, 0.89)'}}>Terms and Conditions</span> </h6>    
            </MDBox>
   
            <MDBox mt={4} mb={1}>
          
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <p className="txt">
                Already have an account?{" "}<span style={{color:'rgba(20, 103, 212, 0.741)'}}> <Link to={"/authentication/sign-in"}>Sign In</Link>  </span>
              </p>
            </MDBox>

          </MDBox>
        </MDBox>
      </Card>
      {error  && 
           <MDAlert color={registred ? "success" : "error"} className="alertClasss">
           {error}
         </MDAlert>
          }
    </CoverLayout>
  );
}

export default Cover;
