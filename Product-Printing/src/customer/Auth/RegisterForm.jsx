// import React, { useState } from 'react';
// import { Grid, TextField, Button, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, register } from "../../State/Auth/Action";
// import { useEffect } from 'react';

// export default function RegisterUserForm({ handleNext }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [openSnackBar, setOpenSnackBar] = useState(false);
//   const { auth } = useSelector((store) => store);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     role: ''
//   });
//   const [passwordError, setPasswordError] = useState(false);
//   const [passwordTouched, setPasswordTouched] = useState(false);

//   const handleClose = () => setOpenSnackBar(false);

//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (jwt) {
//       dispatch(getUser(jwt))
//     }
//   }, [jwt])

//   useEffect(() => {
//     if (auth.user || auth.error) setOpenSnackBar(true)
//   }, [auth.user]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("user data", formData);
//     dispatch(register(formData));
//   };

//   const handleInputChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value
//     });
//     if (event.target.name === 'password') {
//       setPasswordTouched(true);
//     }
//   };

//   // Password validation function
//   const validatePassword = (password) => {
//     // Add your password validation rules here
//     const isValid = password.length >= 8;
//     if (passwordTouched) {
//       setPasswordError(!isValid);
//     }
//     return isValid;
//   };

//   return (
//     <div className="">
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="firstName"
//               name="firstName"
//               label="First Name"
//               fullWidth
//               autoComplete="given-name"
//               value={formData.firstName}
//               onChange={handleInputChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="lastName"
//               name="lastName"
//               label="Last Name"
//               fullWidth
//               autoComplete="family-name"
//               value={formData.lastName}
//               onChange={handleInputChange}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id="email"
//               name="email"
//               label="Email"
//               fullWidth
//               autoComplete="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               type='email'
//             />
//           </Grid>

//           {/* <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">Role</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 label="Role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleInputChange}
//               >
//                 <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
//                 <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid> */}

//           <Grid item xs={12}>
//             <TextField
//               required
//               id="password"
//               name="password"
//               label="Password"
//               fullWidth
//               autoComplete="new-password"
//               type="password"
//               error={passwordError}
//               helperText={passwordError ? 'Password must be at least 8 characters long' : ''}
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               className="bg-[#9155FD] w-full"
//               type="submit"
//               variant="contained"
//               size="large"
//               sx={{ padding: ".8rem 0" }}
//             >
//               Register
//             </Button>
//           </Grid>
//         </Grid>
//       </form>

//       <div className="flex justify-center flex-col items-center">
//         <div className="py-3 flex items-center ">
//           <p className="m-0 p-0">If you already have an account, </p>
//           <Button onClick={() => navigate("/login")} className="ml-1" size="small">
//             Login
//           </Button>
//         </div>
//       </div>

//       <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//           {auth.error ? auth.error : auth.user ? "Register Success" : ""}
//         </Alert>
//       </Snackbar>

//     </div>
//   );
// }

// import React, { useState } from 'react';
// // import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
// // import React, { useState } from 'react';
// import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, register } from "../../State/Auth/Action";
// import { useEffect } from 'react';

// export default function RegisterUserForm({ handleNext }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [openSnackBar, setOpenSnackBar] = useState(false);
//   const { auth } = useSelector((store) => store);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: ''
//   });
//   const [errors, setErrors] = useState({
//     firstName: false,
//     lastName: false,
//     email: false,
//     password: false,
//     confirmPassword: false,
//     role: false
//   });

//   const handleClose = () => setOpenSnackBar(false);

//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (jwt) {
//       dispatch(getUser(jwt))
//     }
//   }, [jwt])

//   useEffect(() => {
//     if (auth.user || auth.error) setOpenSnackBar(true)
//   }, [auth.user]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       dispatch(register(formData));
//     }
//   };

//   const handleInputChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value
//     });
//     if (errors[event.target.name]) {
//       setErrors({
//         ...errors,
//         [event.target.name]: false
//       });
//     }
//   };

//   // Form validation function
//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};

