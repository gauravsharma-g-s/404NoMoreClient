import React, { useState } from 'react'
import { Avatar, Box, Button, Snackbar, TextField, Typography, useMediaQuery } from '@mui/material'
import { Person4 } from '@mui/icons-material'
import * as yup from "yup";
import { Formik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import theme from '../../theme';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'timeago.js';
import { setAbout, setSkills, setfirstName, setlastName } from '../../state';
import MuiAlert from '@mui/material/Alert';
import NewALert from '../../components/NewAlert';
import { useNavigate } from 'react-router-dom';

function UserEdit() {
    const [loading, setLoading] = useState(false);
    const isNonMobile = useMediaQuery('(min-width:600px)')
    const [alertOpen, setAlertOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [severity, setSeverity] = useState('info');

    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const firstName = user.firstName;
    const lastName = user.lastName;
    const skills = user.skills;
    const about = user.about;

    const { palette } = theme
    const userDetailsSchema = yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        skills: yup.string(),
        about: yup.string()
    })

    const initialValues = {
        firstName: firstName,
        lastName: lastName,
        skills: skills,
        about: about
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (firstName !== values['firstName'] || lastName !== values['lastName'] || about !== values['about'] || skills !== values['skills']) {
            setLoading(true);
            try {
                const savedUserResponse = await fetch(`https://four04nomore-server.onrender.com/auth/updateUser/${user?._id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                })
                const savedUser = await savedUserResponse.json()
                setLoading(false);
                setSeverity('success')
                setAlertOpen(true);
                setSuccessMessage("Profile updated successfully")
                if (savedUserResponse.status === 200) {
                    dispatch(setfirstName(savedUser.firstName))
                    dispatch(setlastName(savedUser.lastName))
                    dispatch(setAbout(savedUser.about))
                    dispatch(setSkills(savedUser.skills))
                }
            }
            catch (err) {
                setSeverity('error')
                setAlertOpen(true);
                setSuccessMessage("Oops! something went Wrong")
            }

        }
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false); // Close the error alert
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        navigate('/home')
    }
    return (

        <div style={{ margin: "2rem", marginTop: "100px" }}>
            <Box display="flex">
                <Avatar sx={{ bgcolor: "red", width: "100px", height: "100px" }} variant="square">
                    {user?.firstName[0] + user?.lastName[0]}
                </Avatar>
                <Box sx={{ marginLeft: "0.5rem" }}>
                    <Typography sx={{ fontWeight: "600", fontSize: "1.5rem", marginLeft: "1rem" }}>
                        {user?.firstName + " " + user?.lastName}
                    </Typography>
                    <Box display="flex" justifyContent="space-evenly">
                        <Person4 />
                        <Typography sx={{ fontSize: "1rem" }}>
                            {"Joined " + format(user?.createdAt)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Typography sx={{ marginTop: "2rem", fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                Edit your Details
            </Typography>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userDetailsSchema}
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

                            <TextField
                                label="About"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.about}
                                name="about"
                                multiline
                                rows={4}
                                error={Boolean(touched.about) && Boolean(errors.about)}
                                helperText={touched.about && errors.about}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                label="Skills"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.skills}
                                name="skills"
                                error={Boolean(touched.skills) && Boolean(errors.skills)}
                                helperText={touched.skills && errors.skills}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>

                        {/* BUTTONS */}
                        <Box display="grid"
                            gridTemplateColumns="repeat(4,minmax(0,1fr))"

                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },    // Each direct child of box have [span 4 on mobile--> means whole box width] 
                            }}
                        >
                            <LoadingButton loading={loading} loadingIndicator="Saving" variant="outlined"
                                fullWidth
                                type="submit"
                                sx={{
                                    gridRow: "1/2",
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.medium,
                                    "&:hover": { color: palette.primary.main },
                                    gridColumn: isNonMobile ? "1/2" : "span 4"
                                }}
                            >
                                {!loading?("Save"):("")}
                            </LoadingButton>
                            <Button style={{
                                marginTop: isNonMobile ? "undefined" : "0",
                                gridColumn: isNonMobile ? '4/5' : 'span 4',
                                gridRow: isNonMobile ? '1/2' : '3/4',
                                margin: '32px 0',
                                padding: "16px",
                                border: "0.8px solid blue"

                            }}
                                onClick={handleCancelClick}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>

            <NewALert handleAlertClose={handleAlertClose} alertOpen={alertOpen} alertMessage={successMessage} severity={severity} />
        </div>

    )
}

export default UserEdit
