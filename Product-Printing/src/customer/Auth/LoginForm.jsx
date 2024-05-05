// import React, { useState } from 'react';
// import { Button, TextField, Grid, Snackbar, Alert } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../../State/Auth/Action';

// const LoginForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     const userData = {
//       email: data.get('email'),
//       password: data.get('password'),
//     };
//     console.log("userData", userData);
//     dispatch(login(userData));
//     setShowSuccessMessage(true);
//   };

//   const handleCloseSuccessMessage = () => {
//     setShowSuccessMessage(false);
//   };

//   return (
//     <div>
//       <form className='w-full' onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id='email'
//               name='email'
//               label='Email'
//               fullWidth
//               autoComplete='email'
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id='password'
//               name='password'
//               label='Password'
//               type='password'
//               fullWidth
//               autoComplete='password'
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               className='bg-[#9155FD] w-full '
//               type='submit'
//               variant='contained'
//               size='large'
//               sx={{ padding: '0.8rem 0', bgcolor: '#9155FD' }}
//             >
//               Login
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       <div className='flex justify-center flex-col items-center'>
//         <div className='py-3 flex items-center'>
//           <p>If you don't have an account</p>
//           <Button onClick={() => navigate('/register')} className='ml-5 ' size='small'>Register</Button>
//         </div>
//       </div>

//       {/* Snackbar for showing success message */}
//       <Snackbar
//         open={showSuccessMessage}
//         autoHideDuration={6000}
//         onClose={handleCloseSuccessMessage}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%', maxWidth: '500px' }}>
//           Login Successful
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default LoginForm;


// import React, { useState } from 'react';
// import { Button, TextField, Grid, Snackbar, Alert } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../../State/Auth/Action';

// const LoginForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [showErrorMessage, setShowErrorMessage] = useState(false); // State to show error message

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     const userData = {
//       email: data.get('email'),
//       password: data.get('password'),
//     };
//     const loginStatus = await dispatch(login(userData));
//     if (loginStatus === 'success') {
//       setShowSuccessMessage(true);
//     } else {
//       setShowErrorMessage(true); // Show error message if login is unsuccessful
//     }
//   };

//   const handleCloseSuccessMessage = () => {
//     setShowSuccessMessage(false);
//   };

//   const handleCloseErrorMessage = () => {
//     setShowErrorMessage(false);
//   };

//   return (
//     <div>
//       <form className='w-full' onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id='email'
//               name='email'
//               label='Email'
//               fullWidth
//               autoComplete='email'
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id='password'
//               name='password'
//               label='Password'
//               type='password'
//               fullWidth
//               autoComplete='password'
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               className='bg-[#9155FD] w-full '
//               type='submit'
//               variant='contained'
//               size='large'
//               sx={{ padding: '0.8rem 0', bgcolor: '#9155FD' }}
//             >
//               Login
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
      // <div className='flex justify-center flex-col items-center'>
      //   <div className='py-3 flex items-center'>
      //     <p>If you don't have an account</p>
      //     <Button onClick={() => navigate('/register')} className='ml-5 ' size='small'>Register</Button>
      //   </div>
      // </div>

//       {/* Snackbar for showing success message */}
//       <Snackbar
//         open={showSuccessMessage}
//         autoHideDuration={6000}
//         onClose={handleCloseSuccessMessage}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%', maxWidth: '500px' }}>
//           Login Successful
//         </Alert>
//       </Snackbar>

//       {/* Snackbar for showing error message */}
//       <Snackbar
//         open={showErrorMessage}
//         autoHideDuration={6000}
//         onClose={handleCloseErrorMessage}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: '100%', maxWidth: '500px' }}>
//           Incorrect email or password
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { Button, TextField, Grid, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../State/Auth/Action';
import axios from 'axios';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const loginStatus = await dispatch(login(userData));
      console.log('Login status:', loginStatus); // Check login status
      if (loginStatus === 'success') {
        setShowSuccessMessage(true);
        setShowErrorMessage(false);
      } else {
        setShowErrorMessage(true);
        setShowSuccessMessage(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
    }
  };

  const handleForgetPassword = async () => {
    try {
      console.log("Sending OTP...");
      const response = await axios.post(`http://localhost:5454/auth/forget`, { email });
      console.log("Response:", response.data);
      if (response.data.message === 'OTP sent successfully') {
        console.log("OTP sent successfully");
        setShowSuccessMessage(true);
        setShowErrorMessage(false);
      } else {
        console.log("OTP sending failed");
        setShowErrorMessage(true);
        setShowSuccessMessage(false);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
    }
  };
  
  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const handleCloseErrorMessage = () => {
    setShowErrorMessage(false);
  };

  const handlePassword = () => {
    setShowForgetPassword(true);
  };

  const handleResetPassword = async () => {
    try {
      // Reset password using OTP
      const response = await axios.post(`${BASE_URL}/auth/reset-password`, { email, otp, newPassword });
      if (response.data.success) {
        // Show success message or navigate to login page
      } else {
        // Show error message
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      // Show error message
    }
  };

  return (
    <div>
      {!showForgetPassword && (
        <form className='w-full' onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id='email'
                name='email'
                label='Email'
                fullWidth
                autoComplete='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='password'
                name='password'
                label='Password'
                type='password'
                fullWidth
                autoComplete='password'
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className='bg-[#9155FD] w-full '
                type='submit'
                variant='contained'
                size='large'
                sx={{ padding: '0.8rem 0', bgcolor: '#9155FD' }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handlePassword}
                variant='outlined'
                size='large'
                sx={{ padding: '0.8rem 0' }}
              >
                Forget Password?
              </Button>
            </Grid>
          </Grid>

          <div className='flex justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <p>If you don't have an account</p>
          <Button onClick={() => navigate('/register')} className='ml-5 ' size='small'>Register</Button>
        </div>
      </div>
        </form>
        

      )}

      {showForgetPassword && (
        <div>
          <form className='w-full'>
            <Grid container spacing={3}>

               <Grid item xs={12}>
                <TextField
                  required
                  id='email'
                  name='email'
                  label='Email'
                  fullWidth
                  autoComplete='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id='otp'
                  name='otp'
                  label='OTP'
                  fullWidth
                  autoComplete='off'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id='newPassword'
                  name='newPassword'
                  label='New Password'
                  type='password'
                  fullWidth
                  autoComplete='new-password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleForgetPassword}
                  variant='contained'
                  size='large'
                  sx={{ padding: '0.8rem 0' }}
                >
                  Send OTP
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleResetPassword}
                  variant='contained'
                  size='large'
                  sx={{ padding: '0.8rem 0' }}
                >
                  Reset Password
                </Button>
              </Grid>
            </Grid>
          </form>
          <div className='flex justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <p>If you don't have an account</p>
          <Button onClick={() => navigate('/register')} className='ml-5 ' size='small'>Register</Button>
        </div>
      </div>
        </div>
      )}

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%', maxWidth: '500px' }}>
          Login Successful
        </Alert>
      </Snackbar>

      <Snackbar
        open={showErrorMessage}
        autoHideDuration={6000}
        onClose={handleCloseErrorMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: '100%', maxWidth: '500px' }}>
          Incorrect email or password
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginForm;
