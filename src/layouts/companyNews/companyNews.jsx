import { Card, Grid } from '@mui/material'
import PageLayout from 'examples/LayoutContainers/PageLayout'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import './style.css'
import axios from 'axios';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { motion } from 'framer-motion';

const CompanyNews = () => {
    const [newsData,setNewsData]=useState([]);
    const {company}=useParams();
    const [filteredData, setFilteredData] = useState([]);

    const fetchData =async()=>{
        const response = await axios.get(`http://localhost:8023/stockData/newsData/${company}`);
        console.log( response.data.feed);
        setNewsData(response.data.feed);
        setFilteredData(response.data.feed);
    }  

    const handleDataFiltered = (data) => {
      setFilteredData(data);
    }

    useEffect(() => {
        fetchData('AAPL')
    },['AAPL'])

  return (
    <DashboardLayout>
      <DashboardNavbar allData={newsData} onDataFiltered={handleDataFiltered}/>
      {console.log("filteredData",filteredData)}
      {console.log("news",newsData)}
       <Grid>
        <div className="Header">
         <h2 className="title"> <KeyboardDoubleArrowRightIcon/> News of the day <KeyboardDoubleArrowRightIcon/>Latest Financial Stories 
         <span className='symboll'> || {!(company==':company')? company: 'AAPL'} </span></h2>
         <h2 className="title" style={{paddingLeft:'47%'}}><Link to='/news/AAPL'>Actualities</Link> <KeyboardDoubleArrowRightIcon/><Link to='/dashboard'> Dashboard</Link></h2>
       </div>
       <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 1.5,
      delay: 0
    }}
  >
        <Grid className='pageHeader'>
          <h1 className="pageTitle">&quot; Stay ahead of the curve and make informed decisions with our insightful analysis of company news  &quot;</h1>
          <p> Discover the latest financial narratives driving today&apos; market with our tailored news updates. From groundbreaking IPOs to strategic mergers, we bring you the stories behind the numbers. Dive into the dynamic world of corporate finance and explore the impact of key events on your investment portfolio. Our platform provides comprehensive coverage, keeping you informed about the latest developments shaping the future of your investments.</p>        
        </Grid>
    </motion.div>

       <Grid className='gridNews'>
       {filteredData.map((item,index)=>
        <Grid key={index} className="newsGrid">
       <Card className='newsClasss' key={index}>
       <a className='url' href={item.url}> <h4 > {item.title} </h4></a> 
       <h5 className="text-hover"> <strong >Time published : </strong>{item.time_published}</h5>
      {item.authors.map((author, authorIndex)=> <h5 className="text-hover"  key={authorIndex}> <strong>Authors : </strong>{author}</h5> )}
       <p className='text-initial'  >{item.summary}</p>
       <a   className="text-hover" href={item.url}>Click here to visit the original reference</a>
       <img   className='text-initial' src={item.banner_image}/>
       <p className="text-hover">{item.title}</p>
       </Card>
       </Grid> 
       
       )}
       </Grid>               
       </Grid>
       </DashboardLayout>
  )
}

export default CompanyNews