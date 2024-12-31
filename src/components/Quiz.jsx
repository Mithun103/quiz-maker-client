import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Button from '@mui/material/Button';

const Quiz = ({ setFeedback }) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`https://quiz-maker-backend-1lkn.onrender.com/api/getquizzes`, { id })
      .then(response => {
        console.log("API response:", response.data); // Debugging
        setQuestions(response.data.questions || []); // Set questions if available
      })
      .catch(err => {
        console.error("Error fetching quiz data:", err);
      });
  }, [id]);

  const handleAnswer = (questionNo, answer) => {
    setUserAnswers({ ...userAnswers, [questionNo]: answer });
  };

  const handleSubmit = () => {
    const answers = questions.map(q => ({
      question_no: q.question_no,
      question: q.question,
      A: q.A,
      B: q.B,
      C: q.C,
      D: q.D,
      correct_answer: q.correct_answer,
      user_answer: userAnswers[q.question_no] || ''
    }));

    axios.post(`https://quiz-maker-backend-1lkn.onrender.com/api/quizzes/${id}/submit`, { answers })
      .then(response => {
        alert('Answers submitted successfully!');
        console.log(response.data);
        setFeedback(response.data);
        navigate("/feedback");
      })
      .catch(err => {
        console.error("Error submitting answers:", err);
        alert('Failed to submit answers. Please try again.');
      });
  };

  return (
    <>
      <Navbar />
      <div className="edit-delete-container">
        <h2>Quiz</h2>
        {questions.length === 0 ? (
          <p>Loading questions...</p>
        ) : (
          questions.slice(1).map(q => (
            <div key={q.question_no} className="question-item">
              <div>
                <b>{q.question_no}. {q.question}</b>
                <ul>
                  {['A', 'B', 'C', 'D'].map(option => (
                    <li key={option}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="radio"
                          name={`question-${q.question_no}`}
                          value={option}
                          onChange={() => handleAnswer(q.question_no, option)}
                          checked={userAnswers[q.question_no] === option}
                        />
                        {option}: {q[option]}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
        <Button 
          variant="contained" 
          color="success" 
          onClick={handleSubmit}
          sx={{ marginTop: '20px' }}
        >
          Submit Quiz
        </Button>
      </div>
    </>
  );
};

export default Quiz;