//     // Validate First Name
//     if (!formData.firstName.trim() || !/^[A-Za-z]+$/.test(formData.firstName)) {
//       newErrors.firstName = true;
//       valid = false;
//     }

//     // Validate Last Name
//     if (!formData.lastName.trim() || !/^[A-Za-z]+$/.test(formData.lastName)) {
//       newErrors.lastName = true;
//       valid = false;
//     }

//     // Validate Email
//     if (!formData.email.trim() || !validateEmail(formData.email)) {
//       newErrors.email = true;
//       valid = false;
//     }

//     // Validate Password
//     if (!formData.password.trim() || formData.password.length < 8) {
//       newErrors.password = true;
//       valid = false;
//     }

//     // Validate Confirm Password
//     if (!formData.confirmPassword.trim() || formData.confirmPassword !== formData.password) {
//       newErrors.confirmPassword = true;
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   // Email validation function
//   const validateEmail = (email) => {
//     // Email validation regex
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(String(email).toLowerCase());
//   };

//   return (
//     <div className="">
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="firstName"
//               name="firstName"
//               label="First Name"
//               fullWidth
//               autoComplete="given-name"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               error={errors.firstName}
//               helperText={errors.firstName ? 'First name is required and should only contain letters' : ''}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="lastName"
//               name="lastName"
//               label="Last Name"
//               fullWidth
//               autoComplete="family-name"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               error={errors.lastName}
//               helperText={errors.lastName ? 'Last name is required and should only contain letters' : ''}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id="email"
//               name="email"
//               label="Email"
//               fullWidth
//               autoComplete="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               error={errors.email}
//               helperText={errors.email ? 'Enter a valid email address' : ''}
//               type='email'
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               required
//               id="password"
//               name="password"
//               label="Password"
//               fullWidth
//               autoComplete="new-password"
//               type="password"
//               error={errors.password}
//               helperText={errors.password ? 'Password must be at least 8 characters long' : ''}
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               required
//               id="confirmPassword"
//               name="confirmPassword"
//               label="Confirm Password"
//               fullWidth
//               autoComplete="new-password"
//               type="password"
//               error={errors.confirmPassword}
//               helperText={errors.confirmPassword ? 'Passwords do not match' : ''}
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               className="bg-[#9155FD] w-full"
//               type="submit"
//               variant="contained"
//               size="large"
//               sx={{ padding: ".8rem 0" }}
//             >
//               OTP GENERATE
//             </Button>
//           </Grid>
//         </Grid>
//       </form>

//       <div className="flex justify-center flex-col items-center">
//         <div className="py-3 flex items-center ">
//           <p className="m-0 p-0">If you already have an account, </p>
//           <Button onClick={() => navigate("/login")} className="ml-1" size="small">
//             Login
//           </Button>
//         </div>
//       </div>

//       <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//           {auth.error ? auth.error : auth.user ? "Register Success" : ""}
//         </Alert>
//       </Snackbar>

//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, register } from "../../State/Auth/Action";
// import axios from "axios";

// export default function RegisterUserForm({ handleNext }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [openSnackBar, setOpenSnackBar] = useState(false);
//   const { auth } = useSelector((store) => store);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//   });
//   const [otp, setOtp] = useState("");
//   const [showVerifySection, setShowVerifySection] = useState(false);
//   const [errors, setErrors] = useState({
//     firstName: false,
//     lastName: false,
//     email: false,
//     password: false,
//     confirmPassword: false,
//     role: false,
//     otp: false,
//   });

//   const handleOTPGenerate = () => {
//     axios
//       .post("http://localhost:5454/auth/signup_request", {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         password: formData.password,
//       })
//       .then((response) => {
//         setOtp(response.data.otp);
//         setShowVerifySection(true);
//       })
//       .catch((error) => {
//         console.error("Error sending OTP:", error);
//       });
//   };

//   const handleVerifyOTP = () => {
//     axios
//       .put("http://localhost:5454/auth/verify-account", {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         otp: otp,
//         password: formData.password,
//       })
//       .then((response) => {
//         if (response.data.success) {
//           setOpenSnackBar(true);
//         }
//       })
//       .catch((error) => {
//         console.error("Error verifying OTP:", error);
//       });
//   };

