import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import PageLayout from 'examples/LayoutContainers/PageLayout'
import DefaultNavbar from 'examples/Navbars/DefaultNavbar'
import ComponentNavbar from 'examples/Navbars/ComponentNavbar'
import background from 'assets/images/R8Xg21.webp'
import team1 from 'assets/images/team-4.jpg'
import team2 from 'assets/images/team-1.jpg'
import team3 from 'assets/images/team-3.jpg'
import team4 from 'assets/images/ranim.png'
import mobile from 'assets/images/phone_1-min.png'
import mobile1 from 'assets/images/Rydoo-Phone-Mockup-Header-1-960x772.png'
import AAPL from 'assets/images/AAPL.png'
import AMZN from 'assets/images/AMZN.png'
import XOM from 'assets/images/ExxonMobil-Logo.png'
import GOOGL from 'assets/images/GOOGL.png'
import MFST from 'assets/images/MFST.png'
import IBM from 'assets/images/IBM.png'
import tesla from 'assets/images/tesla.png'
import jpm from 'assets/images/jpm.png'
import jnj from 'assets/images/jnj.png'
import fb from 'assets/images/fb.png'

import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel';

const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
   const [isScrolling, setIsScrolling] = useState(true);

  const isAuthenticated = useSelector((state)=>state.auth.value.isAuthenticated);
 const signupNavigate =()=>{
  navigate("/authentication/sign-in");
 }


 
