import { Routes, Route } from "react-router-dom";
import App from './App';
import Admin from './components/Admin/Admin';
import Users from './components/Users/Users';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { ToastContainer } from 'react-toastify';
import ListQuiz from "./components/Users/ListQuiz";
import DetailQuiz from "./components/Users/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";

const NotFound = () => {
    return (
        <div className="container mt-3 alert alert-danger">
            404. Not foudn data with your current URL
        </div>
    )
}

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/users" element={<ListQuiz />} />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admin" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />}></Route>
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Layout;