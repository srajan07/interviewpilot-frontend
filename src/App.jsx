import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AppLayout from "./components/common/AppLayout";

import PracticePage from "./pages/Practice/PracticePage";
import CommunityPage from "./pages/Community/CommunityPage";
import CreatePost from "./pages/Community/CreatePost";
import MyJourney from "./pages/Community/MyJourney";
import EditPost from "./pages/Community/EditPost";
import PostDetail from "./pages/Community/PostDetail";

import AptitudeMock from "./pages/Aptitude/AptitudeMock";
import AptitudeResult from "./pages/Aptitude/AptitudeResult";
import StartInterview from "./pages/Interview/StartInterview";
import InterviewSession from "./pages/Interview/InterviewSession";
import InterviewReport from "./pages/Interview/InterviewReport";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED APP ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <AppLayout>
                <PracticePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* COMMUNITY ROUTES */}
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CommunityPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/create"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CreatePost />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/me"
          element={
            <ProtectedRoute>
              <AppLayout>
                <MyJourney />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/edit/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <EditPost />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <PostDetail />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* APTITUDE ROUTES */}
        <Route
          path="/aptitude"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AptitudeMock />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/aptitude/result"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AptitudeResult />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* INTERVIEW PRACTICE ROUTES */}
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <AppLayout>
                <StartInterview />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/session/:sessionId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <InterviewSession />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/report/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <InterviewReport />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* PROFILE ROUTE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Profile />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* DEFAULT FALLBACKS */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;