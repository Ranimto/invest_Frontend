import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

function BuyTransaction({ color, icon, toAccountNo, transferAmount ,transferDate, transferDescription}) {


  return (
    <MDBox key={name} component="li" py={1} pr={2} mb={1}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDButton variant="outlined" color={color} iconOnly circular>
              <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
            </MDButton>
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            <h6>
              {toAccountNo}
            </h6>
            <p>
              {transferDescription}
            </p>
            <p style={{color:"rgba(5, 8, 59, 0.903)" , fontSize:"13px"}}> 
         <strong>{transferDate}</strong>  
        </p>
          </MDBox>
        </MDBox>
        <h6 className="title" >
          {transferAmount}$
        </h6>
      
       
      </MDBox>
    </MDBox>
  );
}

// Typechecking props of the Transaction
BuyTransaction.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  icon: PropTypes.node,
  toAccountNo: PropTypes.string,
  transferDescription: PropTypes.string,
  transferAmount: PropTypes.number,
  transferDate: PropTypes.string,
};

export default BuyTransaction;
