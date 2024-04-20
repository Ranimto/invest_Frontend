
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile2 from "layouts/profile2";
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
import CompanyNews from "layouts/companyNews/companyNews";
import Chat from "layouts/chatGPT/chat";
import Markets from "layouts/markets/markets";
import RestoreIcon from '@mui/icons-material/Restore';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';

  

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
    component: <Profile2 />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Performance",
    key: "performance",
    icon: <WebhookIcon/>,
    route: "performance/:investorId/:companyId/:symbol/:currentInvestmentAmount/:initialInvestmentAmount",
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
    name: "News",
    key: "News",
    icon: <RestoreIcon/>,
    route: "news/:company",
    component: <CompanyNews/>,
    isPrivate: true,
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
{
  type: "collapse",
  name: "Chat",
  key: "Chat",
  icon: <PendingActionsIcon/>,
  route: "chat",
  component: <Chat/>,
  isPrivate: true,
},
{
  type: "collapse",
  name: "markets",
  key: "markets",
  icon: <BabyChangingStationIcon/>,
  route: "markets",
  component: <Markets/>,
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
  
   
];

export default routes;
