import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Deleiveryaddressform from './Deleiveryaddressform';
import Ordersummarry from './Ordersummarry';
import {useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { api } from '../../../Config/apiconfig';


const steps = ['Login ', ' deleivery address', 'order summary', 'payment'];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());
const navigate = useNavigate()
  const Location = useLocation()
  const querySearch= new URLSearchParams(Location.search)

  const step  = querySearch.get("step")
  const [address, setAddress] = React.useState([]);

  React.useEffect(() => {
    getAddress();
  }, [step]);

  const getAddress =  async () => {
    // console.log('.....................');
      const {data} = await api.get('/api/users/addresses');
      setAddress(data);
      console.log('address..............', data);
  }

 

  const handleNext = () => {
    
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    
  };

  const handleBack = () => {
    navigate(`/checkout?step=${step-1}`)
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  
  return (

    // <div className='px:10 lg:px-20'>
    //         <Box sx={{ width: '100%' }}>
    //   <Stepper activeStep={activeStep}>
    //     {steps.map((label, index) => {
    //       const stepProps = {};
    //       const labelProps = {};
         
         
    //       return (
    //         <Step key={label} {...stepProps}>
    //           <StepLabel {...labelProps}>{label}</StepLabel>
    //         </Step>
    //       );
    //     })}
    //   </Stepper>
    //   {activeStep === steps.length ? (
    //     <React.Fragment>
    //       <Typography sx={{ mt: 2, mb: 1 }}>
    //         All steps completed - you&apos;re finished
    //       </Typography>
          
    //     </React.Fragment>
    //   ) : (
    //     <React.Fragment>



    //       <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
    //         <Button
    //           color="inherit"
    //           disabled={activeStep === 0}
    //           onClick={handleBack}
    //           sx={{ mr: 1 }}
    //         >
    //           Back
    //         </Button>
            
           

            
    //       </Box >
          

    //       <div className='mt-10'>
    //             {step==2?<Deleiveryaddressform handleNext={handleNext}/>:<Ordersummarry/>}
    //       </div>
    //     </React.Fragment>
    //   )}
    // </Box>
    // </div>
    <Box className="px-5 lg:px-32 " sx={{ width: "100%" }}>
     <Stepper activeStep={parseInt(step)}>

        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
         
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={step == 2}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            
          </Box>
          {/* <Typography sx={{ my: 6 }}>Title</Typography> */}

          <div className="my-5">
            {step == 2? <Deleiveryaddressform Address={address} handleNext={handleNext} />:<Ordersummarry/>}
          </div>

          {/* <AddDeliveryAddressForm handleNext={handleNext} /> */}

          
        </React.Fragment>
      )}
    </Box>
  );
}