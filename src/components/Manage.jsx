import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './manage.css';

function Manage() {
    const [quizId, setQuizId] = useState('');
    const [quiz, setQuiz] = useState(null);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizzes();
    }, []); 

    const fetchQuizzes = () => {
        axios.get('https://quiz-maker-backend-1lkn.onrender.com/api/manage/quizzes')
            .then(response => {
                if (response.data.success) {
                    setQuizzes(response.data.quizzes);
                }
            })
            .catch(error => {
                console.error('Error fetching quizzes:', error);
            });
    };

    const handleSearch = () => {
        if (quizId.trim() !== '') {
            axios.get(`https://quiz-maker-backend-1lkn.onrender.com/api/manage/quiz/${quizId}`)
                .then(response => {
                    if (response.data.success) {
                        setQuiz(response.data.quiz);
                    }
                })
                .catch(() => {
                    alert('Quiz not found');
                    setQuiz(null);
                });
        } else {
            alert('Please enter a Quiz ID');
        }
    };

    const handleEdit = (id) => {
        if (!id) {
            console.error('Invalid quiz ID');
            return;
        }
        window.location.href = `/manage/${id}`;
    };

    const handleDelete = (id) => {
        if (!id) {
            console.error('Invalid quiz ID');
            return;
        }
        if (window.confirm('Are you sure you want to delete this quiz?')) {
            axios.delete(`https://quiz-maker-backend-1lkn.onrender.com/api/manage/quiz/${id}`)
                .then(response => {
                    if (response.data.success) {
                        alert('Quiz deleted successfully');
                        setQuiz(null);
                        setQuizId('');
                        fetchQuizzes();
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert('Failed to delete quiz');
                });
        }
    };

    const handleSave = (id) => {
        if (!quiz || !id) {
            console.error('Invalid quiz or quiz ID');
            return;
        }

        axios.put(`https://quiz-maker-backend-1lkn.onrender.com/api/manage/quiz/${id}`, quiz)
            .then(response => {
                if (response.data.success) {
                    alert('Quiz saved successfully');
                    fetchQuizzes();
                }
            })
            .catch(err => {
                console.error(err);
                alert('Failed to save quiz');
            });
    };

    const handleQuestionUpdate = (questionIndex, updatedQuestion) => {
        if (!quiz) return;

        const updatedQuestions = [...quiz.questions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            ...updatedQuestion
        };

        const updatedQuiz = {
            ...quiz,
            questions: updatedQuestions
        };

        setQuiz(updatedQuiz);
        handleSave(quiz.id);
    };

    return (
        <>
            <Navbar />
            <div className="manage">
                <h2>Manage Quiz</h2>
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
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>

                {quiz && (
                    <div className="quiz-details">
                        <div className="quiz-info">
                            <h3>{quiz.title}</h3>
                            <p>Quiz ID: {quiz.id}</p>
                            <p>Total Questions: {quiz.totalQuestions - 1}</p>
                        </div>
                        <div className="quiz-actions">
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleSave(quiz.id)}
                                sx={{ marginRight: "1rem" }}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleEdit(quiz.id)}
                                sx={{ marginRight: "1rem" }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDelete(quiz.id)}
                            >
                                Delete
                            </Button>
                        </div>

                        <div className="questions-list">
                            <h4>Questions</h4>
                            {quiz.questions.map((question, index) => (
                                <div key={index} className="question-item">
                                    <TextField
                                        fullWidth
                                        label={`Question ${index + 1}`}
                                        value={question.question}
                                        onChange={(e) => handleQuestionUpdate(index, { 
                                            ...question, 
                                            question: e.target.value 
                                        })}
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Option A"
                                        value={question.A}
                                        onChange={(e) => handleQuestionUpdate(index, { 
                                            ...question, 
                                            A: e.target.value 
                                        })}
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Option B"
                                        value={question.B}
                                        onChange={(e) => handleQuestionUpdate(index, { 
                                            ...question, 
                                            B: e.target.value 
                                        })}
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Option C"
                                        value={question.C}
                                        onChange={(e) => handleQuestionUpdate(index, { 
                                            ...question, 
                                            C: e.target.value 
                                        })}
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Option D"
                                        value={question.D}
                                        onChange={(e) => handleQuestionUpdate(index, { 
                                            ...question, 
                                            D: e.target.value 
                                        })}
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Correct Answer"
                                        value={question.correct_answer}
                                        onChange={(e) => handleQuestionUpdate(index, { 
                                            ...question, 
                                            correct_answer: e.target.value 
                                        })}
                                        margin="normal"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="all-quizzes">
                    <h3>All Quizzes</h3>
                    {quizzes.map(quiz => (
                        <div key={quiz.id} className="quiz-item">
                            <span>Title: {quiz.title}</span>
                            <span>ID: {quiz.id}</span>
                            <span>Questions: {quiz.totalQuestions - 1}</span>
                            <div className="quiz-actions">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleEdit(quiz.id)}
                                    size="small"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(quiz.id)}
                                    size="small"
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Manage;
