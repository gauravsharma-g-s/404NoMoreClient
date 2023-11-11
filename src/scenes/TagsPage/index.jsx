import React, { useEffect } from 'react'
import TagsWidget from '../widgets/TagsWidget'
import { Box } from '@mui/material'
import Menu from '../widgets/Menu'
import theme from '../../theme'
import Footer from '../FooterSection'
import { useMediaQuery } from '@mui/material'

function TagsPage() {
  const primaryLight = theme.palette.primary.light;
  const isNonMobileScreen = useMediaQuery("(min-width:840px)")
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <Box display='flex' width="100%">
        {isNonMobileScreen && <div style={{ width: '25%', backgroundColor: primaryLight }}>
          <Menu currentSelected='Tags' />
        </div>}
        <Box style={{ width: 'calc(100% - 25%)', flex: 1 }} height="100%" overflow='auto' >
          <TagsWidget />
        </Box>
      </Box>
      <Footer />
    </div>
  )
}

export default TagsPage
