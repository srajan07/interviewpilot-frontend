import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import InterviewSetup from "./pages/InterviewSetup/InterviewSetup";
import InterviewSession from "./pages/InterviewSession/InterviewSession";
import Report from "./pages/Report/Report";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/interview/setup"
          element={<InterviewSetup />}
        />

        <Route
          path="/interview/:sessionId"
          element={<InterviewSession />}
        />

        <Route
          path="/report/:sessionId"
          element={<Report />}
        />

        <Route path="/history" element={<History />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

