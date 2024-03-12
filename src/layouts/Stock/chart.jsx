import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';


const dataset = [
  { low: -12, high: -4, precip: 79, date: 'Jan' },
  { low: -11, high: -3, precip: 66, date: 'Feb' },
  { low: -6, high: 2, precip: 76, date: 'Mar' },
  { low: 1, high: 9, precip: 106, date: 'Apr' },
  { low: 8, high: 17, precip: 105, date: 'Mai' },
  { low: 15, high: 24, precip: 114, date: 'Jun' },
  { low: 18, high: 26, precip: 106, date: 'Jul' },
  { low: 17, high: 26, precip: 105, date: 'Aug' },
  { low: 13, high: 21, precip: 100, date: 'Sept' },
  { low: 6, high: 13, precip: 116, date: 'Oct' },
  { low: 0, high: 6, precip: 93, date: 'Nov' },
  { low: -8, high: -1, precip: 93, date: 'Dec' },
];

const series = [
  { type: 'line', dataKey: 'low', color: 'rgb(127, 9, 9)' },
  { type: 'line', dataKey: 'high', color: 'blueviolet' },
  { type: 'bar', dataKey: 'precip', color: 'transparent', stroke: '#8a2be2', strokeWidth: 2, yAxisKey: 'rightAxis' }, // Couleur transparente avec contour violet
];

export default function ReverseExampleNoSnap() {
  const [reverseX, setReverseX] = React.useState(false);
  const [reverseLeft, setReverseLeft] = React.useState(false);
  const [reverseRight, setReverseRight] = React.useState(false);

  return (
    <Stack sx={{ width: '100%'}}>
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
          dataset={dataset}
          height={400}
        >
          <BarPlot  />
          <LinePlot />
          <MarkPlot />

          <ChartsXAxis  />
          <ChartsYAxis axisId="leftAxis" label="Hight" />
          <ChartsYAxis axisId="rightAxis" position="right" label="Low" />
        </ResponsiveChartContainer>
      </Box>
    </Stack>
  );
}
