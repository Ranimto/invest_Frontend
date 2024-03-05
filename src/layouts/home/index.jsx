import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import PageLayout from 'examples/LayoutContainers/PageLayout'
import DefaultNavbar from 'examples/Navbars/DefaultNavbar'

import background from 'assets/images/R8Xg21.webp'

import team1 from 'assets/images/team-4.jpg'
import team2 from 'assets/images/team-1.jpg'
import team3 from 'assets/images/team-3.jpg'
import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

 const signupNavigate =()=>{
  navigate("/authentication/sign-in");
 }
  return (
    <PageLayout >
        <DefaultNavbar/>

   {/* Section 1 */}
   <div className="container">
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <div className="background-image">
        <img src={background} alt="Background Image" />
      </div>
    </Grid>
    <Grid item xs={12}>
      <div className="text-container">
        <h1>Welcome to the future of investing</h1>
        <h4> Discover the edge of tomorrow&apos;s investments today with our powered </h4>
        <h4>strategies and let the Artificial Intelligence drive your financial success. </h4>
        <Button variant="contained" className='btnHome' onClick={signupNavigate} >Start now</Button>
      </div>
    </Grid>
  </Grid>
</div>

      {/* Section 2 */}
      <MDBox mb={3}>
        <Grid className='grid' container spacing={3}>
          <Card className='cardClass' xs={12} md={4}>
            <h4>Reliability and Transparency</h4>
          </Card>
          <Card className='cardClass' xs={12} md={4}>
            <h4>Innovation and Advanced Technology</h4>
          </Card>
          <Card className='cardClass' xs={12} md={4}>
            <h4>Commitment to User Success</h4>
          </Card>
        </Grid>
      </MDBox>
 


  
    <MDBox className='service_section'>

    <Grid container spacing={3} className="service-heading">
    <div className="section-heading">
    <h6>OUR SERVICES</h6>
    <h4>The <em>Best</em> Treasure That We Can Offer You </h4>
  </div>
   </Grid>

    <Grid container spacing={2} className="services_components">
        {/* Partie de gauche avec une liste de petites cartes alignées verticalement */}
        <Grid item xs={12} md={6}>
            <Grid container direction="column" spacing={2} className="services_items">
                
                <Grid item xs={12}>
                    <Card variant="outlined" className='texttCard'>
                        <p>Investment Management</p>
                    </Card>
                </Grid>
           
                <Grid item xs={12}>
                    <Card variant="outlined" className='texttCard'>
                        <p>Financial Analysis</p>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card variant="outlined" className='texttCard'>
                        <p>Portfolio Tracking</p>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card variant="outlined" className='texttCard'>
                        <p>Automatic Rebalancing</p>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card variant="outlined" className='texttCard'>
                        <p>Financial Prediction</p>
                    </Card>
                </Grid>
  
            </Grid>
        </Grid>
        {/* Partie de droite avec une carte contenant du texte */}
        <Grid item xs={12} md={6}>
            <Card variant="outlined" style={{ padding: '20px' }} className='serviceCard1'>
                <Typography variant="h5">About Us</Typography>
                <div className='content'>
                    <p><em>Welcome </em> to our company Proxym-IT, your trusted partner in investment management and financial analysis. At Proxym-IT, we leverage the power of artificial intelligence to provide cutting-edge solutions for investors seeking to optimize their portfolios.</p>
                    <p>At our site, we envision a revolutionary approach to investment management and financial analysis. Our platform serves as a beacon of innovation, where investors entrust their hard-earned capital with confidence, guided by the insightful prowess of artificial intelligence. Through the seamless integration of cutting-edge technology and astute financial acumen, we empower investors to navigate the intricate landscape of investment opportunities with clarity and precision.</p>
                    <p>But our mission extends beyond mere financial gain. We understand that behind every investment lies a story—a dream of securing a brighter future for oneself and loved ones, a desire to leave a lasting legacy, or perhaps a hope to make a meaningful impact in the world. It&apos;s these aspirations that fuel our commitment to excellence, driving us to continually refine our algorithms, expand our knowledge base, and pioneer new frontiers in investment management.</p>
                </div>
            </Card>
        </Grid>
    </Grid>
</MDBox>






    <MDBox className='teams_section' mb={3}>
      
     
        <Grid className="section-heading"  xs={12} md={4} >
        <h6>OUR TEAMS </h6>
        <h4>Our <em>Team</em> Is Composed By </h4>
        </Grid>
      
      
    <Grid className="teams_items"  xs={12} md={4} >      
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
    </Grid> 
    </MDBox>$



    <MDBox className='reviews_section' mb={3}>
      
      <div className="section-heading">
        <h6>Benefits </h6>
        <h4>Our <em>Main</em> Benefits  </h4>
      </div>
      
    <Grid  className='teams_items'> 

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

    </Grid> 
    </MDBox> 


    
    <MDBox className='clients_section' mb={3}>
      
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





    <MDBox className='service_section' mb={3}>
        <Grid container className='grid' spacing={3}>


          <Grid item xs={12} md={6}>
          <Card>heyy</Card>
          </Grid>

          <Grid item xs={12} md={6}>
           <Card>hey</Card>
          </Grid>
        </Grid>
      </MDBox>

      
  



    
    </PageLayout>

  )
}

export default Home