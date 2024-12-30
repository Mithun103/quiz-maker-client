import{BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/User";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import Attend from "./components/Attend";
import Manage from "./components/Manage";
import Create from "./components/Create";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import Preview from "./components/Preview";
import Edit from "./components/Edit";
import FeedbackDisplay from "./components/Feedback";
import User from "./components/User";
import Signup from "./components/Signup";
function App(){
  const [user,setUser]=useState(null);
  const [feedback, setFeedback] = useState(null);
  const[grade,setGrade]=useState(null)
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<User setUser={setUser}/>}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/manage" element={<Manage />}></Route>
        <Route path="/attend" element={<Attend/>}></Route>
        <Route path="/preview" element={<Preview/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/manage/:id" element={<Edit/>}></Route>
        <Route path="/quiz/:id" element={<Quiz setFeedback={setFeedback} setGrade={setGrade}/>}></Route>
        <Route path="/feedback" element={<FeedbackDisplay feedback={feedback} setGrade={setGrade}/>}></Route>

      </Routes>
    </Router>
    </>
  )
}
export default App
