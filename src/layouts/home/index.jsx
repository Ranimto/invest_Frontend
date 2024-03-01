import { Box, Button, Card, CardContent, Grid } from '@mui/material';
import MDBox from 'components/MDBox';
import PageLayout from 'examples/LayoutContainers/PageLayout'
import DefaultNavbar from 'examples/Navbars/DefaultNavbar'
import team1 from 'assets/images/team-4.jpg'
import team2 from 'assets/images/team-1.jpg'
import team3 from 'assets/images/team-3.jpg'
import React from 'react'
import './style.css'

const Home = () => {
  return (
    <PageLayout >
        <DefaultNavbar/>

   <div className="container">
       <div className="home">
          <h1>Welcome to the future of investing</h1>
          <h4> Discover the edge of tomorrow&apos;s investments today with our powered </h4>
          <h4>strategies and let the Artificial Intelligence drive your financial success. </h4>  
          <Button variant="contained" className='btnHome' >Start now</Button>
        </div>
        <div className="section">
      </div>
    </div>

    <MDBox mb={3}>
       <Grid className='grid' container spacing={3} >
          <Card className='cardClass' xs={12} md={4} >
              <h4>Reliability and Transparency</h4>
            </Card>
            <Card className='cardClass'  xs={12} md={4} >
            <h4>Innovation and Advanced Technology</h4>
            </Card>
            <Card className='cardClass'  xs={12} md={4} >
            <h4>Commitment to User Success</h4>
            </Card>
        </Grid>
    </MDBox> 
 
    <MDBox className='service_section'>

    <Grid className='grid' container spacing={3} >
      
      <div className="section-heading">
        <h6>OUR SERVICES</h6>
        <h4>The <em>Best</em> Treasure That We Can Offer You </h4>
      </div>
       
      <div className='service_items'>
          <div className='items' spacing={3}>
            <ul className='serviceList' type='none'>
                <li>
                <Card className='item'  xs={12} md={4} >
                 <p>Investment Management</p>
               </Card>
                </li>
                <li>
                <Card className='item'  xs={12} md={4} >
                 <p>Financial Analysis</p>
               </Card>
                </li>
                <li>
                <Card className='item'  xs={12} md={4} >
                 <p>Portfolio Tracking</p>
               </Card>
                </li>
                <li>
                <Card className='item'  xs={12} md={4} >
                <p>Optimized Asset Allocation</p>
              </Card>
                </li>
                <li>
                <Card className='item'  xs={12} md={4} >
                <p>Automatic Rebalancing</p>
                </Card>
                </li>
               <li>
               <Card className='item'  xs={12} md={4} >
                <p>Machine Learning Prediction</p>
              </Card>   
              </li>
              </ul>
          </div>

            <Card className='itemCard' xs={12} md={4} >
            <div className='content'>
              <p><em>Welcome </em> to our company Proxym-IT, your trusted partner in investment management and financial analysis. At Proxym-IT, we leverage the power of artificial intelligence to provide cutting-edge solutions for investors seeking to optimize their portfolios.</p>
              <p>At our site, we envision a revolutionary approach to investment management and financial analysis. Our platform serves as a beacon of innovation, where investors entrust their hard-earned capital with confidence, guided by the insightful prowess of artificial intelligence. Through the seamless integration of cutting-edge technology and astute financial acumen, we empower investors to navigate the intricate landscape of investment opportunities with clarity and precision.</p>
              <p>But our mission extends beyond mere financial gain. We understand that behind every investment lies a story—a dream of securing a brighter future for oneself and loved ones, a desire to leave a lasting legacy, or perhaps a hope to make a meaningful impact in the world. It&apos;s these aspirations that fuel our commitment to excellence, driving us to continually refine our algorithms, expand our knowledge base, and pioneer new frontiers in investment management.</p>
            </div>
            </Card>       
      </div> 
      </Grid>
    </MDBox>


    <MDBox className='service_section' mb={3}>
      
      <div className="section-heading">
        <h6>OUR TEAMS </h6>
        <h4>Our <em>Team</em> Is Composed By </h4>
      </div>
      <div className='teams_items'>  
           
      <Card className='team_card'  xs={12} md={4} >
            <img src={team1}/> 
            <h6>&apos;&apos;Name&apos;&apos;,<em> Profession</em></h6>
    
      </Card> 
      <Card className='team_card'  xs={12} md={4} >
      <img src={team2}/> 
      <h6>&apos;&apos;Name&apos;&apos;,<em> Profession</em></h6>
      </Card> 

      <Card className='team_card'  xs={12} md={4} >
             <img src={team3}/> 
             <h6>&apos;&apos;Name&apos;&apos;,<em> Profession</em></h6>
      </Card> 

      <Card className='team_card'  xs={12} md={4} >
              <img src={team1}/> 
              <h6>&apos;&apos;Name&apos;&apos;,<em> Profession</em></h6>
      </Card> 
      
      </div> 
    </MDBox>

    <MDBox className='reviews_section' mb={3}>
      
      <div className="section-heading">
        <h6>Benefits </h6>
        <h4>Our <em>Main</em> Benefits  </h4>
      </div>
      
      <div className='reviews_items'>      
      <Card className='reviews_card'  xs={12} md={4} >
              <p> 5.000TND Minimum deposit</p>
      </Card> 
      <Card className='reviews_card'  xs={12} md={4} >
              <p>0% Commissions</p>
      </Card> 

      <Card className='reviews_card'  xs={12} md={4} >
      <p>1.000 TND Minimum investment amount</p>    
      </Card> 

      <Card className='reviews_card'  xs={12} md={4} >
              <p>0% Fees</p>
      </Card>       
      </div> 
    </MDBox> 


    
    <MDBox className='service_section' mb={3}>
      
    <div className="section-heading">
        <h6>Reviews </h6>
        <h4>What <em>They </em> Think About Us </h4>
      </div>
      <div className='clients_items'>  
           
      <Card className='client_card'  xs={12} md={4} >
           
            <h6>&apos;&apos;Name&apos;&apos;,<em> Profession</em></h6>
    
      </Card> 
      <Card className='client_card'  xs={12} md={4} >
      <p>hey</p>
      </Card> 

      <Card className='client_card'  xs={12} md={4} >
       <p>hey</p>
      </Card> 

      <Card className='client_card'  xs={12} md={4} >
      <p>hey</p>
      </Card> 
      
      </div> 
    </MDBox>
    </PageLayout>

  )
}

export default Home