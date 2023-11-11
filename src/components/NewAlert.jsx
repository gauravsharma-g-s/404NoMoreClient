import React from 'react'
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';


function NewALert({ alertOpen, handleAlertClose, alertMessage, severity }) {
  return (
    <div>
      <Snackbar open={alertOpen} autoHideDuration={5000} onClose={handleAlertClose}>
        <MuiAlert elevation={6} variant='filled' severity={severity} onClose={handleAlertClose}>
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

export default NewALert