//   const handleClose = () => setOpenSnackBar(false);

//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (jwt) {
//       dispatch(getUser(jwt));
//     }
//   }, [jwt, dispatch]);

//   useEffect(() => {
//     if (auth.user || auth.error) setOpenSnackBar(true);
//   }, [auth]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       dispatch(register(formData));
//     }
//   };

//   const handleInputChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//     if (errors[event.target.name]) {
//       setErrors({
//         ...errors,
//         [event.target.name]: false,
//       });
//     }
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};

//     // Validate fields...

//     setErrors(newErrors);
//     return valid;
//   };

//   return (
//     <div className="">
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="firstName"
//               name="firstName"
//               label="First Name"
//               fullWidth
//               autoComplete="given-name"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               error={errors.firstName}
//               helperText={
//                 errors.firstName
//                   ? "First name is required and should only contain letters"
//                   : ""
//               }
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="lastName"
//               name="lastName"
//               label="Last Name"
//               fullWidth
//               autoComplete="family-name"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               error={errors.lastName}
//               helperText={
//                 errors.lastName
//                   ? "Last name is required and should only contain letters"
//                   : ""
//               }
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id="email"
//               name="email"
//               label="Email"
//               fullWidth
//               autoComplete="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               error={errors.email}
//               helperText={errors.email ? "Enter a valid email address" : ""}
//               type="email"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               required
//               id="password"
//               name="password"
//               label="Password"
//               fullWidth
//               autoComplete="new-password"
//               type="password"
//               error={errors.password}
//               helperText={
//                 errors.password
//                   ? "Password must be at least 8 characters long"
//                   : ""
//               }
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               required
//               id="confirmPassword"
//               name="confirmPassword"
//               label="Confirm Password"
//               fullWidth
//               autoComplete="new-password"
//               type="password"
//               error={errors.confirmPassword}
//               helperText={
//                 errors.confirmPassword ? "Passwords do not match" : ""
//               }
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               className="bg-[#9155FD] w-full"
//               type="button"
//               variant="contained"
//               size="large"
//               sx={{ padding: ".8rem 0" }}
//               onClick={handleOTPGenerate}
//             >
//               OTP GENERATE
//             </Button>
//           </Grid>

//           {showVerifySection && (
//             <>
//               <Grid item xs={8}>
//                 <TextField
//                   required
//                   id="otp"
//                   name="otp"
//                   label="Enter OTP"
//                   fullWidth
//                   autoComplete="off"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   error={errors.otp}
//                   helperText={errors.otp ? "Invalid OTP" : ""}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <Button
//                   variant="contained"
//                   onClick={handleVerifyOTP}
//                   fullWidth
//                   sx={{ height: "100%" }}
//                 >
//                   Verify OTP
//                 </Button>
//               </Grid>
//             </>
//           )}
//         </Grid>
//       </form>

// <div className="flex justify-center flex-col items-center">
//   <div className="py-3 flex items-center ">
//     <p className="m-0 p-0">If you already have an account</p>{" "}
//     <Button
//       onClick={() => navigate("/login")}
//       className="ml-1"
//       size="small"
//     >
//       Login
//     </Button>
//   </div>
// </div>

//       <Snackbar
//         open={openSnackBar}
//         autoHideDuration={6000}
//         onClose={handleClose}
//       >
//         <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
//           {auth.error ? auth.error : auth.user ? "Register Success" : ""}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, register } from "../../State/Auth/Action";
// import { useEffect } from "react";
// import axios from "axios";

// export default function RegisterUserForm({ handleNext }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [openSnackBar, setOpenSnackBar] = useState(false);
//   const { auth } = useSelector((store) => store);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//   });
//   const [otp, setOtp] = useState("");
//   const [verifyOtp, setVerifyOtp] = useState("");
//   const [errors, setErrors] = useState({
//     firstName: false,
//     lastName: false,
//     email: false,
//     password: false,
//     confirmPassword: false,
//     role: false,
//     otp: false,
//   });

