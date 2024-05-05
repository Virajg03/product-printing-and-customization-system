// import React from "react";
// import Addresscard from "../Addreescard/Addresscard";
// import { Grid, TextField, Box } from "@mui/material";
// import { Button } from "@material-tailwind/react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createOrder } from "../../../State/Order/Action";
// // import * as Yup from "yup";

// const Deleiveryaddressform = ({ Address }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = new FormData(e.currentTarget);

//     const Address = {
//       firstName: data.get("firstName"),
//       lastName: data.get("lastName"),
//       address: data.get("address"),
//       city: data.get("city"),
//       state: data.get("state"),
//       zip: data.get("zip"),
//       mobile: data.get("phonenumber"),
//     };

//     // if (phonenumber.length !== 10 || !/^\d+$/.test(phonenumber)) {
//     //   alert("Phone number must be exactly 10 digits");
//     //   return;
//     // }

//     // if (zip.length !== 6 || !/^\d+$/.test(zip)) {
//     //   alert("Zip code must be exactly 6 digits");
//     //   return;
//     // }
//     const orderData = {
//       Address,
//       navigate,
//     };
//     dispatch(createOrder(orderData));
//     console.log("address", orderData);
//   };

//   return (
//     <div>
//       <Grid container spacing={4}>
//         <Grid
//           item
//           xs={12}
//           lg={5}
//           className=" border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
//         >
//           <div className="p-5 py-7 border-b cursor-pointer">
//             <Addresscard Address={Address} />
//             <Button sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}>
//               Deleiver here
//             </Button>
//           </div>
//         </Grid>

//         <Grid item xs={12} lg={7}>
//           <Box className="border rounded-s-md shaodow-md p-5">
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     id="firstName"
//                     name="firstName"
//                     label="First name"
//                     fullWidth
//                     autoComplete="given-name"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     id="lastName"
//                     name="lastName"
//                     label="Last name"
//                     fullWidth
//                     autoComplete="given-name"
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     id="address"
//                     name="address"
//                     label="Address"
//                     fullWidth
//                     autoComplete="given-name"
//                     multiline
//                     rows={4}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     id="city"
//                     name="city"
//                     label="City"
//                     fullWidth
//                     autoComplete="given-name"
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     id="state"
//                     name="state"
//                     label="State"
//                     fullWidth
//                     autoComplete="given-name"
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     id="zip"
//                     name="zip"
//                     label="Zip / Postal code"
//                     fullWidth
//                     autoComplete="Shiping postal-code"
//                     inputProps={{ maxLength: 6 }}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     id="phonenumber"
//                     name="phonenuenumber"
//                     label="Phone Number"
//                     fullWidth
//                     autoComplete="given-name"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Button
//                     sx={{ py: "1.5", mt: 2, bgcolor: [145, 85, 253] }} // Provide RGB value as an array
//                     size="lg"
//                     variant="filled"
//                     type="submit"
//                   >
//                     Deliver here
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           </Box>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Deleiveryaddressform;



import React, { useEffect, useState } from "react";
import Addresscard from "../Addreescard/Addresscard";
import { Grid, TextField, Box, Divider } from "@mui/material";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../State/Order/Action";

const DeliveryAddressForm = ({ Address }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            firstName: "Please enter first name",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            firstName: "",
          }));
        }
        break;
      case "lastName":
        if (!value.trim()) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            lastName: "Please enter last name",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            lastName: "",
          }));
        }
        break;
      case "address":
        if (!value.trim()) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            address: "Please enter address",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            address: "",
          }));
        }
        break;
      case "city":
        if (!value.trim()) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            city: "Please enter city",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            city: "",
          }));
        }
        break;
      case "state":
        if (!value.trim()) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            state: "Please enter state",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            state: "",
          }));
        }
        break;
      case "zip":
        if (!/^\d{6}$/.test(value)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            zip: "Please enter a 6-digit ZIP code",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            zip: "",
          }));
        }
        break;
      case "phoneNumber":
        if (!/^\d{10}$/.test(value)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: "Please enter a 10-digit phone number",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: "",
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
    } else {
      // No errors, submit form
      const body = {
        "firstName" :formData.firstName,
        "lastName" : formData.lastName,
        "streetAddress" : formData.address,
        "city" : formData.city,
        "state" : formData.state,
        "zipCode" : formData.zip,
        "mobile" : formData.phoneNumber
      }
      dispatch(createOrder({ Address: body, navigate }));
      console.log("address", formData);
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    if (!data.firstName.trim()) {
      errors.firstName = "Please enter first name";
    }
    if (!data.lastName.trim()) {
      errors.lastName = "Please enter last name";
    }
    if (!data.address.trim()) {
      errors.address = "Please enter address";
    }
    if (!data.city.trim()) {
      errors.city = "Please enter city";
    }
    if (!data.state.trim()) {
      errors.state = "Please enter state";
    }
    if (!/^\d{6}$/.test(data.zip)) {
      errors.zip = "Please enter a 6-digit ZIP code";
    }
    if (!/^\d{10}$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Please enter a 10-digit phone number";
    }
    return errors;
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          lg={5}
          className=" border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-7 border-b cursor-pointer">
            {Address.map((el, index) => {
              // console.log( el);
              return <React.Fragment key={index}><Addresscard address={el} /><Divider /></React.Fragment>
            })}
            {/* <Button disabled sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}>
              Deliver here
            </Button> */}
          </div>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shaodow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="address-line1"
                    multiline
                    rows={4}
                    value={formData.address}
                    onChange={handleInputChange}
                    error={!!formErrors.address}
                    helperText={formErrors.address}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="address-level2"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={!!formErrors.city}
                    helperText={formErrors.city}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State"
                    fullWidth
                    autoComplete="address-level1"
                    value={formData.state}
                    onChange={handleInputChange}
                    error={!!formErrors.state}
                    helperText={formErrors.state}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="postal-code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    error={!!formErrors.zip}
                    helperText={formErrors.zip}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    error={!!formErrors.phoneNumber}
                    helperText={formErrors.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{ py: "1.5", mt: 2, bgcolor: [145, 85, 253] }}
                    size="lg"
                    variant="filled"
                    type="submit"
                  >
                    Deliver here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
