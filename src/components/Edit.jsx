import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './editdelete.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditDelete() {
    const navigate = useNavigate();
    const sample = [
        {
          "question_no": 1,
          "question": "What is the primary function of an Operating System?",
          "A": "To manage computer hardware",
          "B": "To manage computer software",
          "C": "To act as an interface between the user and the computer hardware",
          "D": "To manage computer networks",
          "correct_answer": "C"
        },
        {
          "question_no": 2,
          "question": "What is Memory Management in the context of Operating Systems?",
          "A": "Management of Secondary Memory",
          "B": "Management of Primary Memory",
          "C": "Management of Virtual Memory",
          "D": "Management of Cache Memory",
          "correct_answer": "B"
        },
        {
          "question_no": 3,
          "question": "What is the main difference between Multiprogrammed Batch Systems and Time-Sharing Systems?",
          "A": "In Multiprogrammed Batch Systems, the objective is to maximize processor use, whereas in Time-Sharing Systems, the objective is to minimize response time",
          "B": "In Multiprogrammed Batch Systems, the objective is to minimize response time, whereas in Time-Sharing Systems, the objective is to maximize processor use",
          "C": "In Multiprogrammed Batch Systems, the CPU is often idle, whereas in Time-Sharing Systems, the CPU is always busy",
          "D": "In Multiprogrammed Batch Systems, the CPU is always busy, whereas in Time-Sharing Systems, the CPU is often idle",
          "correct_answer": "A"
        },
        {
          "question_no": 4,
          "question": "What is the function of the Operating System as a resource manager?",
          "A": "To manage computer hardware",
          "B": "To manage computer software",
          "C": "To allocate system resources to specific programs and users",
          "D": "To manage computer networks",
          "correct_answer": "C"
        },
        {
          "question_no": 5,
          "question": "What is the main advantage of Time-Sharing Operating Systems?",
          "A": "Maximization of processor use",
          "B": "Minimization of response time",
          "C": "Avoidance of duplication of software",
          "D": "Reduction of CPU idle time",
          "correct_answer": "B"
        },
        {
          "question_no": 6,
          "question": "What is the primary purpose of a Network Operating System?",
          "A": "To manage computer hardware",
          "B": "To manage computer software",
          "C": "To allow shared file and printer access among multiple computers in a network",
          "D": "To manage computer networks",
          "correct_answer": "C"
        },
        {
          "question_no": 7,
          "question": "What is a Real-Time System?",
          "A": "A system that can process data in real-time",
          "B": "A system that can process data in batches",
          "C": "A system that can process data in a time-sharing environment",
          "D": "A system that can process data in a distributed environment",
          "correct_answer": "A"
        },
        {
          "question_no": 8,
          "question": "What is the function of System Calls in an Operating System?",
          "A": "To manage computer hardware",
          "B": "To manage computer software",
          "C": "To provide an interface between a process and the Operating System",
          "D": "To manage computer networks",
          "correct_answer": "C"
        },
        {
          "question_no": 9,
          "question": "What are the five types of System Calls in an Operating System?",
          "A": "Process Control, File Management, Device Management, Information Maintenance, and Communication",
          "B": "Process Control, File Management, Device Management, Information Maintenance, and Communication, and Security",
          "C": "Process Control, File Management, Device Management, Information Maintenance, and Communication, and Security",
          "D": "Process Control, File Management, Device Management, Information Maintenance, and Communication, and Security, and Error Handling",
          "correct_answer": "A"
        },
        {
          "question_no": 10,
          "question": "What is the main function of the Operating System as an extended machine or virtual machine?",
          "A": "To manage computer hardware",
          "B": "To manage computer software",
          "C": "To present a simple interface to the user, hiding the complexity of the hardware",
          "D": "To manage computer networks",
          "correct_answer": "C"
        }
]
  const [questions, setQuestions] = useState(sample);
  const [editIndex, setEditIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({});
  const [quizId, setQuizId] = useState(null);
  const [topic, setTopic] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split('/').pop();
    if (id) {
        setQuizId(id);
        axios.get(`http://127.0.0.1:5000/api/manage/quiz/${id}`)
            .then(response => {
                if (response.data.success) {
                    const { questions } = response.data.quiz;
                    if (questions && questions.length > 0) {
                        setTopic(questions[0].topic || 'Untitled Quiz');
                        setQuestions(questions.slice(1));
                    }
                }
            })
            .catch(err => console.error(err));
    }
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedQuestion(questions[index]);
  };

  const handleSaveEdit = (index) => {
    if (!quizId) {
        alert('Quiz ID not found');
        return;
    }

    axios.put(`http://127.0.0.1:5000/api/manage/quiz/${quizId}/question/${index}`, editedQuestion)
        .then(response => {
            if (response.data.success) {
                const updatedQuestions = [...questions];
                updatedQuestions[index] = editedQuestion;
                setQuestions(updatedQuestions);
                setEditIndex(null);
                alert('Question updated successfully');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Failed to update question');
        });
  };

  const handleDelete = (index) => {
    if (!quizId) {
        alert('Quiz ID not found');
        return;
    }

    if (window.confirm('Are you sure you want to delete this question?')) {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
        setHasUnsavedChanges(true);
    }
  };

  const handleSaveChanges = () => {
    if (!quizId) {
        alert('Quiz ID not found');
        return;
    }

    const updatedQuestions = [
        { qid: quizId, topic: topic },
        ...questions
    ];

    axios.put(`http://127.0.0.1:5000/api/manage/quiz/${quizId}`, {
        questions: updatedQuestions
    })
    .then(response => {
        if (response.data.success) {
            alert('Changes saved successfully');
            navigate('/manage');
        }
    })
    .catch(err => {
        console.error(err);
        alert('Failed to save changes');
    });
  };

  return (
    <>
      <Navbar />
      <div className="edit-delete-container">
        <h2>Edit and Delete Quiz</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          sx={{ marginBottom: "1rem" }}
        >
          Save All Changes
        </Button>
        {questions.map((q, index) => (
          <div key={q.question_no} className="question-item">
            {editIndex === index ? (
              <div>
                <TextField
                  label="Question"
                  fullWidth
                  variant="outlined"
                  value={editedQuestion.question}
                  onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
                  sx={{ marginBottom: "1rem" }}
                />
                {['A', 'B', 'C', 'D'].map(option => (
                  <TextField
                    key={option}
                    label={`Option ${option}`}
                    fullWidth
                    variant="outlined"
                    value={editedQuestion[option]}
                    onChange={(e) => setEditedQuestion({ ...editedQuestion, [option]: e.target.value })}
                    sx={{ marginBottom: "0.5rem" }}
                  />
                ))}
                <TextField
                  label="Correct Answer"
                  fullWidth
                  variant="outlined"
                  value={editedQuestion.correct_answer}
                  onChange={(e) => setEditedQuestion({ ...editedQuestion, correct_answer: e.target.value })}
                  sx={{ marginBottom: "1rem" }}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleSaveEdit(index)}
                  sx={{ marginRight: "1rem" }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setEditIndex(null)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div>
                <b>{q.question_no}. {q.question}</b>
                <ul>
                  <li>A: {q.A}</li>
                  <li>B: {q.B}</li>
                  <li>C: {q.C}</li>
                  <li>D: {q.D}</li>
                  <li>Correct Answer: {q.correct_answer}</li>
                </ul>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(index)}
                  sx={{ marginRight: "1rem" }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default EditDelete;