//   const handleOTPGenerate = () => {
//     // Make a POST request to send OTP
//     axios
//       .post("http://localhost:5454/auth/signup_request", {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         password: formData.password,
//       })
//       .then((response) => {
//         // Handle response, show success message, etc.
//         console.log("OTP Sent:", response.data.otp);
//         setOtp(response.data.otp); // Set OTP received from the server
//       })
//       .catch((error) => {
//         console.error("Error sending OTP:", error);
//         // Handle error, show error message, etc.
//       });
//   };

//   const handleVerifyOTP = () => {
//     axios
//       .put("http://localhost:5454/auth/verify-account", {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         otp: otp,
//         password: formData.password,
//       })
//       .then((response) => {
//         console.log("Verify OTP Response:", response.data);
//         if (response.data.success) {
//           setOpenSnackBar(true);
//         }
//       })
//       .catch((error) => {
//         console.error("Error verifying OTP:", error);
//       });
//   };

//   const handleClose = () => setOpenSnackBar(false);

//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (jwt) {
//       dispatch(getUser(jwt));
//     }
//   }, [jwt]);

//   useEffect(() => {
//     if (auth.user || auth.error) setOpenSnackBar(true);
//   }, [auth.user]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       dispatch(register(formData));
//     }
//   };

//   const handleInputChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//     if (errors[event.target.name]) {
//       setErrors({
//         ...errors,
//         [event.target.name]: false,
//       });
//     }
//   };

//   // Form validation function
//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};

//     // Validate fields...

//     setErrors(newErrors);
//     return valid;
//   };

//   return (
//     <div className="">
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="firstName"
//               name="firstName"
//               label="First Name"
//               fullWidth
//               autoComplete="given-name"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               error={errors.firstName}
//               helperText={
//                 errors.firstName
//                   ? "First name is required and should only contain letters"
//                   : ""
//               }
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="lastName"
//               name="lastName"
//               label="Last Name"
//               fullWidth
//               autoComplete="family-name"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               error={errors.lastName}
//               helperText={
//                 errors.lastName
//                   ? "Last name is required and should only contain letters"
//                   : ""
//               }
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id="email"
//               name="email"
//               label="Email"
//               fullWidth
//               autoComplete="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               error={errors.email}
//               helperText={errors.email ? "Enter a valid email address" : ""}
//               type="email"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               required
//               id="password"
//               name="password"
//               label="Password"
//               fullWidth
//               autoComplete="new-password"
//               type="password"
//               error={errors.password}
//               helperText={
//                 errors.password
//                   ? "Password must be at least 8 characters long"
//                   : ""
//               }
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               required
//               id="confirmPassword"
//               name="confirmPassword"
//               label="Confirm Password"
//               fullWidth
//               autoComplete="new-password"
//               type="password"
//               error={errors.confirmPassword}
//               helperText={
//                 errors.confirmPassword ? "Passwords do not match" : ""
//               }
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               className="bg-[#9155FD] w-full"
//               type="button"
//               variant="contained"
//               size="large"
//               sx={{ padding: ".8rem 0" }}
//               onClick={handleOTPGenerate}
//             >
//               OTP GENERATE
//             </Button>
//           </Grid>

//           <>
//             <Grid item xs={8}>
//               <TextField
//                 required
//                 id="otp"
//                 name="otp"
//                 label="Enter OTP"
//                 fullWidth
//                 autoComplete="off"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 error={errors.otp}
//                 helperText={errors.otp ? "Invalid OTP" : ""}
//               />
//             </Grid>
//             <Grid item xs={4}>
//               <Button
//                 variant="contained"
//                 onClick={handleVerifyOTP}
//                 fullWidth
//                 sx={{ height: "100%" }}
//               >
//                 Verify OTP
//               </Button>
//             </Grid>
//           </>
//         </Grid>
//       </form>

//       <div className="flex justify-center flex-col items-center">
//         <div className="py-3 flex items-center ">
//           <p className="m-0 p-0">If you already have an account</p>{" "}
//           <Button
//             onClick={() => navigate("/login")}
//             className="ml-1"
//             size="small"
//           >
//             Login
//           </Button>
//         </div>
//       </div>

