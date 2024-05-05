// import { StepLabel, Stepper } from '@mui/material'
// import React from 'react'
// import {Step} from '@mui/material'
// // import Stepper from '@mui/material'

// const steps=[
//     "placed",
//     "order Confirmes",
//     "Shipped",
//     "out for delivery",
//     "Delivered"
// ]
// const Ordertracker = ({activeStep}) => {
//   return (
//     <div className='w-full'>
//       <Stepper activeStep={activeStep} alternativeLabel>

//         {steps.map((label)=><Step>
//             <StepLabel sx={{color:"#9155fd",fontSize:"44px"}}>{label}</StepLabel>
//         </Step>)}
//       </Stepper>
//     </div>
//   )
// }

// export default Ordertracker


import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography} from '@mui/material';



const steps = [
  "Placed",
  'Order Confirmed',
  'Shipped',
  'Out For Delivery',
  'Delivered'
];



export default function OrderTraker({activeStep}) {
    
  return (
    <Box sx={{ width: '100%' }} >
      
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel  sx={{ color: '#9155FD',fontSize: '44px' }}  className={``}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
