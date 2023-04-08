import React from "react";
import "./App.css";
// import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentLogin from "./components/StudentPortal/StudentLogin/StudentLogin";
import StudentRegistration from "./components/StudentPortal/StudentRegistration/StudentRegistration";
import AdminLogin from "./components/Dashboard/AdminLogin/AdminLogin";
import Leaderboard from "./components/StudentPortal/Leaderboard/Leaderboard";
import CoursePlayer from "./components/StudentPortal/CoursePlayer/CoursePlayer";
import Quizes from "./components/Dashboard/Quizes/Quizes";
import Assignment from "./components/Dashboard/Assignment/Assignment";
import Videos from "./components/Dashboard/Videos/Videos";
import Dashboard from "./components/Dashboard/Dashboard";
import Quiz from "./components/StudentPortal/Quiz/Quiz";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PrivateRoute/PublicRoute";
import AdminPrivateRoute from "./components/PrivateRoute/AdminPrivateRoute";
import AddVideo from "./components/Dashboard/Videos/AddVideo";
import EditVideo from "./components/Dashboard/Videos/EditVideo";
import EditAssignment from "./components/Dashboard/Assignment/EditAssginment";
import NotFound from "./components/NotFount/NotFound";
import AddQuiz from "./components/Dashboard/Quizes/AddQuiz";
import EditQuiz from "./components/Dashboard/Quizes/EditQuiz";
import AddAssginment from "./components/Dashboard/Assignment/AddAssignment";
import AssignmentMark from "./components/Dashboard/AssignmentMark/AssignmentMark";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/course"
          element={
            <PrivateRoute>
              <CoursePlayer />
            </PrivateRoute>
          }
        />

        <Route
          path="/quiz/:videoId"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />

        <Route path="/registration" element={<StudentRegistration />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/quizes"
          element={
            <AdminPrivateRoute>
              <Quizes />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/quizes/add"
          element={
            <AdminPrivateRoute>
              <AddQuiz />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizes/edit/:quizId"
          element={
            <AdminPrivateRoute>
              <EditQuiz />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/assignment"
          element={
            <AdminPrivateRoute>
              <Assignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment/add"
          element={
            <AdminPrivateRoute>
              <AddAssginment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment/edit/:assignmentId"
          element={
            <AdminPrivateRoute>
              <EditAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignmentMark"
          element={
            <AdminPrivateRoute>
              <AssignmentMark />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <AdminPrivateRoute>
              <Videos />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos/add"
          element={
            <AdminPrivateRoute>
              <AddVideo />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/videos/edit/:videoId"
          element={
            <AdminPrivateRoute>
              <EditVideo />
            </AdminPrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
