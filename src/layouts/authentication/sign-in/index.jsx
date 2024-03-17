import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/rrr.jpg";
import './style.css';
import { Icon } from "@mui/material";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../authRedux/Features/auth/auth';//Login action

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

	const [data, setData] = useState({ email: "", password: ""});
	const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

	const handleChange = ({ currentTarget: input }) => {
	setData({ ...data, [input.name]: input.value });
	};

  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8023/auth/authenticate";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.token);
      dispatch(login({isAuthenticated:true, token: res.token, email: data.email })); //redux
      alert('User is authenticated')
      navigate("/dashboard");
		
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
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"      
        >
          <h4 style={{color:'white', paddingTop:'-10%'}}>
            Sign in
          </h4>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <Icon style={{color:'white'}}>
                <FacebookIcon color="inherit" />
              </Icon>
            </Grid>
            <Grid item xs={2}>
            <Icon style={{color:'white'}}>
                <GitHubIcon color="inherit" />
              </Icon>
            </Grid>
            <Grid item xs={2}>
            <Icon style={{color:'white'}}>
                <GoogleIcon color="inherit" />
              </Icon>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth
              name="email"
							onChange={handleChange}
							value={data.email}
							required/>
            </MDBox>

            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth
              name="password"
							onChange={handleChange}
							value={data.password}
							required
              />
            </MDBox>

            
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <h6>
                &nbsp;&nbsp;Remember me
              </h6>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <p className="txt">
                Don&apos;t have an account?{" "}
                <span style={{color:'rgba(20, 103, 212, 0.741)'}}> Sign up</span>
              </p>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
