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
        const response = await axios.post('http://localhost:5000/api/upload_quiz/uploadfile', {
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
      <div className="edit-delete-container">
        <h2>Preview Quiz</h2>
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={q.question_no} className="question-item">
              <div>
                <b>{index + 1}. {q.question}</b>
                <ul>
                  {['A', 'B', 'C', 'D'].map(option => (
                    <li key={option}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="radio"
                          name={`question-${q.question_no}`}
                          value={q[option]}
                        />
                        {option}: {q[option]}
                      </label>
                    </li>
                  ))}
                  <li><b>Correct Answer: {q.correct_answer}</b></li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>Loading questions...</p>
        )}
        <Button 
          variant="contained" 
          color="success" 
          onClick={handleSave}
          sx={{ marginRight: "1rem" }}
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
    </>
  );
}

export default Preview;
