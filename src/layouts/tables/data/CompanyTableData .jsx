import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CompanyPDF from './CompanyPDF';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


export default function Data() {
  const [companies, setCompanies] = useState([]);
  const [Company, setCompany] = useState({
    id: "",
    activity: "",
    companyName: "",
    reportedCurrency: "",
    operatingCashflow: 0.0,
    paymentsForOperatingActivities: 0.0,
    capitalExpenditures: 0.0,
    cashflowFromInvestment: 0.0,
    cashflowFromFinancing: 0.0,
    dividendPayout: 0.0,
    changeInExchangeRate: 0.0,
    netIncome: 0.0,
    RIB: 0.0,
  });

  const [error, setError] = useState(null);
  const [user,setUser]=useState({ 
    id:"",  
    firstname:"",
    lastname:"",
    email :"",
    phone :"",
    city:"",
    nationality:"",
    postcode:"",
    profession:"",
  })
  const email = useSelector((state) => state.auth.value.email);
  const token=useSelector((state)=>state.auth.value.token);

  const fetchUserByEmail= async (email) => {
    const url = `http://localhost:8023/user/findByEmail/${email}`;
    const response = await axios.get(url, {
      headers: {
          'Authorization': `Bearer ${token}` 
      } 
    });
    console.log("Response from server:", response.data, response);
    setUser(response.data);
};

 useEffect(() => {
 if (email) {fetchUserByEmail(email);}
}, [email]);


const fetchCompanies= async (id) => {
  try {
    const url = `http://localhost:8023/company/getCompaniesByInvestorId/${id}`;
    const response = await axios.get(url, {
      headers: {
          'Authorization': `Bearer ${token}` 
      } }
      );
    console.log("Response from server:", response.data, response);
    setCompanies(response.data);
    setError(null);
  } catch (error) {
    if (error.response) {
      setError(error.response.data.message);
    } else {
      setError("An error occurred during companies recovery.");
    }
  }
};

  useEffect(() => {
 
    if (user.id)
   { fetchCompanies(user.id);}
  }, [user.id]);

 
  const columns = [
  
    { Header: "Name", accessor: "name", align: "center" },
    { Header: "Activity", accessor: "activity", align: "left" },
    { Header: "Reported_Currency", accessor: "reportedCurrency", align: "center" },
    { Header: "Operating_Cash_Flow", accessor: "operatingCashflow", align: "center" },
    { Header: "payments_ForOperating_Activities", accessor: "paymentsForOperatingActivities", align: "center" },
    { Header: "Capital_Expenditures", accessor: "capitalExpenditures", align: "center" },
    { Header: "Dividend_Payout", accessor: "dividendPayout", align: "center" },
    { Header: "Change_in_Exchange_Rate", accessor: "changeInExchangeRate", align: "center" },
    { Header: "Net_Income", accessor: "netIncome", align: "center" },
    { Header: "RIB", accessor: "RIB", align: "center" },
    { Header: "Download", accessor: "Download", align: "center" }
  ];

  const rows = companies.map((item,index) => ({

    name: (
      <h3 className="CompanyName">
      <Link to={`/stock/${item.companyName}`} className="CompanyName">{item.companyName}</Link>
      </h3>
    ),
    activity: (
      <h3>
        {item.activity}
      </h3>
    ),
    reportedCurrency: (
      <h3>
        {item.reportedCurrency}
      </h3>
    ),
    operatingCashflow: (
      <h3>
        {item.operatingCashflow}
      </h3>
    ),
    paymentsForOperatingActivities: (
      <h3>
        {item.paymentsForOperatingActivities}
      </h3>
    ),
    capitalExpenditures: (
      <h3>
        {item.capitalExpenditures}
      </h3>
    ),
    dividendPayout: (
      <h3>
        {item.dividendPayout}
      </h3>
    ),
    changeInExchangeRate: (
      <h3>
        {item.changeInExchangeRate}
      </h3>
    ),
    netIncome: (
      <h3>
        {item.netIncome}
      </h3>
    ),
    RIB: (
      <h3>
        {item.RIB}
      </h3>
    ),
    Download: (
      <PDFDownloadLink
          key={index}
          document={<CompanyPDF data={item} />}
          fileName={`${item.companyName}_data.pdf`}
        >
          {({ loading }) => (loading ? 'Donwload...' : <CloudDownloadIcon style={{color: "black", width:"150%"}} />)}
        </PDFDownloadLink>
    ),
  }));

  return { columns, rows };
}