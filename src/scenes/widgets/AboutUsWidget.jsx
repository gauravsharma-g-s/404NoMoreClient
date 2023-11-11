import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { Diversity1, Groups, LocalLibrary, OpenWith, PestControl, QuestionAnswer } from '@mui/icons-material';

function AboutUsWidget() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (

        <div style={{ marginTop: '80px' }}>
            {/* Section 1 */}
            <Grid container gap={4} justifyContent='center' alignItems='center' columnSpacing={{ xs: 1, sm: 2, md: 8, lg: 24 }}>
                <Grid item xs={10} sm={10} md={10} lg={5} justifyContent='center'>
                    <img src='./src/assets/community.png' alt="community" style={{ marginTop: '50px' }} />
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={5} >
                    <Typography style={{ color: 'grey', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' }}>Who we are?</Typography>
                    <Typography style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welcome to 404NoMore - Your Coding Community Where Questions Find Answers!</Typography>
                    <Typography style={{ color: 'grey', fontSize: '1.2rem', textAlign: 'justify', lineHeight: '30px' }}> 404NoMore is a passionate and dynamic community of programmers and developers dedicated to helping each other overcome obstacles, find solutions, and share knowledge. Our platform was born out of the desire to create a space where programming enthusiasts, beginners, and experts can come together to collaborate, learn, and grow.</Typography>
                </Grid>

                {/* Section 2 */}
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop: '2rem' }}>
                    <Typography style={{ color: 'grey', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>What We Offer</Typography>
                </Grid>

                <Grid style={{ margin: '1rem 20px' }} container gap={4} justifyContent='center' columnSpacing={{ xs: 1, sm: 2, md: 8, lg: 16 }}>
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <QuestionAnswer />
                        <Typography fontSize='1.2rem'><strong>Ask and Answer Questions</strong></Typography>
                        <Typography textAlign='justify' marginTop='0.6rem'>Whether you're facing a coding challenge or have expertise to share, 404NoMore is your go-to platform to ask questions and provide answers. The community of skillful people is committed to helping you find the answers you seek.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <PestControl />
                        <Typography fontSize='1.2rem'><strong>Error Resolution</strong></Typography>
                        <Typography textAlign='justify' marginTop='0.6rem'>Got an error message that's been haunting your code? Post it here, and other community members will join forces to help you troubleshoot and resolve it.</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Groups />
                        <Typography fontSize='1.2rem'><strong>Collaborative Learning</strong></Typography>
                        <Typography textAlign='justify' marginTop='0.6rem'> We believe that learning should be a collaborative effort. By seeking help and offering assistance, you'll not only find solutions but also grow as a programmer.</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Diversity1 />
                        <Typography fontSize='1.2rem'><strong>Diverse Expertise</strong></Typography>
                        <Typography textAlign='justify' marginTop='0.6rem'>Our community is a melting pot of programming languages, technologies, and experiences. From JavaScript to Python, web development to machine learning, you'll find expertise across the spectrum.</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <LocalLibrary />
                        <Typography fontSize='1.2rem'><strong>Knowledge Sharing</strong></Typography>
                        <Typography textAlign='justify' marginTop='0.6rem'>Share your programming wisdom, tutorials, and best practices with the community. Your knowledge can make a significant impact on someone's learning journey.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <OpenWith />
                        <Typography fontSize='1.2rem'><strong>Open and Inclusive</strong></Typography>
                        <Typography textAlign='justify' marginTop='0.6rem'>We welcome programmers of all levels, from beginners to seasoned professionals. Everyone has a place at 404NoMore, and every question is valued.</Typography>
                    </Grid>
                </Grid>
                {/* Section 3 */}
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop: '2rem' }}>
                    <Typography style={{ color: 'grey', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>Our Mission</Typography>
                </Grid>

                <Grid item xs={10} sm={10} md={10} lg={10} >
                    <Typography style={{ color: '#6d6d6d', fontSize: '1.2rem', textAlign: 'justify', lineHeight: '30px' }}> 404NoMore is a passionate and dynamic community of programmers and developers dedicated to helping each other overcome obstacles, find solutions, and share knowledge. It helps the people to post their questions and other people in the community can answer their question. It also helps other people in the future, to resolve their errors because that error may be solved in past and answers are already available. Our platform was born out of the desire to create a space where programming enthusiasts, beginners, and experts can come together to collaborate, learn, and grow.</Typography>
                </Grid>
                {/* section 4 */}
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop: '2rem' }}>
                    <Typography style={{ color: 'grey', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>Join Our Community</Typography>
                </Grid>

                <Grid item xs={10} sm={10} md={10} lg={10} >
                    <Typography style={{ color: '#6d6d6d', fontSize: '1.2rem', textAlign: 'justify', lineHeight: '30px' }}> We invite you to become a part of the 404NoMore community. Whether you're here to seek answers, help others, or share your knowledge, you are essential to our mission. Together, we can break down the programming errors, learn from one another, and embrace the spirit of collaboration that defines programming.</Typography>
                </Grid>


                <Grid item xs={10} sm={10} md={10} lg={10} style={{ margin: '2rem' }}>
                    <Typography style={{ color: 'grey', ontWeight: 'bold', fontSize: '2.2rem', textAlign: 'center', lineHeight: '60px' }}>Thank you for choosing 404NoMore as your programming home. Let's code, learn, and grow together!</Typography>
                </Grid>

            </Grid>
        </div>



    );
}

export default AboutUsWidget;
