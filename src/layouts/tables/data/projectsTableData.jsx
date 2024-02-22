/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
*/
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const Project = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <h5 className="name">
        {name}
      </h5>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <h5>
        {value}%
      </h5>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "project", accessor: "project", width: "30%", align: "left" },
      { Header: "budget", accessor: "budget", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        project: <Project name="Asana" />,
        budget: (
          <h5>$2,500</h5>
        ),
        status: (
          <h5>working</h5>
        ),
        completion: <Progress color="info" value={60} />,
        action: (
          <h5>
            <Icon>more_vert</Icon>
          </h5>
        ),
      },
      {
        project: <Project name="Github" />,
        budget: (
          <h5>$5,000</h5>
        ),
        status: (
          <h5> done</h5>
        ),
        completion: <Progress color="success" value={100} />,
        action: (
          <h5>
            <Icon>more_vert</Icon>
          </h5>
        ),
      },
      
      {
        project: <Project image={logoInvesion} name="Invesion" />,
        budget: (
          <h5>$2,300 </h5>
        ),
        status: (
          <h5>done</h5>
        ),
        completion: <Progress color="success" value={100} />,
        action: (
          <h5>
            <Icon>more_vert</Icon>
          </h5>
        ),
      },
    ],
  };
}
