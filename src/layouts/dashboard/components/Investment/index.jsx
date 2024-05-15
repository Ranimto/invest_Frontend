import { useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import './style.css';
import DataTable from "examples/Tables/DataTable";
import data from "layouts/dashboard/components/Investment/data";

function Investment() {
  const { columns, rows } = data(1);
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  
  const renderMenu = (
    
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={() => handleEdit(item)}>Duration Modification</MenuItem>
      <MenuItem onClick={closeMenu}>Update Duration</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={2} className="investt" >
        <MDBox >
          <h6 className="title">
            Investments
          </h6>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <h3 className="caption"> {rows.length} investments</h3>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{columns, rows }}
          showTotalEntries={false}
          isSorted={false}          
          entriesPerPage={false}
        />
      </MDBox>


 

    </Card>
  );
}

export default Investment;
