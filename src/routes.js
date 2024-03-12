
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Icon from "@mui/material/Icon";
import Form from "layouts/Form";
import Home from "layouts/home";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BankAccounts from "layouts/bankAccounts";
import Stock from "layouts/Stock";




const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },

  { type: "collapse",
  name: "BankAccounts",
  key: "BankAccounts",
  icon: <AccountBalanceWalletIcon>compte</AccountBalanceWalletIcon>,
  route: "bankAccounts",
 component: <BankAccounts/>,
},
  {
    type: "collapse",
    name: "logout",
    key: "logout",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  { key: "form",
    route: "form",
    component: <Form/>,
  },
  { key: "home",
    route: "home",
    component: <Home/>,
  },
  { key: "stock",
  route: "stock",
  component: <Stock/>,
},

  
 


 


 
  
];

export default routes;
