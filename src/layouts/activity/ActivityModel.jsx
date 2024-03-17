import { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import './style.css';
import DataTable from "examples/Tables/DataTable";
import data from "layouts/activity/ActivityData";

function ActivityModel() {
  const { columns, rows } = data(1);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <h6 className="title">
           Activities 
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
  );
}

export default ActivityModel;
