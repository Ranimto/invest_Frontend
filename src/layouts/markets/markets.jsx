import React from 'react';
import { Grid, Table } from '@mui/material';
import MDBox from 'components/MDBox';
import './style.css';
import MDButton from 'components/MDButton';
import AAPL from 'assets/images/AAPL.png'
import AMZN from 'assets/images/AMZN.png'
import MFST from 'assets/images/MFST.png'
import IBM from 'assets/images/IBM.png'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';

const Markets = () => {
  return (
    <DashboardLayout>
      <div className="background">
        <Grid item xs={12} md={6} lg={4} display="flex" gap="2px">
          <MDBox bgColor="#a7a4a4" coloredShadow="info" mb={3} className="marketsCard">
            <h6>AAPL</h6>
            <p>Apple</p>
            <img src={AAPL} alt="AAPL Image" className='MarketImg' />
          </MDBox>
          <MDBox bgColor="#9da9eb"  coloredShadow="primary" mb={3} className="marketsCard" >
            <Grid>
          <h6>IBM</h6> 
          <p>IBM</p>
          </Grid>
          <Grid>
          <img src ={IBM} className="MarketImg"/>
          </Grid>
          </MDBox>
          <MDBox bgColor="#a7a4a4"  coloredShadow="primary" mb={2} className="marketsCard">
           <h6>AMZN</h6>
           <p>Amazone</p> 
           <Grid>
          <img src ={AMZN} className="MarketImg"/>
          </Grid>
          </MDBox>
          <MDBox mb={2} className="marketsCard" bgColor="#73da84"  coloredShadow="info">
          <h6>MFST</h6> 
          <p>Microsoft</p> 
          <Grid>
          <img src ={MFST} className="MarketImg"/>
          </Grid>
          </MDBox>
        </Grid>
        
        <Grid className="section">
          <h3>Actifs Quotidiens</h3>
          <p>Discover the most important factors impacting the stock market.</p>

          <Grid item xs={12} md={6} lg={4} display="flex" gap="1px">
          <MDBox bgColor="success"  mb={3} className="marketsCardSection2">
            Symbol 
          </MDBox>
          <MDBox mb={3} bgColor="success"  className="marketsCardSection2">
            Symbol 
          </MDBox>
          <MDBox mb={2} className="marketsCardSection2">
            Symbol 
          </MDBox>
          <MDBox mb={2} className="marketsCardSection2">
            Symbol 
          </MDBox>
          <MDBox mb={2} className="marketsCardSection2">
            Symbol 
          </MDBox>
          <MDBox mb={2} className="marketsCardSection2">
            Symbol 
          </MDBox>
        </Grid>
        </Grid>

        <Grid className="section" >
          <h3>Market Analyse</h3>
          <p>On the basis of recognition from top analysts.</p>
          <Table className='tableHeader'>
          <thead >
            <th>Stocks</th>
            <th> Actual price</th>
            <th>Close</th>
            <th>Open</th>
            <th>ACTIONS</th>
          </thead>

            <tbody>
           <tr>
             <td>AAPL</td>
             <td>1525</td>
             <td>466</td>
             <td>6546</td>
             <td> <MDButton className="btnMarket">Invest</MDButton></td>
           </tr>
           <tr>
             <td>IBM</td>
             <td>484</td>
             <td>514</td>
             <td>514</td>
             <td> <MDButton className="btnMarket">Invest</MDButton></td>
           </tr>
            </tbody>
          </Table>
          
        </Grid>

        <Grid  className="section">
          <h3>popular choice</h3>
          <p>Based on your profile.</p>

          <Grid item xs={12} md={6} lg={4} display="flex" gap="1px">
          <MDBox mb={3} className="marketsCardSection2">
            Symbol 
          </MDBox>
          <MDBox mb={3} className="marketsCardSection2">
            Symbol 
          </MDBox>
          <MDBox mb={2} className="marketsCardSection2">
            Symbol 
          </MDBox>
          <MDBox mb={2} className="marketsCardSection2">
            Symbol 
          </MDBox>
          <MDBox mb={2} className="marketsCardSection2">
            Symbol 
          </MDBox>
          <MDBox mb={2} className="marketsCardSection2">
            Symbol 
          </MDBox>
        </Grid>
        </Grid>
        </div>
        </DashboardLayout>
  );
};

export default Markets;
