import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Preview.css";
// const sample = [
//     {
//       "question_no": 1,
//       "question": "What is the primary function of an Operating System?",
//       "A": "To manage computer hardware",
//       "B": "To manage computer software",
//       "C": "To act as an interface between the user and the computer hardware",
//       "D": "To manage computer networks",
//       "correct_answer": "C"
//     },
//     {
//       "question_no": 2,
//       "question": "What is Memory Management in the context of Operating Systems?",
//       "A": "Management of Secondary Memory",
//       "B": "Management of Primary Memory",
//       "C": "Management of Virtual Memory",
//       "D": "Management of Cache Memory",
//       "correct_answer": "B"
//     },
//     {
//       "question_no": 3,
//       "question": "What is the main difference between Multiprogrammed Batch Systems and Time-Sharing Systems?",
//       "A": "In Multiprogrammed Batch Systems, the objective is to maximize processor use, whereas in Time-Sharing Systems, the objective is to minimize response time",
//       "B": "In Multiprogrammed Batch Systems, the objective is to minimize response time, whereas in Time-Sharing Systems, the objective is to maximize processor use",
//       "C": "In Multiprogrammed Batch Systems, the CPU is often idle, whereas in Time-Sharing Systems, the CPU is always busy",
//       "D": "In Multiprogrammed Batch Systems, the CPU is always busy, whereas in Time-Sharing Systems, the CPU is often idle",
//       "correct_answer": "A"
//     },
//     {
//       "question_no": 4,
//       "question": "What is the function of the Operating System as a resource manager?",
//       "A": "To manage computer hardware",
//       "B": "To manage computer software",
//       "C": "To allocate system resources to specific programs and users",
//       "D": "To manage computer networks",
//       "correct_answer": "C"
//     },
//     {
//       "question_no": 5,
//       "question": "What is the main advantage of Time-Sharing Operating Systems?",
//       "A": "Maximization of processor use",
//       "B": "Minimization of response time",
//       "C": "Avoidance of duplication of software",
//       "D": "Reduction of CPU idle time",
//       "correct_answer": "B"
//     },
//     {
//       "question_no": 6,
//       "question": "What is the primary purpose of a Network Operating System?",
//       "A": "To manage computer hardware",
//       "B": "To manage computer software",
//       "C": "To allow shared file and printer access among multiple computers in a network",
//       "D": "To manage computer networks",
//       "correct_answer": "C"
//     },
//     {
//       "question_no": 7,
//       "question": "What is a Real-Time System?",
//       "A": "A system that can process data in real-time",
//       "B": "A system that can process data in batches",
//       "C": "A system that can process data in a time-sharing environment",
//       "D": "A system that can process data in a distributed environment",
//       "correct_answer": "A"
//     },
//     {
//       "question_no": 8,
//       "question": "What is the function of System Calls in an Operating System?",
//       "A": "To manage computer hardware",
//       "B": "To manage computer software",
//       "C": "To provide an interface between a process and the Operating System",
//       "D": "To manage computer networks",
//       "correct_answer": "C"
//     },
//     {
//       "question_no": 9,
//       "question": "What are the five types of System Calls in an Operating System?",
//       "A": "Process Control, File Management, Device Management, Information Maintenance, and Communication",
//       "B": "Process Control, File Management, Device Management, Information Maintenance, and Communication, and Security",
//       "C": "Process Control, File Management, Device Management, Information Maintenance, and Communication, and Security",
//       "D": "Process Control, File Management, Device Management, Information Maintenance, and Communication, and Security, and Error Handling",
//       "correct_answer": "A"
//     },
//     {
//       "question_no": 10,
//       "question": "What is the main function of the Operating System as an extended machine or virtual machine?",
//       "A": "To manage computer hardware",
//       "B": "To manage computer software",
//       "C": "To present a simple interface to the user, hiding the complexity of the hardware",
//       "D": "To manage computer networks",
//       "correct_answer": "C"
//     }
//   ]

const fileTypes = ["PDF"];
const baseURL = "http://localhost:5000/api/upload_quiz"; // Replace with your backend URL

function QuizUploaderAndPreview() {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle File Upload
  const handleFileChange = (file) => {
    setFile(file);

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${baseURL}/uploadfile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        alert("File processed successfully!");
        setQuestions(response.data.questions || []);
        console.log(response.data.questions);
        
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
        alert("Failed to upload file. Please try again.");
      });
  };

  // Handle Quiz Save
  const handleSave = async () => {
    try {
      const response = await axios.post(`${baseURL}/savequiz`, { questions });
      alert(response.data.message || "Quiz saved successfully!");
      navigate("/Dashboard"); // Redirect to home or a relevant page
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz.");
    }
  };

  // Render Component
  return (
    <div>
      {questions.length === 0 ? (
        <div>
          <h2>Upload a Quiz File</h2>
          <FileUploader
            handleChange={handleFileChange}
            multiple={false}
            name="file"
            types={fileTypes}
          />
          {file && <p>File uploaded: {file.name}</p>}
        </div>
      ) : (
        <div className="questions">
          <h2>Preview Quiz</h2>
          <p>QID: {questions[0].qid}</p>
          {questions.slice(1).map((q, index) => (
            <div key={q.question_no}>
              <b>
                {index + 1}. {q.question}
              </b>
              <br />
              <input type="radio" name={q.question_no} value={q.A} /> {q.A}
              <br />
              <input type="radio" name={q.question_no} value={q.B} /> {q.B}
              <br />
              <input type="radio" name={q.question_no} value={q.C} /> {q.C}
              <br />
              <input type="radio" name={q.question_no} value={q.D} /> {q.D}
              <br />
              <br />
            </div>
          ))}
          <Button variant="contained" color="success" onClick={handleSave}>
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ marginLeft: "1vw" }}
            onClick={() => setQuestions([])} // Reset questions to go back to upload
          >
            Edit And Upload Again
          </Button>
        </div>
      )}
    </div>
  );
}

export default QuizUploaderAndPreview;
