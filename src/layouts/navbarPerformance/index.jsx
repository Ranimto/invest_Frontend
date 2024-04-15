import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function NavbarPerformance() {
 
  function changeCompo() {
    var compo = document.getElementById("compoChanger");
    var btn = document.querySelector('.btnPerformance');
    btn.style.border = "1px solid blueviolet";
}
  return (
    <Box sx={{ width: '100%' }} display="flex">     
     <Button  className="btnPerformancee" onclick="changeCompo()"><Link to='performance/108/21/GOOGL/0/12528280'>Performance</Link></Button>
     <Button className="btnPerformancee" onclick="changeCompo()"><Link to='/activity'>Activities</Link></Button>    
    </Box>
  );
}
