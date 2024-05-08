import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import PageLayout from 'examples/LayoutContainers/PageLayout'
import DefaultNavbar from 'examples/Navbars/DefaultNavbar'
import ComponentNavbar from 'examples/Navbars/ComponentNavbar'
import background from 'assets/images/convert-data-to-insightful-analytics-to-impact-decision-making.webp'
import mobile from 'assets/images/1.PNG'
import mobile1 from 'assets/images/Rydoo-Phone-Mockup-Header-1-960x772.png' 
import contact from 'assets/images/Contact-Us.jpg'
import logo from 'assets/images/Logo-Proxym-2020.png'
import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
   const [contactForm,setContactForm]=useState({})

  const isAuthenticated = useSelector((state)=>state.auth.value.isAuthenticated);
 const signupNavigate =()=>{
  navigate("/authentication/sign-in");
 }

 const handleChange = (event) => {
  const { name, value } = event.target;
  setContactForm({ ...contactForm, [name]: value });
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
        <motion.h1
         initial={{ opacity: 0, y: -20 }} 
         animate={{ opacity: 1, y: 0 }} 
         transition={{ 
          duration: 1.5, 
          delay: 0,
          repeat: 2,
        }} 
        >Welcome to the future of investing
        </motion.h1>
        <motion.div  
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ 
          duration: 1.5, 
          delay: 0.5,
          repeat: 2,
        }}  >
        <h4> Discover the edge of tomorrow&apos;s investments today with our powered </h4>
        <h4>strategies and let the Artificial Intelligence drive your financial success. </h4>
        </motion.div>
        <Button variant="contained" className='btnHome' onClick={signupNavigate} >Start now</Button>
      </div>
    </Grid>
  </Grid>
</div>
  
    <MDBox className='service_section'>

    <Grid container spacing={3} className="service-heading">
    <div className="section-heading">
     </div>
   </Grid>

    <Grid container spacing={2} className="services_components">
        <Grid item xs={12} md={4}>    
          <motion.img src={mobile1} style={{width:'120%',marginLeft:'-25%',marginTop:'3%' }}
           initial={{ opacity: 0, scale: 0 }} 
           animate={{ opacity: 1, scale: 1 }} 
           transition={{ 
            duration: 2.5, 
            delay: 0,
            repeat: 1,
          }} 
            />     
        </Grid>
        <Grid item xs={12} md={7}>
            <Card variant="outlined" style={{ padding: '20px' }} className='serviceCard1'>
                <Typography variant="h5">Who we are ?</Typography>
                <div className='content'>
                    <p><em style={{fontSize :"21px"}}>O</em>ur company Proxym-IT, your trusted partner in investment management and financial analysis. At Proxym-IT, we leverage the power of artificial intelligence to provide cutting-edge solutions for investors seeking to optimize their portfolios.</p>
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
          <Grid item className='cardClass' xs={12} md={4}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ 
              duration: 3, 
              delay: 2,
              repeat: 4,
            }}  >
            <h4><strong>Now</strong> Money</h4>
            <p>Cash Account</p>   
            </motion.div>     
          </Grid>
          <Grid item className='cardClass' xs={12} md={4}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ 
              duration: 3, 
              delay: 2,
              repeat: 4,
            }}  >
            <h4>
               <strong>Soon</strong>  Money</h4>
            <p>Automated Tracking Portfolio</p>
            </motion.div>
          </Grid>
          <Grid item className='cardClass' xs={12} md={4}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ 
              duration: 3, 
              delay: 2,
              repeat: 4,
            }}  >
             <h4><strong>Later</strong> Money</h4>
            <p>Automated Investing Account</p>
            </motion.div>
          </Grid>
        </Grid>
      </MDBox>



      <MDBox className='clients_section' mb={3}>
    <div className="section-heading">
        <h4>Tailor <em>Your Risk </em>  To Suit Your Investment Ambitons</h4>
      </div>
      <div className='clients_items'>  
           
      <Card className='quote_card'  xs={12} md={4} >
           <h4>A smarter way to manage stocks</h4>
           <p>We decode the market for you, empowering faster, more strategic stock decisions. Dive into a multitude of themes and explore numerous themes and opportunities, delve into data
              and insights, and invest seamlessly.</p>
              <Button variant="contained" className='btnHomee' onClick={signupNavigate} >Start now</Button>
      </Card> 
      <Card className='quote_card'  xs={12} md={4} >
        <h4>Automated index investing</h4>
      <p>Whether up or down, our expertly constructed portfolios help you stay diversified to achieve your goals. Limit your risk,
         minimize your taxes and maximize your returns  with built-in automation.</p>
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
<Grid container spacing={1} className="services">
    <Grid   item xs={12} md={7} >
        <Grid container direction="column" spacing={2} className="services_items"   >
            <Grid item xs={12}>
                <Card variant="outlined" className='LeftMobileCard'>
                   <h4>Stake all your money in the right place</h4>
                   <p>Explore a world of financial possibilities with our comprehensive suite of tools and resources. 
                      From personalized investment strategies to cutting-edge portfolio management, we empower you to
                      navigate the complexities of the financial markets with confidence. Whether you are a seasoned investor or just starting out,
                      our platform offers the expertise and support you need to succeed. Join us on the journey to
                      financial freedom and unlock your full potential today.</p>
                      <Button variant="contained" className='btnHome' onClick={signupNavigate} >don&apos;t miss out</Button>
                </Card>
            </Grid>
        </Grid>
    </Grid>
    <Grid item xs={12} md={4}>    
    <motion.img 
            src={mobile} 
            style={{width:'120%', margin:'-5% 0 0 -15%'}} 
            initial={{ opacity: 0, x: -90 }} 
            animate={{ opacity: 10, x: 0 }} 
            transition={{ 
              duration: 3, 
              delay: 0.5,
              repeat: 6,
              yoyo: true
            }} 
          />     
    </Grid>
