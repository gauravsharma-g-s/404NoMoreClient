import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import Menu from '../widgets/Menu'
import QuestionsWidget from '../widgets/QuestionsWidget'
import { useLocation } from 'react-router-dom'
import theme from '../../theme'
import { useMediaQuery } from '@mui/material'
import Footer from '../FooterSection'

function TaggedQuestion() {
    const location = useLocation()
    const primaryLight = theme.palette.primary.light;
    const isNonMobileScreen = useMediaQuery("(min-width:840px)")
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            <Box display='flex' width="100%" height='100vh'>
                {isNonMobileScreen && <div style={{ width: '25%', backgroundColor: primaryLight }}>
                    <Menu currentSelected='Tags' />
                </div>}
                <Box style={{ width: 'calc(100% - 25%)', flex: 1 }} height="100%" overflow='auto' >
                    <div>
                        <h1 style={{ color: "blue", marginLeft: "2rem", marginTop: '75px' }}>{location.state?.questiontag}</h1>
                    </div>
                    <QuestionsWidget tagged />
                </Box>
            </Box>
            <Footer />
        </div>

    )
}

export default TaggedQuestion
