import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalInterviews: 0,
    completedInterviews: 0,
    averageScore: 0,
    bestScore: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDashboard();

        setStats(
          response.data || {
            totalInterviews: 0,
            completedInterviews: 0,
            averageScore: 0,
            bestScore: 0,
          }
        );
      } catch (error) {
        console.error("Dashboard error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-xl font-bold">
            InterviewPilot
          </h1>

          <div className="flex items-center gap-4">
            <Link
              to="/interview/start"
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
            >
              Start Interview
            </Link>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className="text-slate-400 mt-2">
            Track your interview preparation and performance.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-4">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Total */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm">
              Total Interviews
            </p>

            <p className="text-3xl font-bold mt-3">
              {stats.totalInterviews}
            </p>
          </div>

          {/* Completed */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm">
              Completed
            </p>

            <p className="text-3xl font-bold mt-3">
              {stats.completedInterviews}
            </p>
          </div>

          {/* Average */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm">
              Average Score
            </p>

            <p className="text-3xl font-bold mt-3">
              {stats.averageScore}/10
            </p>
          </div>

          {/* Best */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm">
              Best Score
            </p>

            <p className="text-3xl font-bold mt-3">
              {stats.bestScore}/10
            </p>
          </div>

        </div>

        {/* Start Interview */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h3 className="text-2xl font-semibold">
            Ready for your next interview?
          </h3>

          <p className="text-slate-400 mt-2 mb-6">
            Practice technical questions and get AI-powered feedback.
          </p>

          <Link
            to="/interview/start"
            className="inline-block bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-medium"
          >
            Start Practice Interview
          </Link>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;