//       <Snackbar
//         open={openSnackBar}
//         autoHideDuration={6000}
//         onClose={handleClose}
//       >
//         <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
//           {auth.error ? auth.error : auth.user ? "Register Success" : ""}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Grid, TextField, Button, Snackbar, Alert, Modal, Box, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, register } from "../../State/Auth/Action";
// import axios from "axios";

// const RegisterUserForm = ({ handleNext }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { auth } = useSelector((store) => store);
//   const [openSnackBar, setOpenSnackBar] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [showVerifyOtp, setShowVerifyOtp] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//   });
//   const [errors, setErrors] = useState({
//     firstName: false,
//     lastName: false,
//     email: false,
//     password: false,
//     confirmPassword: false,
//     role: false,
//     otp: false,
//   });

//   const handleOTPGenerate = () => {
//     axios
//       .post("http://localhost:5454/auth/signup_request", {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         password: formData.password,
//       })
//       .then((response) => {
//         console.log("OTP Sent:", response.data.otp);
//         setOtp(response.data.otp);
//         setShowVerifyOtp(true);
//       })
//       .catch((error) => {
//         console.error("Error sending OTP:", error);
//       });
//   };

//   const handleVerifyOTP = () => {
//     axios
//       .put("http://localhost:5454/auth/verify-account", {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         otp: otp,
//         password: formData.password,
//       })
//       .then((response) => {
//         console.log("Verify OTP Response:", response.data);
//         if (response.data.message==="Signup Success") {
//           setModalMessage("Registration successful!");
//           setShowModal(true);
//         }
//         else{
//           setModalMessage(response.data.message);
//           setShowModal(true);
//         }
//       })
//       .catch((error) => {
//         console.error("Error verifying OTP:", error);
//       });
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     navigate("/login"); // Redirect to login page after successful registration
//   };

//   const handleCloseSnackBar = () => {
//     setOpenSnackBar(false);
//   };

//   const handleInputChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//     if (errors[event.target.name]) {
//       setErrors({
//         ...errors,
//         [event.target.name]: false,
//       });
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       dispatch(register(formData));
//     }
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};
//     // Validate fields...
//     setErrors(newErrors);
//     return valid;
//   };

//   return (
//     <div className="">
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="firstName"
//               name="firstName"
//               label="First Name"
//               fullWidth
//               autoComplete="given-name"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               error={errors.firstName}
//               helperText={
//                 errors.firstName
//                   ? "First name is required and should only contain letters"
//                   : ""
//               }
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="lastName"
//               name="lastName"
//               label="Last Name"
//               fullWidth
//               autoComplete="family-name"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               error={errors.lastName}
//               helperText={
//                 errors.lastName
//                   ? "Last name is required and should only contain letters"
//                   : ""
//               }
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id="email"
//               name="email"
//               label="Email"
//               fullWidth
//               autoComplete="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               error={errors.email}
//               helperText={errors.email ? "Enter a valid email address" : ""}
//               type="email"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               required
//               id="password"
//               name="password"
//               label="Password"
//               fullWidth
//               autoComplete="new-password"
//               type="password"
//               error={errors.password}
//               helperText={
//                 errors.password
//                   ? "Password must be at least 8 characters long"
//                   : ""
//               }
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               required
//               id="confirmPassword"
//               name="confirmPassword"
//               label="Confirm Password"
//               fullWidth
//               autoComplete="new-password"
//               type="password"
//               error={errors.confirmPassword}
//               helperText={
//                 errors.confirmPassword ? "Passwords do not match" : ""
//               }
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               className="bg-[#9155FD] w-full"
//               type="button"
//               variant="contained"
//               size="large"
//               sx={{ padding: ".8rem 0" }}
//               onClick={handleOTPGenerate}
//             >
//               OTP GENERATE
//             </Button>
//           </Grid>