useEffect(() => {
    const container = containerRef.current;

    const scroll = () => {
      if (container && isScrolling) {
        container.scrollLeft += 2; // Vitesse de défilement
      }
    };

    const interval = setInterval(scroll, 50); // Intervalle de temps entre chaque défilement

    return () => clearInterval(interval);
  }, [isScrolling]);

  const handleScrollStart = () => {
    setIsScrolling(false);
  };

  const handleScrollEnd = () => {
    setIsScrolling(true);
  };
  return (
    <PageLayout >
     {isAuthenticated ?  <ComponentNavbar/>:
        <DefaultNavbar/>}

   {/* Section 1 */}
   <div className="container">
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <div className="background-image">
        <img  src={background} alt="Background2 Image" />

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

<MDBox mb={3}>
      <div
        className="scrollable-container"
        ref={containerRef}
       
      >
        <Grid className="grid" container spacing={6} >
          <img src={AAPL} alt="AAPL Image" />
          <img src={IBM} alt="IBM Image" />
          <img src={AMZN} alt="AMZN Image" />
          <img src={XOM} alt="XOM Image" />
          <img src={GOOGL} alt="GOOGL Image" />
          <img src={MFST} alt="MFST Image" />
          <img src={tesla} alt="tesla Image" />
          <img src={jpm} alt="jpm Image" />
        </Grid>
      </div>
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
          <img src={mobile1} style={{width:'75%',marginLeft:'10%',marginTop:'3%' }}/>     
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



 {/* Section 2 */}
 <MDBox mb={3} className="sectionn3">
        <Grid className='gridSection3' container spacing={3}>
          <Grid className='cardClass' xs={12} md={4}>
            <h4><strong>Now</strong> Money</h4>
            <p>Cash Account</p>        
          </Grid>
          <Grid className='cardClass' xs={12} md={4}>
            <h4> <strong>Soon</strong>  Money</h4>
            <p>Automated Tracking Portfolio</p>
          </Grid>
          <Grid className='cardClass' xs={12} md={4}>
             <h4><strong>Later</strong> Money</h4>
            <p>Automated Investing Account</p>
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
              <img src={team4}/> 
              <h6>&apos;&apos;Name&apos;&apos;,<em> Profession</em></h6>
      </Card>   
    </Grid> 
    </MDBox>



    <MDBox className='reviews_section' mb={3}>
      
      <div className="section-heading">
        <h6>Benefits </h6>
        <h4>Ready <em>For</em> Your Money&apos;s New Home? </h4>
      </div>
      
    <Grid  className='reviews_items'> 

      <Grid className='reviews_card'  xs={12} md={4} >
      <p> <strong> 5.000TND +</strong> </p>
              <p>Minimum deposit</p>
      </Grid> 
      <Grid className='reviews_card'  xs={12} md={4} >
              <p><strong>0% </strong></p>
              <p>Commissions</p>
      </Grid> 

      <Grid className='reviews_card'  xs={12} md={4} >
      <p><strong> 1.000TND + </strong>  </p>
      <p>Minimum investment</p>    
      </Grid> 

      <Grid className='reviews_card'  xs={12} md={4} >
              <p><strong>0%  </strong></p>
              <p> Fees</p>
      </Grid> 

    </Grid> 
    </MDBox> 


    
    <MDBox className='clients_section' mb={3}>
      
    <div className="section-heading">

        <h4>Tailor <em>Your Risk </em>  To Suit Your Investment Ambitons</h4>
      </div>
      <div className='clients_items'>  
           
      <Card className='quote_card'  xs={12} md={4} >
           <h4>A smarter way to discover and buy stocks</h4>
           <p>We decode the market for you, empowering faster, more strategic stock decisions. Dive into a multitude of themes and explore numerous themes and opportunities, delve into data
              and insights, and invest seamlessly.</p>
              <Button variant="contained" className='btnHomee' onClick={signupNavigate} >Start now</Button>
      </Card> 
      <Card className='quote_card'  xs={12} md={4} >
        <h4>Automated, diversified index investing</h4>
      <p>Whether up or down, our expertly constructed portfolios help you stay diversified to achieve your goals. Limit your risk,
         minimize your taxes and maximize your returns - all with built-in automation.</p>
         <Button variant="contained" className='btnHomee' onClick={signupNavigate} >Start now</Button>
      </Card> 

      <Card className='quote_card'  xs={12} md={4} >
      <h4>Diversified investments options </h4>
       <p>Unlock wealth effortlessly with our diversified options. Earn dividends with low-risk bonds, automate long-term investments, and more.Chart your financial future with confidence. From smart investments to savvy saving.</p>
       <Button variant="contained" className='btnHomee' onClick={signupNavigate} >Start now</Button>
      </Card> 

      <Card className='quote_card'  xs={12} md={4} >
        <h4>Unlock Your Financial Potential </h4>
      <p>Chart your financial future with confidence. From smart investments to savvy saving strategies, we are here to guide you every step of the way. We are here to support you through every twist and turn</p>
      <Button variant="contained" className='btnHomee' onClick={signupNavigate} >Start now</Button>
      </Card> 
      
      </div> 
    </MDBox>




<MDBox className='CardComponents'>

<Grid container spacing={3} className="service-heading">
<div className="section-heading">
<h4> <em>Maximize </em> your money&apos;s momentum with ease </h4>
</div>
</Grid>

<Grid container spacing={1} className="services_components">
    {/* Partie de gauche avec une liste de petites cartes alignées verticalement */}
    <Grid item xs={12} md={6} >
        <Grid container direction="column" spacing={2} className="services_items"  style={{marginTop:"-10%"}} >
            
            <Grid item xs={12}>
                <Card variant="outlined" className='LeftMobileCard'>
                   <h4>Stake all your money in the right place</h4>
                   <p>Explore a world of financial possibilities with our comprehensive suite of tools and resources. 
                      From personalized investment strategies to cutting-edge portfolio management, we empower you to
                      navigate the complexities of the financial markets with confidence. Whether you are a seasoned investor or just starting out,
                      our platform offers the expertise and support you need to succeed. Join us on the journey to
                      financial freedom and unlock your full potential today.</p>
                      <Button variant="contained" className='btnHomee' onClick={signupNavigate} >don&apos;t miss out</Button>
                </Card>
            </Grid>
        </Grid>
    </Grid>
    {/* Partie de droite avec une carte contenant du texte */}
    <Grid item xs={12} md={6}>    
          <img src={mobile} style={{width:'80%'}}/>     
    </Grid>
</Grid>
</MDBox>


    </PageLayout>

  )
}

export default Home