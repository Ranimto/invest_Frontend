import { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import './style.css';
import DataTable from "examples/Tables/DataTable";
import data from "layouts/activity/ActivityData";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import NavbarPerformance from "layouts/navbarPerformance";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Activity() {
  const { columns, rows } = data(1);
  const [filteredData, setFilteredData] = useState([]);

  
  const handleDataFiltered = (data) => {
    setFilteredData(data);
  }

  return (
    <DashboardLayout>
    
     
    <NavbarPerformance />
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <h6 className="userAcitivityTitle">
          Historical <strong>Activities</strong> 
          </h6>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}          
        />
      </MDBox>
    </Card>
    </DashboardLayout>
  );
}

export default Activity;