</Grid>
</MDBox>


 <MDBox mb={3} className="sectionn3" style={{marginTop:"8%"}}>
        <Grid className='gridSection3' container spacing={3}>
        <Grid item className='reviews_card'  xs={12} md={3} >
         <p> <strong> 5.000TND +</strong> </p>
         <p>Minimum deposit</p>
        </Grid> 
        <Grid item className='reviews_card'  xs={12} md={3} >
              <p><strong>0% </strong></p>
              <p>Commissions</p>
      </Grid> 
      <Grid item className='reviews_card'  xs={12} md={3} >
      <p><strong> 1.000TND + </strong>  </p>
      <p>Minimum investment</p>    
      </Grid> 

      <Grid item className='reviews_card'  xs={12} md={3} >
              <p><strong>0%  </strong></p>
              <p> Fees</p>
      </Grid> 
        </Grid>
      </MDBox>

      <MDBox   spacing={3} className="contactSection" style={{  marginTop:"5%"}}> 
     
      <div className="section-heading" style={{ textAlign: "center" ,marginLeft:"45%" }}>
         <h4 > Contact <em> Us </em></h4>
         <p style={{ textAlign: "center" , fontWeight:"100" ,fontSize:"15px" , color:'b'}}>We would love to hear from you!</p>
        </div>
       
        <Grid container spacing={3} >

        <Grid item xs={12} sm={3} >
       <motion.img 
        src={contact} alt="Image" style={{ width: '140%', margin:"20% 0 0 45%"}}
       initial={{ opacity: 0, scale: 0 }} 
       animate={{ opacity: 1, scale: 1 }} 
       transition={{ 
       duration: 4, 
       delay: 2,
       repeat:1
       }}/>
       </Grid> 

        <Grid item xs={12} sm={8}>
        <form  className="contact">
          <TextField 
          color='white'
          style={{paddingBottom:"3%"}}
          label="Name"
          variant="standard"
          name="Name"
          value={contactForm.name}
          onChange={handleChange}
          type="text"
          fullWidth
          required
        />
      <Grid display="flex" gap="3%" >
            <TextField
            style={{paddingBottom:"3%"}}
          label="Email"
          variant="standard"
          name="email"
          value={contactForm.email}
          onChange={handleChange}
          type="text"
          fullWidth
          required
        />

          <TextField
          style={{paddingBottom:"3%"}}
          label="Phone Number"
          variant="standard"
          name="phone"
          value={contactForm.phone}
          onChange={handleChange}
          fullWidth
          type="text"
          required
        />
      </Grid>               
        <TextField 
        label="Message" 
        name="message"
        variant="standard"
        value={contactForm.message}
        onChange={handleChange}
        required 
        fullWidth
        multiline/>
        <Button className="btnHome" type="submit" style={{marginLeft:"-10%"}}>Send Message</Button>
      </form>
      </Grid>
      </Grid>
    </MDBox>
 

<MDBox spacing={3} className="footerSection" style={{marginTop:"6%"}}>
<footer className="footer"  >
      <Grid className="footerContainer">

        <Grid display="flex" gap="10%">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <img src={logo} alt="Logo"/>
      <Grid display="flex" gap ="4%" className='icons'>
       <span> <FacebookIcon /></span>
       <span><TwitterIcon /></span> 
       <span><InstagramIcon /></span>  
       <span><LinkedIn /></span>  
      </Grid>
    </div>

          <div >
            <h5>Solutions</h5>
              <ul type="none">
                <li>Retail Banking</li>
                <li>Corporate Banking</li>
                <li>Microfinance</li>
                <li>Non-Life Insurance</li>
                <li>Life Insurance</li>
              </ul>
          </div>

          <div className="col">
          <h5>Platforms</h5>
          <ul type="none">
                <li>Digital Platform</li>
                <li>Omnichannel Banking</li>
                <li>Digital Onboarding</li>
                <li>Digital Engage</li>
                <li>Digital Lending</li>
                <li>Digital Branch</li>
              </ul>
          </div>

          <div className="col">
            <h5>Services</h5>
            <ul type="none">
                <li>Implementation Services</li>
                <li>Support Services</li>
                <li>Managed Agile Services</li>
              </ul>
          </div>

          <div className="col">
            <h5>Careers</h5>
            <ul type="none">
                <li>Open Positions</li>
                <li>Corporate University Start-U</li>
                <li>Managed Agile Services</li>
              </ul>
          </div>
        </Grid>
      </Grid>
    </footer>

</MDBox>
    </PageLayout>

  )
}

export default Home