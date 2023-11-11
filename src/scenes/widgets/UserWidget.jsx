import { Avatar, Box, Button, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexBetween from '../../components/FlexBetween'
import { ModeEditOutlineOutlined, Person4 } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'

function UserWidget() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(state => state.user)
    const isNonMobileScreen = useMediaQuery('(min-width:540px)')
    const [currentUser, setCurrentUser] = useState(user);

    const extraInfo = location.state;
    const allSkills = currentUser.skills.split(/,\s*/);

    const handleClick = () => {
        navigate('/editUser')
    }

    useEffect(() => {
        if (extraInfo !== null) {
            setCurrentUser(extraInfo)
        }
    }, [extraInfo]);

    return (
        <div className='check' style={{ margin: "2rem", marginTop: "100px", marginLeft: isNonMobileScreen ? "2rem" : "1rem", marginRight: isNonMobileScreen ? "2rem" : "1rem", height: '100vh', overflowX: 'hidden' }}>
            <FlexBetween>
                <FlexBetween>
                    <Avatar sx={{ bgcolor: "red", width: isNonMobileScreen ? "100px" : "70px", height: isNonMobileScreen ? "100px" : "70px" }} variant="square">
                        {currentUser.firstName[0] + currentUser.lastName[0]}
                    </Avatar>
                    <Box sx={{ marginLeft: "0.5rem" }}>
                        <Typography sx={{ fontWeight: "600", fontSize: isNonMobileScreen ? "1.5rem" : "1.2rem", marginLeft: "1rem", marginBottom: '6px' }}>
                            {currentUser.firstName + " " + currentUser.lastName}
                        </Typography>
                        <Box display="flex" justifyContent="space-evenly">
                            <Person4 />
                            <Typography sx={{ fontSize: isNonMobileScreen ? "1rem" : "0.8rem" }}>
                                {"Joined " + format(currentUser.createdAt)}
                            </Typography>
                        </Box>
                    </Box>
                </FlexBetween>
                {user._id === currentUser._id && <div>
                    <Button variant='outlined' style={{ fontSize: isNonMobileScreen ? '0.8rem' : '0.6rem' }} startIcon={<ModeEditOutlineOutlined />} onClick={() => handleClick()}>
                        {isNonMobileScreen ? "Edit Profile" : "Edit"}
                    </Button>
                </div>}
            </FlexBetween>
            <Box marginTop="2rem">
                <h2 style={{ marginBottom: "0.6rem" }}>Skills</h2>
                {
                    allSkills.map((skill, i) =>
                        <Typography key={i} sx={{ marginTop: "0.7rem" }}>{skill}</Typography>
                    )
                }
            </Box>
            <Box marginTop="2rem">
                <h2 style={{ marginBottom: "0.6rem" }}>About</h2>
                <Typography >{currentUser.about}</Typography>
            </Box>
        </div>
    )
}

export default UserWidget
