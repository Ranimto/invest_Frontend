import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes";
import { useMaterialUIController, setOpenConfigurator } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { useSelector } from "react-redux";
import Home from "layouts/home";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import PropTypes from 'prop-types';

function PrivateRoute({ element, isAuthenticated ,isPrivate}) {
  return (isAuthenticated && isPrivate) ? element : <Navigate to="/authentication/sign-in" />;
}

function App() {
  const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);
  const [controller, dispatch] = useMaterialUIController();
  const {
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="InvestAI"
            routes={routes}          
          />
          <Configurator />
          {configsButton}
        </>
      )}
      <Configurator />
      <Routes>
  <Route path="/signup" element={<Navigate to="/authentication/sign-up" />} />
  <Route path="/" element={<Navigate to="/home" />} />
  <Route path="/home" element={<Home />} />
  <Route path="/authentication/sign-up" element={<SignUp/>} />
  <Route path="/authentication/sign-in" element={<SignIn/>} />
  {routes.map((route) => (
    <Route exact path={route.route} key={route.key} 
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