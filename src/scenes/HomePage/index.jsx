import React, { useEffect, useRef, useState } from 'react'
import Menu from '../widgets/Menu'
import AskQuestion from '../widgets/AskQuestion'
import { Box } from '@mui/material'
import QuestionsWidget from '../widgets/QuestionsWidget'
import { useSelector } from 'react-redux'
import NewALert from '../../components/NewAlert';
import { useLocation } from 'react-router-dom'
import Footer from '../FooterSection'
import theme from '../../theme'
import { useMediaQuery } from '@mui/material'

function HomePage() {
  const { _id } = useSelector(state => state.user);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const displayAlert = params.get('displayAlert');
  const isNonMobileScreen = useMediaQuery("(min-width:840px)")
  const primaryLight = theme.palette.primary.light;
  const handleAlertClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false); // Close the error alert
  }

  useEffect(() => {
    if (displayAlert) {
      setAlertOpen(true)
      setAlertMessage('Deleted successfully');
      setSeverity('success')
    }
  }, [displayAlert])

  /* Render from Top  */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div >
      <Box display='flex' width="100%">
        {isNonMobileScreen && <div style={{ width: '25%', backgroundColor: primaryLight }} >
          <Menu currentSelected='Home' />
        </div>}
        <Box style={{ width: 'calc(100% - 25%)', flex: 1 }} height="100%" overflow='auto' overflowX='hidden'>
          <AskQuestion homePage />
          <QuestionsWidget />
        </Box>
        <NewALert alertOpen={alertOpen} handleAlertClose={handleAlertClose} alertMessage={alertMessage} severity={severity} />
      </Box>
      <Footer />
    </div>
  )
}

export default HomePage