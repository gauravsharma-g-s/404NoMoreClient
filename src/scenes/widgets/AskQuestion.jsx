import React from 'react'
import FlexBetween from '../../components/FlexBetween'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
function AskQuestion({ homePage }) {
  const { palette } = useTheme();
  const main = palette.primary.main;
  const medium = palette.primary.medium;
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:450px)')
  const handleClick = () => {
    navigate('/askquestion');
  }
  return (
    <FlexBetween marginTop="70px">
      <h1 style={{ color: "blue", marginLeft: isNonMobile ? "2rem" : "1rem", fontSize: isNonMobile ? "2rem" : "1.5rem" }}>{homePage ? 'Top ' : 'All '}Questions</h1>
      <Box sx={{
        marginRight: "1rem", backgroundColor: main, color: medium, padding: "0.5rem", fontSize: isNonMobile ? '1rem' : '0.8rem', "&:hover": {
          cursor: "pointer",
          backgroundColor: palette.primary.light,
          color: main,
          borderRadius: "10px",
        }
      }} onClick={handleClick}>Ask question</Box>
    </FlexBetween>
  )
}

export default AskQuestion
