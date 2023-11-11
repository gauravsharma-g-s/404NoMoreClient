import React, { useEffect } from 'react'
import TCWidget from '../widgets/TCWidget'
import Footer from '../FooterSection'

function TCPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div style={{ overflowX: 'hidden' }}>
      <TCWidget />
      <Footer />
    </div>
  )
}

export default TCPage