//           {showVerifyOtp && (
//             <>
//               <Grid item xs={8}>
//                 <TextField
//                   required
//                   id="otp"
//                   name="otp"
//                   label="Enter OTP"
//                   fullWidth
//                   autoComplete="off"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   error={errors.otp}
//                   helperText={errors.otp ? "Invalid OTP" : ""}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <Button
//                   variant="contained"
//                   onClick={handleVerifyOTP}
//                   fullWidth
//                   sx={{ height: "100%" }}
//                 >
//                   Verify OTP
//                 </Button>
//               </Grid>
//             </>
//           )}
//         </Grid>
//       </form>

//       <div className="flex justify-center flex-col items-center">
//         <div className="py-3 flex items-center ">
//           <p className="m-0 p-0">If you already have an account</p>{" "}
//           <Button
//             onClick={() => navigate("/login")}
//             className="ml-1"
//             size="small"
//           >
//             Login
//           </Button>
//         </div>
//       </div>

//       <Snackbar
//         open={openSnackBar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackBar}
//       >
//         <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: "100%" }}>
//           {auth.error ? auth.error : auth.user ? "Register Success" : ""}
//         </Alert>
//       </Snackbar>

//       <Modal
//         open={showModal}
//         onClose={handleCloseModal}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 600, // Increased modal width
//             bgcolor: "lightblue",
//             boxShadow: 24,
//             p: 4,
//             textAlign: "center",
//           }}
//         >
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             {modalMessage}
//           </Typography>
//           <Button onClick={handleCloseModal} variant="contained">
//             OK
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default RegisterUserForm;

import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../State/Auth/Action";
import axios from "axios";

const RegisterUserForm = ({ handleNext }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [otp, setOtp] = useState("");
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    otp: false,
  });

  const handleOTPGenerate = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please enter all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password should match");
      return;
    }

    axios.post("http://localhost:5454/auth/signup_request", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log("OTP Sent:", response.data.otp);
        setOtp(response.data.otp);
        setShowVerifyOtp(true);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  const handleVerifyOTP = () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    axios
      .put("http://localhost:5454/auth/verify-account", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        otp: otp,
        password: formData.password,
      })
      .then((response) => {
        console.log("Verify OTP Response:", response.data);
        if (response.data.message === "Signup Success") {
          setModalMessage("Registration successful!");
          setShowModal(true);
        } else {
          setModalMessage(response.data.message);
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    if (errors[event.target.name]) {
      setErrors({
        ...errors,
        [event.target.name]: false,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(register(formData));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    // Validate fields...
    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleInputChange}
              error={errors.firstName}
              helperText={
                errors.firstName
                  ? "First name is required and should only contain letters"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
              helperText={
                errors.lastName
                  ? "Last name is required and should only contain letters"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              helperText={errors.email ? "Enter a valid email address" : ""}
              type="email"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="new-password"
              type="password"
              error={errors.password}
              helperText={
                errors.password
                  ? "Password must be at least 8 characters long"
                  : ""
              }
              value={formData.password}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              fullWidth
              autoComplete="new-password"
              type="password"
              error={errors.confirmPassword}
              helperText={
                errors.confirmPassword ? "Passwords do not match" : ""
              }
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="button"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0" }}
              onClick={handleOTPGenerate}
            >
              OTP GENERATE
            </Button>
          </Grid>

          {showVerifyOtp && (
            <>
              <Grid item xs={8}>
                <TextField
                  required
                  id="otp"
                  name="otp"
                  label="Enter OTP"
                  fullWidth
                  autoComplete="off"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  error={errors.otp}
                  helperText={errors.otp ? "Invalid OTP" : ""}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  onClick={handleVerifyOTP}
                  fullWidth
                  sx={{ height: "100%" }}
                >
                  Verify OTP
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center ">
          <p className="m-0 p-0">If you already have an account</p>{" "}
          <Button
            onClick={() => navigate("/login")}
            className="ml-1"
            size="small"
          >
            Login
          </Button>
        </div>
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {auth.error ? auth.error : auth.user ? "Register Success" : ""}
        </Alert>
      </Snackbar>

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, // Increased modal width
            bgcolor: "lightblue",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalMessage}
          </Typography>
          <Button onClick={handleCloseModal} variant="contained">
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RegisterUserForm;
