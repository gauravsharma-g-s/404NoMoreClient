import React, { useEffect } from 'react'
import PostAnswer from '../widgets/PostAnswer'
import Menu from '../widgets/Menu'
import { Box } from '@mui/material'
import theme from '../../theme'
import Footer from '../FooterSection'
import { useMediaQuery } from '@mui/material'

function PostAnswerPage() {
  const primaryLight = theme.palette.primary.light;
  const isNonMobileScreen = useMediaQuery("(min-width:840px)")
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <div style={{ display: 'flex', width: '100%' }}>
        {isNonMobileScreen && <div style={{ width: '25%', backgroundColor: primaryLight }}>
          <Menu currentSelected='All Questions' />
        </div>}
        <Box style={{ width: 'calc(100% - 25%)', flex: 1 }} height="100%" overflow='auto' overflowX='hidden' >
          <PostAnswer />
        </Box>
      </div>
      <Footer />
    </div>
  )
}

export default PostAnswerPage
