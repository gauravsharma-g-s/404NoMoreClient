import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material'

function Footer() {
  return (
    <div style={{ backgroundColor: '#232f3e', color: 'white', overflowX: 'hidden' }}>
      <Grid container sx={{ margin: '0rem 2rem 2rem' }} gap={3} justifyContent='center' columnSpacing={{ xs: 1, sm: 2, md: 8, lg: 24 }} rowSpacing={0}>
        <Grid item sx={{ margin: '0rem 2rem 2rem', textAlign: 'justify' }} xs={8} sm={10} md={6} lg={4}>
          <h1>404NoMore</h1>
          <Typography color='grey'> 404NoMore is an innovative application designed to provide a platform for users to post their questions and receive answers from a community of knowledgeable individuals. Our app aims to foster a collaborative environment where users can seek assistance, share insights, and engage in discussions. Whether you are a beginner or an expert in a particular field, 404NoMore offers a space for you to connect with like-minded individuals and expand your knowledge.
          </Typography>
        </Grid>
        <Grid item sx={{ margin: '0rem 2rem 2rem', textAlign: 'justify' }} style={{ paddingLeft: '0rem' }} xs={8} sm={4} md={4} lg={1}>
          <h3 className='headings'>Explore</h3>
          <ul style={{ listStyleType: 'none' }}>
            <li><Link to='/home' className='link'>Home</Link></li>
            <li><Link to='/users' className='link'>Users</Link></li>
            <li><Link to='/tags' className='link'>Tags</Link></li>
            <li><Link to='/allquestions' className='link'>All Questions</Link></li>
            <li><Link to='/about' className='link'>About Us</Link></li>
          </ul>
        </Grid>
        <Grid item sx={{ margin: '0rem 2rem 2rem', textAlign: 'justify' }} style={{ paddingLeft: '0rem' }} xs={8} sm={4} md={3} lg={1}>

          <h3 className='headings'>Other Products</h3>
          <ul style={{ listStyleType: 'none' }}>
            <li><a href='https://connect-cdgy.onrender.com/' className='link' target='_blank'>Connect</a></li>
          </ul>


          <h3 className='headings'>Contact Us</h3>
          <ul style={{ listStyleType: 'none' }}>
            <li><a href='mailto:g404nomore@outlook.com' className='link'>contact@404NoMore.com</a></li>
            <li><a href='tel:8219496857' className='link'>+91 8219496857</a></li>
          </ul>
        </Grid>
        <Grid item sx={{ margin: '0rem 2rem 2rem', textAlign: 'justify' }} style={{ paddingLeft: '0rem' }} xs={8} sm={4} md={2} lg={1}>
          <h3 className='headings'>Stay In Touch</h3>
          <ul style={{ listStyleType: 'none' }}>

            <li style={{ marginBottom: '1rem' }}><a href='https://www.facebook.com/profile.php?id=61552964567923' target='_blank' className='link'><Facebook style={{ verticalAlign: 'middle' }} /><span style={{ marginLeft: '0.4rem' }}>Facebook</span></a></li>
            <li style={{ marginBottom: '1rem' }}><a href='https://twitter.com/Four04nomore' target='_blank' className='link'><Twitter style={{ verticalAlign: 'middle' }} /><span style={{ marginLeft: '0.4rem' }}>Twitter</span></a></li>
            <li style={{ marginBottom: '1rem' }}><a href='https://www.linkedin.com/company/404nomore/' target='_blank' className='link'><LinkedIn style={{ verticalAlign: 'middle' }} /><span style={{ marginLeft: '0.4rem' }}>Linkedin</span></a></li>
            <li style={{ marginBottom: '1rem' }}><a href='https://www.instagram.com/four04nomore/?next=https%3A%2F%2Fbusiness.instagram.com%2F' target='_blank' className='link'><Instagram style={{ verticalAlign: 'middle' }} /><span style={{ marginLeft: '0.4rem' }}>Instagram</span></a></li>
          </ul>
        </Grid>
        <Grid item sx={{ margin: '0rem 2rem 2rem', textAlign: 'justify' }} style={{ paddingLeft: '0rem' }} xs={8} sm={4} md={2} lg={1}>
          <h3 className='headings'>Legal</h3>
          <ul style={{ listStyleType: 'none' }}>
            <li><Link to='/terms' className='link'>Terms</Link></li>
            <li><Link to='/terms' className='link'>Policies</Link></li>
            <li><Link to='/terms' className='link'>Security</Link></li>
          </ul>
        </Grid>
      </Grid>

      <div style={{ textAlign: 'center', fontSize: '0.8rem', marginBottom: '1rem' }}>
        Copyright © 2023 404NoMore | All rights reserved | Made in India
      </div>
    </div>
  )
}

export default Footer