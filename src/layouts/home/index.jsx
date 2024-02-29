import { Box, Button, Card, CardContent, Grid } from '@mui/material';
import MDBox from 'components/MDBox';
import PageLayout from 'examples/LayoutContainers/PageLayout'
import DefaultNavbar from 'examples/Navbars/DefaultNavbar'
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
          <Button variant="contained" >Start now</Button>
        </div>
        <div className="section">
      </div>
    </div>



    <MDBox mb={3}>
       <Grid className='grid' container spacing={3} >
          <Card className='card' xs={12} md={4} >
              <p>heyy</p>
            </Card>
            <Card className='card'  xs={12} md={4} >
              <p>heyy</p>
            </Card>
            <Card className='card'  xs={12} md={4} >
              <p>heyy</p>
            </Card>
        </Grid>
    </MDBox> 


    
    <MDBox className='service_section' mb={3}>
      
      <div className="section-heading">
        <h6>OUR SERVICES</h6>
        <h4>The <em>Best</em> Treasure That We Can Offer You </h4>
      </div>
       
      <div className='service_items'>
          <div className='items' >
            <ul className='serviceList' type='none'>
                <li>
                <Card className='item'  xs={12} md={4} >
                <p>section1</p>
              </Card>
                </li>
                <li>
                <Card className='item'  xs={12} md={4} >
                <p>section1</p>
              </Card>
                </li>
                <li>
                <Card className='item'  xs={12} md={4} >
                <p>section1</p>
              </Card>
                </li>
              </ul>
          </div>

            <Card className='item_card'  xs={12} md={4} >
              <p>section2</p>
            </Card>       
      </div> 
    </MDBox>


        
   
    </PageLayout>

  )
}

export default Home