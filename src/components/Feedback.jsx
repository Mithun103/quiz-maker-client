import React from "react";
import Navbar from "./Navbar";
import "./FeedbackDisplay.css";

const FeedbackDisplay = ({ feedback }) => {
  const percentage = feedback?.grade && feedback?.out_of 
    ? (feedback.grade / feedback.out_of) * 100 
    : 0;

  const feedbackComments = Array.isArray(feedback.feedback) ? feedback.feedback : [];
  const additionalResources = feedback.recommendation?.additional_resources || [];
  const questionsToFocusOn = feedback.recommendation?.questions_to_focus_on || [];

  return (
    <>
      <Navbar />
      {/* {JSON.stringify(feedback)} */}
      <div className="feedback-display-container">
        <h2>Your Score</h2>
        <p className="score-text">
          {feedback.grade || 0} / {feedback.out_of || 0}
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${percentage}%`,
              backgroundColor: percentage > 50 ? "#4caf50" : "#f44336",
            }}
          ></div>
        </div>

        <h3>Feedback</h3>
        <ul>
          {feedbackComments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>

        {/* <h3>Points to Remember</h3>
        <ul>
          {additionalResources.map((resource, index) => (
            <li key={index}>{resource}</li>
          ))}
        </ul>

        <h3>Questions to Focus On</h3> */}
        {/* <ul>
          {questionsToFocusOn.map((question, index) => (
            <li key={index}>
              <strong>Question {question.question_no}:</strong> {question.question}
              <br />
              <strong>Your Answer:</strong> {question.user_answer || "No answer provided"}
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
};

export default FeedbackDisplay;
