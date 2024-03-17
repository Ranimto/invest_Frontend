import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Data() {
  const [companies, setCompanies] = useState([]);
  const [Company, setCompany] = useState({
    name:"",
    activity:"",
    address:"",
    description:"",
    nbOfInvestors:"",
    liquidityRatio:"",
    interestCoverageRatio: "",
    salesGrowthRatio:"",
    profitabilityRatio: "",
    rib:""
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
        const url = `http://localhost:8023/company/getCompaniesByInvestorId/${id}`;
        const response = await axios.get(url);
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
    fetchCompanies(user.id);
  }, [user.id]);

 

  const columns = [
    { Header: "name", accessor: "name", width: "45%", align: "left" },
    { Header: "activity", accessor: "activity", align: "left" },
    { Header: "address", accessor: "address", align: "center" },
    { Header: "nbOfInvestors", accessor: "nbOfInvestors", align: "center" },
    { Header: "debtRatio", accessor: "debtRatio", align: "center" },
    { Header: "liquidityRatio", accessor: "liquidityRatio", align: "center" },
    { Header: "interestCoverageRatio", accessor: "interestCoverageRatio", align: "center" },
    { Header: "salesGrowthRatio", accessor: "salesGrowthRatio", align: "center" },
    { Header: "profitabilityRatio", accessor: "profitabilityRatio", align: "center" },
    { Header: "rib", accessor: "rib", align: "center" },
  ];

  const rows = companies.map((item) => ({

    name: (
      <h3 className="CompanyName">
      <Link to={`/stock/${item.name}`} className="CompanyName">{item.name}</Link>
      </h3>
    ),
   activity: (
      <h3>
       {item.activity}
      </h3>
    ),

    description: (
      <h3>
       {item.description} TND
      </h3>
    ),
    address: (
      <h3>
        {item.address}
      </h3>
    ),
    nbOfInvestors: (
      <h3>
       {item.nbOfInvestors}
      </h3>
    ),

    debtRatio: (
      <h3>
       {item.debtRatio}
      </h3>
    ),

    liquidityRatio: (
      <h3>
       {item.liquidityRatio}
      </h3>
    ),

    interestCoverageRatio: (
      <h3>
       {item.interestCoverageRatio}
      </h3>
    ),
    salesGrowthRatio: (
      <h3>
       {item.salesGrowthRatio}
      </h3>
    ),
    profitabilityRatio: (
      <h3>
       {item.profitabilityRatio}
      </h3>
    ),

    rib: (
      <h3>
       {item.rib}
      </h3>
    ),
  }));

  return { columns, rows };
}