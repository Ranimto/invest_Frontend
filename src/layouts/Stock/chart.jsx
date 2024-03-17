import * as React from 'react';
import PropTypes from 'prop-types'; 
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import axios from 'axios'; // Importez axios

export default function ReverseExampleNoSnap({ selectedSymbol }) { 
  
  const [reverseX, setReverseX] = React.useState(false);
  const [reverseLeft, setReverseLeft] = React.useState(false);
  const [reverseRight, setReverseRight] = React.useState(false);
  const [stockData, setStockData] = React.useState([]); 

  const series = [
    { type: 'line', dataKey: 'low', color: 'rgb(127, 9, 9)' },
    { type: 'line', dataKey: 'high', color: 'blueviolet' },
    { type: 'bar', dataKey: 'precip', color: 'transparent', stroke: '#8a2be2', strokeWidth: 2, yAxisKey: 'rightAxis' }, // Couleur transparente avec contour violet
  ];

  React.useEffect(() => {
    const fetchData = async (symbol) => {
      try {
        const response = await axios.get(`http://localhost:8023/stockData/fetch/${symbol}`);
        console.log("SYMBOL", symbol);
        if (response.data && response.data['Time Series (5min)']) {
          const timeSeriesData = response.data['Time Series (5min)'];
          const stockEntries = Object.entries(timeSeriesData).slice(0, 100).map(([date, values]) => ({
            date,
            low: values['3. low'],
            high: values['2. high'],
          
          }));
          setStockData(stockEntries);
        } else {
          console.error('Time Series (5min) data not found in response:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData(selectedSymbol);

  }, [selectedSymbol]);

  if (!stockData || stockData.length === 0) {
    return <div>Loading...</div>; 
  }

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack direction="row">
        <FormControlLabel
          checked={reverseX}
          control={<Checkbox onChange={(event) => setReverseX(event.target.checked)} />}
          label="reverse x-axis"
          labelPlacement="end"
        />
        <FormControlLabel
          checked={reverseLeft}
          control={<Checkbox onChange={(event) => setReverseLeft(event.target.checked)} />}
          label="reverse left axis"
          labelPlacement="end"
        />
        <FormControlLabel
          checked={reverseRight}
          control={<Checkbox onChange={(event) => setReverseRight(event.target.checked)} />}
          label="reverse right axis"
          labelPlacement="end"
        />
      </Stack>
      <Box sx={{ width: '100%' }}>
        <ResponsiveChartContainer
            series={series}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'date',
              label: 'date',
              reverse: reverseX,
            },
          ]}
          yAxis={[
            { id: 'leftAxis', reverse: reverseLeft },
            { id: 'rightAxis', reverse: reverseRight },
          ]}
          dataset={stockData} 
          height={400}
        >
          <BarPlot />
          <LinePlot />
          <MarkPlot/>

          <ChartsXAxis />
          <ChartsYAxis axisId="leftAxis" label="Hight"  />
          <ChartsYAxis axisId="rightAxis" position="right" label="Low" />
        </ResponsiveChartContainer>
      </Box>
    </Stack>
  );
  ReverseExampleNoSnap.propTypes = {
    selectedSymbol: PropTypes.string.isRequired, 
  };
}
