import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



export default function Data() {
  const [otherCompanies, setOtherCompanies] = useState([]);
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

  const fetchUserByEmail= async (email) => {
    const url = `http://localhost:8023/user/findByEmail/${email}`;
    const response = await axios.get(url);
    console.log("Response from server:", response.data, response);
    setUser(response.data);
};

 useEffect(() => {
  fetchUserByEmail(email);
}, [email]);


  useEffect(() => {
    const fetchCompanies= async (id) => {
      try {
        const url = `http://localhost:8023/company/getAllCompaniesExceptByInvestorId/${id}`;
        console.log( 'userrrr', user.id)
        const response = await axios.get(url);
        console.log("Compa:", response.data, response);
        setOtherCompanies(response.data);
        setError(null);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred during companies recovery.");
        }
      }
    };
    fetchCompanies(user.id);
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
    { Header: "RIB", accessor: "RIB", align: "center" }
  ];

  const rows = otherCompanies.map((item) => ({

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
  }));

  return { columns, rows };
}