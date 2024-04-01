
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
import Performance from "layouts/Performance";
import WebhookIcon from '@mui/icons-material/Webhook';
import Activity from "layouts/activity/activity";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Transaction from "layouts/billing/components/Transaction";
import CompaniesRecommandations from "layouts/companiesRecommandations/companiesRecommandations";

  

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
    isPrivate: true,
  },
  
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Performance",
    key: "performance",
    icon: <WebhookIcon/>,
    route: "performance",
    component: <Performance />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Activity",
    key: "Activity",
    icon: <PendingActionsIcon/>,
    route: "activity",
    component: <Activity/>,
    isPrivate: true,
  },

  { type: "collapse",
  name: "BankAccounts",
  key: "BankAccounts",
  icon: <AccountBalanceWalletIcon>compte</AccountBalanceWalletIcon>,
  route: "bankAccounts",
 component: <BankAccounts/>,
 isPrivate: true,
},

{
  type: "collapse",
  name: "Recommandations",
  key: "Recommandations",
  icon: <Icon fontSize="small">receipt_long</Icon>,
  route: "recommandations",
  component: <CompaniesRecommandations/>,
  isPrivate: true,
  },
  {
    type: "collapse",
    name: "logout",
    key: "logout",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
    isPrivate: false,
  },
  {
    route: "/authentication/sign-up",
    component: <SignUp />,
    isPrivate: false,
  },
  { key: "form",
    route: "/form",
    component: <Form/>,
    isPrivate: false,
  },
  { key: "home",
    route: "home",
    component: <Home/>,
    isPrivate: false,
  },
  { key: "stock",
  route: "/stock/:company",
  component: <Stock/>,
  isPrivate: true,
},

{
key: "transaction",
route: "transaction",
component: <Transaction/>,
isPrivate: true,
},


  
   
];

export default routes;
