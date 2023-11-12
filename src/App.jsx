import Navbar from "./scenes/NavBar/Navbar"
import HomePage from "./scenes/HomePage"
import LoginPage from './scenes/LoginPage'
import theme from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useSelector } from "react-redux"
import { Route, Routes, Navigate, BrowserRouter, HashRouter } from "react-router-dom"
import Menu from "./scenes/widgets/Menu"
import UserEdit from "./scenes/widgets/UserEdit"
import './index.css'
import ProfilePage from "./scenes/ProfilePage/ProfilePage"
import ProfileEditPage from "./scenes/ProfileEditPage"
import TagsPage from "./scenes/TagsPage"
import UsersPage from "./scenes/UsersPage"
import QuestionUploadPage from "./scenes/QuestionUpload"
import PostAnswerPage from "./scenes/PostAnswerPage"
import AllQuestionsPage from "./scenes/AllQuestionsPage"
import TaggedQuestion from "./scenes/TaggedQuestions"
import AboutUsPage from "./scenes/AboutUsPage"
import TCPage from "./scenes/TCPage"

function App() {
  const isAuth = useSelector(state => state.token);
  return (
    <div height="100%" className="app">
      <HashRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {window.location.hash!=='' && window.location.hash!=='#/' && <Navbar/>}
      <Routes>
        <Route exact path='/' element={<LoginPage/>}/>
        <Route exact path='/home' element={isAuth?<HomePage/>:<Navigate to="/"/>}/>
        <Route exact path='/profile' element={isAuth?<ProfilePage/>:<Navigate to="/"/>}/>
        <Route exact path='/editUser' element={isAuth?<ProfileEditPage/>:<Navigate to='/'/>}/>
        <Route exact path='/tags' element={isAuth?<TagsPage/>:<Navigate to='/'/>}/>
        <Route exact path='/users' element={isAuth?<UsersPage/>:<Navigate to='/'/>}/>
        <Route exact path='/askquestion' element={isAuth?<QuestionUploadPage/>:<Navigate to='/'/>}/>
        <Route exact path='/addAnswer' element={isAuth?<PostAnswerPage/>:<Navigate to='/'/>}/>
        <Route exact path='/allquestions' element={isAuth?<AllQuestionsPage/>:<Navigate to='/'/>}/>
        <Route exact path='/tagSelected' element={isAuth?<TaggedQuestion/>:<Navigate to='/'/>}/>
        <Route exact path='/about' element={<AboutUsPage/>}/>
        <Route exact path='/terms' element={<TCPage/>}/>
      </Routes>

    </ThemeProvider>
    </HashRouter>

    </div>
  )
}

export default App
