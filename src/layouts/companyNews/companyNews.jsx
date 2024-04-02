import { Card, Grid } from '@mui/material'
import PageLayout from 'examples/LayoutContainers/PageLayout'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import './style.css'
import axios from 'axios';

const CompanyNews = () => {
    const [newsData,setNewsData]=useState([]);
    const {company}=useParams();

    const fetchData =async()=>{
        const response = await axios.get(`http://localhost:8023/stockData/newsData/${company}`);
        console.log( response.data.feed);
        setNewsData(response.data.feed);
        console.log( "newsData",response.data.feed);
    }  

    useEffect(() => {
        fetchData('AAPL')
    },['AAPL'])

  return (
    <PageLayout>
       <Grid >
        <div className="Header">
         <h2 className="title"> <KeyboardDoubleArrowRightIcon/> News of the day <KeyboardDoubleArrowRightIcon/>Latest Financial Stories 
         <span className='symboll'> || {!(company==':company')? company: 'AAPL'} </span></h2>
         <h2 className="title" style={{paddingLeft:'57%'}}>Actualities <KeyboardDoubleArrowRightIcon/><Link to='/dashboard'> Dashboard</Link></h2>
       </div> 
       {newsData.map((item,index)=>
       <Card className='newsClasss' key={index}>

       <h4 > {item.title} </h4>
       <h5> <strong>Time published : </strong>{item.time_published}</h5>
      {item.authors.map((author, authorIndex)=> <h5 key={authorIndex}> <strong>Authors : </strong>{author}</h5> )}
       <p >{item.summary}</p>
       <a className='url' href={item.url}>Click here to visit the original reference</a>
       <img src={item.banner_image}/>
       </Card>
       )}
                     
       </Grid>
    </PageLayout>
  )
}

export default CompanyNews