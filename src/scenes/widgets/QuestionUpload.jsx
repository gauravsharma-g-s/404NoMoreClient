import { Button, TextField, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import theme from '../../theme';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestions } from '../../state';
import NewALert from '../../components/NewAlert';

function QuestionUpload() {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [questionBody, setQuestionBody] = useState('')
    const user = useSelector(state => state.user)
    const token = useSelector(state => state.token)
    const username = user.firstName + " " + user.lastName;
    const userId = user._id;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [alertOpen, setAlertOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [severity, setSeverity] = useState('info');

    const isNonMobileScreens = useMediaQuery('(min-width:800px)')
    const main = theme.palette.primary.main;

    const handleQuestionUpload = async (e) => {
        e.preventDefault();
        try {
            const questionDetails = { questionText: title, keywords: tags, username, userId, questionBody }
            if (questionDetails.questionText.trim() === '' || questionDetails.keywords.trim() === '' || questionDetails.questionBody.trim() === '') {      // Incomplete details
                setSeverity('error')
                setAlertOpen(true);
                setSuccessMessage("Please add all the details of your question")
            }
            else {
                const uploadQuestionResponse = await fetch('https://four04nomore-server.onrender.com/question/submitQuestion', {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    body: JSON.stringify(questionDetails)
                })
                if (uploadQuestionResponse.status === 200) {
                    const allQuestions = await uploadQuestionResponse.json();
                    dispatch(setQuestions(allQuestions))
                }
                navigate('/home')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleCancel = () => {
        navigate('/home')
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false); // Close the error alert
    }
    return (
        <div width="100%">
            <div style={{
                display: 'flex', flexDirection: 'column', alignContent: 'center',
                justifyContent: 'center', alignItems: isNonMobileScreens ? 'center' : 'normal',
                marginTop: '100px',
                marginLeft: isNonMobileScreens ? '0rem' : '2rem', marginRight: isNonMobileScreens ? '0rem' : '2rem'
            }}>
                <div style={{ width: isNonMobileScreens ? "50%" : "100%", display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h1 style={{ marginBottom: '0.5rem', marginTop: '0.5rem', color: main }}>Add your Question</h1>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{
                            width: '100%'
                        }}
                    />
                    <ReactQuill theme="snow" value={questionBody} onChange={(val) => setQuestionBody(val)} style={{ height: '40vh' }} />
                    <TextField
                        label="Add tags separated by commas"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        sx={{ marginTop: isNonMobileScreens ? '3rem' : '4rem', width: '100%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '6vh', marginBottom: '1rem' }}>
                        <LoadingButton sx={{
                            width: '40%', backgroundColor: main, color: 'white', "&:hover": {
                                color: main
                            }
                        }} onClick={handleQuestionUpload}>Add</LoadingButton>
                        <Button sx={{ width: '40%', border: `1px solid ${main}` }} onClick={handleCancel}>Cancel</Button>
                    </div>

                </div>
            </div>
            <NewALert handleAlertClose={handleAlertClose} alertOpen={alertOpen} alertMessage={successMessage} severity={severity} />
        </div>
    )
}

export default QuestionUpload
