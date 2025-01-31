import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import './Preview.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Preview() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Send a POST request instead of GET
        const response = await axios.post('https://quiz-maker-backend-1lkn.onrender.com/api/upload_quiz/uploadfile', {
          // Include any required payload if needed
        });
        if (response.data.questions) {
          setQuestions(response.data.questions);
          console.log(response.data.questions);
          
        } else {
          console.error('No questions found in response');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
  
    fetchQuestions();
  }, []);
  

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/savequiz', { questions });
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="preview-container">
        <h2>Preview Quiz</h2>
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={q.question_no} className="question-item">
              <div className="question-content">
                <b>{index + 1}. {q.question}</b>
                <ul className="options-list">
                  {['A', 'B', 'C', 'D'].map(option => (
                    <li key={option} className="option-item">
                      <label>
                        <input
                          type="radio"
                          name={`question-${q.question_no}`}
                          value={q[option]}
                          disabled
                        />
                        {option}: {q[option]}
                      </label>
                    </li>
                  ))}
                  <li className="option-item correct-answer">
                    <b>Correct Answer: {q.correct_answer}</b>
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>Loading questions...</p>
        )}
        <div className="button-container">
          <Button 
            variant="contained" 
            color="success" 
            onClick={handleSave}
          >
            Save
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => navigate('/manage')}
          >
            Edit And Delete
          </Button>
        </div>
      </div>
    </>
  );
}

export default Preview;

