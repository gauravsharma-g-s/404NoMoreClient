import React, { useEffect } from 'react'
import QuestionsWidget from '../widgets/QuestionsWidget';
import AskQuestion from '../widgets/AskQuestion';
import Menu from '../widgets/Menu';
import { Box } from '@mui/material';
import theme from '../../theme';
import Footer from '../FooterSection';
import { useMediaQuery } from '@mui/material'

function AllQuestionsPage() {
  const primaryLight = theme.palette.primary.light;
  const isNonMobileScreen = useMediaQuery("(min-width:840px)")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <Box display='flex' width="100%">
        {
          isNonMobileScreen && <div style={{ width: '25%', backgroundColor: primaryLight }}>
            <Menu currentSelected='All Questions' />
          </div>
        }
        <Box style={{ width: 'calc(100% - 25%)', flex: 1 }} height="100%" overflow='auto'>
          <AskQuestion />
          <QuestionsWidget allQuestions />
        </Box>
      </Box>
      <Footer />
    </div>

  )
}

export default AllQuestionsPage
