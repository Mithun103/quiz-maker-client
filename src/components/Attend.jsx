import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './attendquiz.css';

function AttendQuiz() {
  const [quizId, setQuizId] = useState('');
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/getquizzes')
      .then(response => {
        if (response.data.success) {
          setQuizzes(response.data.quizzes || []);
        }
      })
      .catch(err => console.error('Error fetching quizzes:', err));
  }, []);

  const handleQuizIdSubmit = () => {
    if (quizId.trim() !== '') {
      window.location.href = `/quiz/${quizId}`;
    } else {
      alert('Please enter a valid Quiz ID.');
    }
  };

  const handleAttendQuiz = (id) => {
    window.location.href = `/quiz/${id}`;
  };

  return (
    <>
      <Navbar />
      <div className="manage">
        <h2>Attend Quiz</h2>
        <div className="search-container">
          <TextField
            label="Enter Quiz ID"
            variant="outlined"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            sx={{ marginRight: "1rem" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleQuizIdSubmit}
          >
            Search
          </Button>
        </div>

        <div className="all-quizzes">
          <h3>Available Quizzes</h3>
          {quizzes.map(quiz => (
            <div key={quiz.id} className="quiz-item">
              <span>{quiz.topic}</span>
              <span>ID: {quiz.id}</span>
              <span>Questions: {quiz.totalQuestions - 1}</span>
              <div className="quiz-actions">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAttendQuiz(quiz.id)}
                  size="small"
                >
                  Attend
                </Button>
              </div>
            </div>
          ))}
          {quizzes.length === 0 && (
            <p>No quizzes available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AttendQuiz;
