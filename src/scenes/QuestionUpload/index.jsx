import { Formik } from 'formik'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import QuestionUpload from '../widgets/QuestionUpload'

function QuestionUploadPage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div style={{height:"100%",overflow:'auto'}}>
      <QuestionUpload/>
    </div>
  )
}

export default QuestionUploadPage
