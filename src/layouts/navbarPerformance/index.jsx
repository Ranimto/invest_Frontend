import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export default function NavbarPerformance() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="info"
        indicatorColor="secondary"
        aria-label="secondary tabs example">

        <Tab value="one" label="Performance" component={Link} to="/performance" /> 
        <Tab value="two" label="Activity"  component={Link} to="/activity"/>
        <Tab value="three" label="Transactions" component={Link} to="/billing"/>
 
        
  
       
      </Tabs>
    </Box>
  );
}
