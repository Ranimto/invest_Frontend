import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/profile2/components/Header";
import './profil.css';


function Overview2() {

   return (
    <DashboardLayout>
      <DashboardNavbar />
    <MDBox mb={2} />
      <Header>    
      </Header>     
      <Footer />
    </DashboardLayout>
  );
}

export default Overview2;
