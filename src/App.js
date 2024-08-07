import React , {useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import routes from "routes";
import { useMaterialUIController } from "context";
import brandWhite from "assets/images/logo-ct.png";
import { useSelector, useDispatch } from "react-redux";
import Home from "layouts/home";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import PropTypes from 'prop-types';
import Form from "layouts/Form";
import Cover from "layouts/authentication/reset-password/cover";
import ResetPassword from "layouts/authentication/reset-password/cover/resetPassword";
import { login } from './authRedux/Features/auth/auth';

import {useNavigate} from 'react-router-dom'

function PrivateRoute({ element, isAuthenticated ,isPrivate}) {
  console.log("isAuthenticated" , isAuthenticated);
  console.log("isPrivate" , isPrivate);
  return (isAuthenticated && isPrivate) ? element : <Navigate to="/authentication/sign-in" />;
}

function App() {
  const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [controller] = useMaterialUIController();
  const {
    layout,
    sidenavColor,
  } = controller;

  useEffect(() => {
      const token = localStorage.getItem("token")
      const email = localStorage.getItem("email")
      if(token){
        dispatch(login({isAuthenticated:true, token: token ,email: email })); 
      }
  }, [])

  useEffect(()=>{
    {routes.map((route) => (
    navigate(route.component)
    ))}
  },[isAuthenticated])
  
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
          <Sidenav
            color={sidenavColor}
            brand={brandWhite}
            brandName="InvestAI"
            routes={routes}          
          />        
      )}
    
      <Routes>
  <Route path="/signup" element={<Navigate to="/authentication/sign-up" />} />
  <Route path="/" element={<Navigate to="/home" />} />
  <Route path="/home" element={<Home />} />
  <Route path="/form" element={<Form/>} />
  <Route path="/authenticate/passwordReset" element={<Cover/>} />
  <Route path="/reset-password" element={<ResetPassword/>} />
  <Route path="/authentication/sign-up" element={<SignUp/>} />
  <Route path="/authentication/sign-in" element={<SignIn/>} />
  {routes.map((route) => (
    <Route  path={route.route} key={route.key} 
      element={
        <PrivateRoute
          element={route.component}
          isAuthenticated={isAuthenticated}
          isPrivate={route.isPrivate}
        />
      }
    />
  ))}
</Routes>
    </ThemeProvider>
  );
}

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
};

export default App;