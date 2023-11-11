import { Box, Button, Chip, Divider, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser'
import { useSelector, useDispatch } from 'react-redux'
import { setQuestion } from '../../state';
import NewALert from '../../components/NewAlert';
import DeleteIcon from '@mui/icons-material/Delete';

function PostAnswer() {
  const token = useSelector(state => state.token)
  const user = useSelector(state => state.user)
  const questions = useSelector(state => state.questions)

  const location = useLocation();
  const extraInfo = location.state;

  const [answer, setAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(extraInfo);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    try {
      const submitAnswerResponse = await fetch(`https://four04nomore-server.onrender.com/question/${selectedQuestion._id}/submitAnswer`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ text: answer, answerBy: user?._id, username: user?.firstName + " " + user?.lastName })
      })

      if (submitAnswerResponse.status === 200) {
        const updatedQuestion = await submitAnswerResponse.json();
        setAlertOpen(true);
        setAlertMessage("Answer added successfully");
        setSeverity('success');
        dispatch(setQuestion({ question: updatedQuestion }));
        setAnswer('')
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleAlertClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false); // Close the error alert
  }

  /* Delete Question */
  const deleteQuestion = async () => {
    try {
      const deleteQuestionResponse = await fetch(`https://four04nomore-server.onrender.com/question/${selectedQuestion?._id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (deleteQuestionResponse.status === 200) {
        navigate('/home?displayAlert=true');
      }
    }
    catch (err) {
      setAlertOpen(true);
      setAlertMessage('Something went wrong');
      setSeverity('error');
    }
  }

  const handleClick = () => {
    deleteQuestion()
  }

  const handleDelete = () => {
    deleteQuestion()
  }

  /* Delete Answer */
  const handleAnswerDelete = async (answerId) => {
    try {
      const answerDeleteResponse = await fetch(`https://four04nomore-server.onrender.com/question/${selectedQuestion._id}/deleteAnswer`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ answerId })
      })
      if (answerDeleteResponse.status === 200) {
        const updatedQuestion = await answerDeleteResponse.json()
        dispatch(setQuestion({ question: updatedQuestion }))
        setAlertOpen(true);
        setAlertMessage('Answer deleted successfully');
        setSeverity('success');
      }
    }
    catch (err) {
      setAlertOpen(true);
      setAlertMessage('Something went wrong');
      setSeverity('error');
    }
  }

  /* Profile Open of User answered question */
  const handleOpenProfile = async (answerUserId) => {
    try {
      const userResponse = await fetch(`https://four04nomore-server.onrender.com/auth/${answerUserId}`, {
        method: "GET",
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (userResponse.status === 200) {
        const answerUser = await userResponse.json();
        navigate('/profile', { state: { _id: answerUser._id, firstName: answerUser.firstName, lastName: answerUser.lastName, about: answerUser.about, skills: answerUser.skills, createdAt: answerUser.createdAt, isOther: true } })

      }
    }
    catch (err) {
      setAlertOpen(true);
      setAlertMessage('Something went wrong');
      setSeverity('error');
    }
  }

  useEffect(() => {
    const changedQuestion = questions.find(question => question._id === selectedQuestion._id);
    setSelectedQuestion(changedQuestion);
  }, [questions])

  return (
    <div style={{ margin: "100px 2rem 1rem" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '2rem' }}>{selectedQuestion.questionText}</Typography>
        {user._id === extraInfo.userId && <Chip
          label="Delete Question"
          onClick={handleClick}
          onDelete={handleDelete}
          deleteIcon={<DeleteIcon style={{ color: 'blue' }} />}
          variant="outlined"
          sx={{ marginLeft: '0.8rem' }}
        />}
      </div>

      <Divider sx={{ marginTop: '1rem' }} />
      <Typography sx={{ marginTop: '1rem' }}>
        {parse(selectedQuestion.questionBody)}
      </Typography>
      <Divider sx={{ marginTop: '1rem' }} />

      <Typography align='center' sx={{ fontSize: '2rem', marginTop: '1rem' }}>All Answers</Typography>
      {
        selectedQuestion?.answers.length === 0 ? <><Typography align='center' sx={{ marginTop: '1rem', color: 'grey', fontSize: '2rem' }}>No answers yet</Typography><Divider sx={{ marginTop: '1rem' }} /></> :
          selectedQuestion?.answers.map((answer, i) =>
            <div key={i}>
              <Typography sx={{ marginTop: '1rem', color: 'grey' }} >{parse(answer.text)}</Typography>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                <IconButton sx={{
                  borderRadius: '5px'
                }} onClick={() => { handleOpenProfile(answer.answerBy) }}>
                  <p style={{ fontStyle: 'italic', fontSize: '0.8rem' }}>  Answer by <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>{answer.username}</span></p>

                </IconButton>

                {(user._id === extraInfo.userId || user._id === answer.answerBy) && <IconButton onClick={() => { handleAnswerDelete(answer._id) }} sx={{
                  borderRadius: '5px'
                }}>
                  <DeleteIcon style={{ color: 'blue', marginLeft: '0.4rem', fontSize: '1rem' }} />
                </IconButton>}

              </div>
              <Divider sx={{ marginTop: '1rem' }} />
            </div>
          )
      }
      <h1>Add your answer here</h1>
      <Box sx={{ display: 'flex', gap: '1rem', width: '100%', flexDirection: 'column' }}>
        <ReactQuill theme="snow" value={answer} onChange={(val) => setAnswer(val)} style={{ height: '20rem', width: '100%' }} />
        <Button sx={{
          marginTop: '2rem', backgroundColor: 'blue', color: 'white',
          '&:hover': {
            color: 'blue',
            border: '1px solid blue'
          }

        }} onClick={handleSubmit}>Submit your Answer</Button>
      </Box>
      <NewALert alertOpen={alertOpen} handleAlertClose={handleAlertClose} alertMessage={alertMessage} severity={severity} />
    </div>
  )
}

export default PostAnswer
