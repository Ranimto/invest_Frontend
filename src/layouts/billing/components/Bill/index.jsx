import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import './style.css';

function Bill({ name,profession,email,number,savings,deposits,earned, posted,status}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <p className="name">
            {name}
          </p>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              
            </MDBox>
        
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <p>
          Investor profession:&nbsp;&nbsp;&nbsp; <span className="Cname">{profession} </span>   
          </p>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <p>
            Email Address:&nbsp;&nbsp;&nbsp;<span className="Cname">{email}</span>   
          </p>
        </MDBox>
        <p>
        Savings Product Name:&nbsp;&nbsp;&nbsp;<span className="Cname">{savings}</span>
        </p>
        
        <p>
        Account Number:&nbsp;&nbsp;&nbsp;<span className="Cname">{number}</span>
        </p>
        
        <p>
        Total Deposits:&nbsp;&nbsp;&nbsp;<span className="Cname">{deposits}</span>
        </p>
        <p>
        Total Interest Earned:&nbsp;&nbsp;&nbsp;<span className="Cname">{earned}</span>
        </p>
        <p>
        Total Interest Posted:&nbsp;&nbsp;&nbsp;<span className="Cname">{posted}</span>
        </p>
        <p>
        Status:&nbsp;&nbsp;&nbsp;<span className="Cname">{status}</span>
        </p>
      </MDBox>
    </MDBox>
  );
}


// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string,
  profession: PropTypes.string,
  email: PropTypes.string,
  number: PropTypes.string,
  savings: PropTypes.string,
  deposits: PropTypes.number,
  earned: PropTypes.number,
  posted: PropTypes.number,
  status:  PropTypes.string,
 
};

export default Bill;
