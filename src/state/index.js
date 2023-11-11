import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token : null,
    user: null,
    questions: []
}

export const authSlice = createSlice(
    {
        name:"auth",
        initialState,
        reducers:{
            setLogin:(state,action)=>{
                state.token = action.payload.token;
                state.user = action.payload.user;
            },
            setLogout:(state)=>{
                state.token = null;
                state.user = null;
                
            },
            setQuestions:(state,action)=>{
                state.questions = action.payload.questions;
            },
            setQuestion:(state,action)=>{
                const updatedQuestionS = state.questions.map(question=>{
                    if(question._id===action.payload.question._id) return action.payload.question;
                    return question;
                })
                state.questions = updatedQuestionS;
            },
            removeQuestion:(state,action)=>{
                const questionIdToDelete = action.payload;
                state.questions = state.questions.filter(question=>question._id!==questionIdToDelete)
            },
            setAbout:(state,action)=>{
                state.user.about = action.payload
            },
            setSkills:(state,action)=>{
                state.user.skills = action.payload
            },
            setfirstName:(state,action)=>{
                state.user.firstName = action.payload
            },
            setlastName:(state,action)=>{
                state.user.lastName = action.payload
            }
        }
    }
)

export const {setLogin,setLogout,setQuestion,setQuestions,removeQuestion,setAbout,setSkills,setfirstName,setlastName} = authSlice.actions;
export default authSlice.reducer
