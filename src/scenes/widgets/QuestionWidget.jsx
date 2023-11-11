import React, { useEffect, useState } from 'react'
import FlexBetween from '../../components/FlexBetween'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import theme from '../../theme'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


function QuestionWidget({ questionId,
    userId,
    questionText,
    keywords,
    answers,
    questionBody,
    createdAt }) {
    const allKeywords = keywords.split(/,\s*/g);
    const userDetailsColor = theme.palette.background.main;
    const mainGreen = theme.palette.success.main;
    const mainColor = theme.palette.primary.main;
    const token = useSelector(state => state.token)
    const [username, setUserName] = useState('');
    const isNonMobileScreen = useMediaQuery('(min-width:640px)')
    
    const questionUser = async () => {
        try {
            const userRes = await fetch(`https://four04nomore-server.onrender.com/auth/${userId}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const user = await userRes.json();
            setUserName(user.firstName + " " + user.lastName)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        questionUser();
    },[])
    return (
        <Box borderTop={`2px dotted ${theme.palette.background.medium}`} borderBottom={`2px dotted ${theme.palette.background.medium}`}>
            <Box justifyContent="space-between" display="flex" padding="1rem 1rem">
                <FlexBetween >
                    {/* Number of answers */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ borderRadius: "6px", backgroundColor: theme.palette.success.light, border: `2px solid ${mainGreen}`, color: mainGreen, padding: "0.2rem", fontSize: isNonMobileScreen?"0.8rem":"0.6rem" }}>{answers.length} answers</span>
                    </Box>
                    {/* Question and Its Tags */}
                    <Box sx={{ paddingLeft: "1rem" }}>
                        <Box sx={{
                            marginLeft: "1rem", color: mainColor, textDecoration: 'none', "&:hover": {
                                cursor: "pointer",
                                color: theme.palette.primary.medium
                            }
                        }}>
                            <Link to='/addAnswer'
                                state={{
                                    _id: questionId, username, questionText, keywords, answers, questionBody, userId
                                }} style={{ textDecoration: 'none',fontSize:isNonMobileScreen?'1rem':'0.8rem' }}>{questionText}</Link></Box>
                        <Grid container>
                            {allKeywords.map((keyword, i) =>
                                <Grid item key={i} sx={{ marginLeft: "1rem", marginTop: "0.5rem", borderRadius: "6px", backgroundColor: theme.palette.primary.light, color: mainColor, padding: "0.2rem", fontSize: "0.7rem" }}>
                                    {keyword}
                                </Grid>
                            )}
                        </Grid >
                    </Box>
                </FlexBetween>

                <Box marginLeft="0.6rem" >
                    <Typography sx={{ fontSize: isNonMobileScreen?"0.8rem":"0.6rem", color: userDetailsColor }}>
                        Asked By
                    </Typography>
                    <Typography sx={{ fontSize: isNonMobileScreen?"0.8rem":"0.6rem", fontWeight: "600", color: userDetailsColor }}>
                        {username}
                    </Typography>
                    <Typography sx={{ fontSize: isNonMobileScreen?"0.8rem":"0.6rem", fontWeight: "500", color: userDetailsColor }}>
                        {format(createdAt)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default QuestionWidget
