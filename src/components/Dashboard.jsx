import Navbar from "./Navbar"
import Subjectcard from "./Card"
import "./dashboard.css"
function Dashboard(){
    return(
        <>
        <Navbar/>
        <div className="cards">
        <Subjectcard
        path={"create"}
        title={"Create Quizzes"}
        content={"Quizzes are an engaging and interactive way to test knowledge, spark curiosity, and make learning fun. They can be tailored to suit any audience or topic, whether for education, entertainment, or team-building. Dive into the exciting world of quizzes and challenge yourself or others to explore and discover new ideas!"}
        btn={"Create"}/>
        <Subjectcard
        path={"manage"}
        title={"Manage Quizzes"}
        content={"Editing and deleting quizzes ensure your content stays accurate, relevant, and well-organized. Refine questions and answers to enhance engagement, or remove outdated quizzes to keep your collection focused. With these tools, managing quizzes is simple and efficient!"}
        btn={"Manage"}/>
        <Subjectcard
        path={"attend"}
        title={"Attend Quizzes"}
        content={"Attending quizzes is a fun and interactive way to test your knowledge and learn something new. It’s a chance to challenge yourself, engage with interesting topics, and enjoy a rewarding experience. Dive in and see how much you can discover!"}
        btn={"Attend"}/>

        </div>
        </>
    )
}
export default Dashboard