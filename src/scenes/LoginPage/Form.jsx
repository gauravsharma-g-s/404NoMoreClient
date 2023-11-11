import { useState } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import LoadingButton from '@mui/lab/LoadingButton';

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const otpSchema = yup.object().shape({
  otp: yup.string()
})

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
}

const initialValuesLogin = {
  email: "",
  password: "",
};

const initialValuesOTP = {
  otp: ""
}
const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [user, setUser] = useState(null)
  const isOTP = pageType === "otp";

  const [errorMessage, setErrorMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = async (values, onSubmitProps) => {
    // this allows us to send otp
    const userWithOTP = { ...user, otp: values['otp'] }

    const savedUserResponse = await fetch(
      "https://four04nomore-server.onrender.com/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userWithOTP),
      }
    );
    const savedUser = await savedUserResponse.json();
    setLoading(false);
    if (savedUser.error.split(" ")[0] === "400" || savedUser.error.split(" ")[0] === "401") {      // USer enter Empty OTP or Wrong
      setErrorMessage("Please enter a valid OTP!");
      setAlertOpen(true);
    }
    else {
      onSubmitProps.resetForm();
      if (savedUser) {
        setPageType("login");
      }
    }

  };

  const otpSend = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    const otpResponse = await fetch("https://four04nomore-server.onrender.com/auth/sendOTP",
      {
        method: "POST",
        body: formData
      });
    const otpJSONRes = await otpResponse.json();
    if (otpJSONRes.message.split(" ")[0] === "409") {
      setErrorMessage("Another user with this email already exists!");
      setAlertOpen(true);
    }
    else {
      setUser({
        firstName: otpJSONRes.data.firstName,
        lastName: otpJSONRes.data.lastName,
        email: otpJSONRes.data.email,
        password: otpJSONRes.data.password,
        otpId: otpJSONRes.data.otpId
      })
      onSubmitProps.resetForm();
      setLoading(false);
      if (otpJSONRes) {
        setPageType("otp");
      }
    }

  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("https://four04nomore-server.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    setLoading(false);
    onSubmitProps.resetForm();
    if (loggedIn) {                                                 // Login Succesfull
      dispatch(                                                     // dispatch to localStorage
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home", { replace: true });                                            // Goto HomePage
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    if (isLogin) await login(values, onSubmitProps);

    if (isRegister) await otpSend(values, onSubmitProps);

    if (isOTP) await register(values, onSubmitProps);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false); // Close the error alert
  }
  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : isRegister ? initialValuesRegister : initialValuesOTP}
        validationSchema={isLogin ? loginSchema : isRegister ? registerSchema : otpSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"                // Total 4 columns of equal width
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },    // Each direct child of box have [span 4 on mobile--> means whole box width] 
              }}                                                                  // For non Mobile undefined [defined below]
            >

              {
                isOTP && (
                  <>
                    <TextField
                      label="OTP"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.otp}
                      name="otp"
                      error={Boolean(touched.otp) && Boolean(errors.otp)}
                      helperText={touched.otp && errors.otp}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </>
                )
              }

              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                </>
              )
              }

              {!isOTP && (
                <>
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </>
              )
              }
            </Box>

            {/* BUTTONS */}
            <Box>
              <LoadingButton loading={loading} loadingIndicator={pageType === "otp" ? "Verifying" : pageType === "register" ? "Signing" : 'Logging In'} variant="outlined"
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.medium,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                {isLogin ? "LOGIN" : isRegister ? "SIGN UP" : "SUBMIT"}
              </LoadingButton>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.mediumMain,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleAlertClose}>
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Form;

