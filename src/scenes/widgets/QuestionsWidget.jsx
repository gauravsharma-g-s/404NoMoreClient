import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setQuestions } from '../../state';
import QuestionWidget from './QuestionWidget';
import { useLocation } from 'react-router-dom';


function QuestionsWidget({ allQuestions, tagged }) {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questions);
    const token = useSelector(state => state.token);
    const location = useLocation();

    const extraInfo = location.state;
    const [displayedQuestions, setDisplayedQuestions] = useState(questions);
    // GET ALL QUETIONS
    const getAllQuestions = async () => {
        const response = await fetch("https://four04nomore-server.onrender.com/question/allQuestions", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        let data = await response.json();
        data = data?.reverse()
        dispatch(setQuestions({ questions: data }));
    };

    // GET TOP QUESTIONS
    const getTopQuestions = () => {
        const topQuestions = questions.slice(0, 10)
        setDisplayedQuestions(topQuestions)
    }

    // TAG SELECTED QUESTIONS
    const getTaggedQuestions = (searchTag) => {
        const taggedQuestions = questions.filter((question) => {

            const questiontagsLowerCase = question.keywords.toLowerCase()
            const questionTags = questiontagsLowerCase?.split(/,\s*/g);                                   // USING REGULAR EXPRESSION
            return questionTags?.some(tag => tag === searchTag);
        })
        setDisplayedQuestions(taggedQuestions);
    }

    useEffect(() => {
        getAllQuestions();
    }, []);

    useEffect(() => {
        if (extraInfo !== null && tagged) {
            const searchTag = extraInfo.questiontag.toLowerCase();
            getTaggedQuestions(searchTag);
        } else if (!allQuestions && !tagged) {
            getTopQuestions();
        }
    }, [questions, extraInfo, tagged, allQuestions]);
    return (
        <>
            {
                displayedQuestions?.map(({ _id, userId, questionText, questionBody, keywords, answers, createdAt }, i) => (
                    <QuestionWidget
                        key={i}
                        questionId={_id}
                        userId={userId}
                        questionText={questionText}
                        keywords={keywords}
                        answers={answers}
                        questionBody={questionBody}
                        createdAt={createdAt} />
                ))
            }
        </>
    )
}
export default QuestionsWidget
