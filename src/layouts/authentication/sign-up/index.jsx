import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/trading.jpg";
import axios from 'axios'
import './style.css'
import { useState } from "react";
import MDButton from "components/MDButton";

function Cover() {

  const [data, setData] = useState({
		    firstname:"",
        lastname:"",
        email :"",
        password :"",
		    phone :"",
		    enabled: false,
		    verificationCode :""
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	


    // extraire la propriété currentTarget de l'événement et la renommer en input
    // Mettre a jour la propriété spécifique de l'objet data  'input.name' en fonction du champ du formulaire qui a déclenché l'événement 'input.value'.
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8023/auth/register";
			const { data: res } = await axios.post(url, data);
			console.log(data);
			navigate("/EmailVerif", { state: { email: data.email } });
			console.log(res.message);
		} catch (error) {
			if (error.response) {

				alert("Email already in use. Please choose a different email address");
			} else {
				setError(error.response.data.message);
				alert(error);
				
			}
		}
	};

  return (
    <CoverLayout image={bgImage}>
      <Card className="signUpCard">
        
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
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

            <MDBox mb={2}>
              <MDInput type="text" label="firstname" variant="standard" fullWidth  	
              name="firstname"
							onChange={handleChange}
							value={data.firstname}/>
            </MDBox>

            <MDBox mb={2}>
              <MDInput type="text" label="lastname" variant="standard" fullWidth
                    name="lastname"
                    onChange={handleChange}
                    value={data.lastname}
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth
                    name="email"
                    onChange={handleChange}
                    value={data.email}
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth 
                    name="password"
                    onChange={handleChange}
                    value={data.password}
              />
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <h6>
                &nbsp;&nbsp;I agree the&nbsp;<span style={{color:'rgba(41, 141, 228, 0.718)'}}>Terms and Conditions</span> </h6>    
            </MDBox>
   
            <MDBox mt={4} mb={1}>
            {error && <div className="error_msg">{error}</div>}
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={2} textAlign="center">
              <p className="txt">
                Already have an account?{" "}<span style={{color:'rgba(20, 103, 212, 0.741)'}}> <Link to={"/authentication/sign-in"}>Sign In</Link>  </span>
              </p>
            </MDBox>

          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
