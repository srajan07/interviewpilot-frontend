import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import api from "../../services/api";
import { getPosts } from "../../services/communityService";

function Dashboard() {
  const { user } = useAuth();
  const [recentPosts, setRecentPosts] = useState([]);
  const [activityStats, setActivityStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const displayName = user?.name || user?.fullName || "Learner";
  const userInitial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [dashRes, postsRes] = await Promise.allSettled([
          api.get("/dashboard"),
          getPosts(),
        ]);
        if (dashRes.status === "fulfilled" && dashRes.value.data?.data) {
          setActivityStats(dashRes.value.data.data);
        }
        if (postsRes.status === "fulfilled" && postsRes.value.data) {
          setRecentPosts(postsRes.value.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const stats = [
    { label: "Mock tests", value: activityStats?.aptitudeAttemptsCount || 0 },
    { label: "Interviews", value: activityStats?.interviewsCompleted || 0 },
    { label: "Community posts", value: recentPosts.length },
  ];

  return (
    <main className="w-full min-h-screen bg-[#F7F7F3] text-[#20242B]">
      <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        {/* Greeting */}
        <section className="pb-8 border-b border-[#E2E3DE] mb-8">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <p className="text-xs uppercase tracking-[0.16em] text-[#8A8F96]">
                Workspace
              </p>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#20242B]">
                Welcome back, <span className="break-words">{displayName}</span>
              </h1>
              <p className="text-sm text-[#70757D]">
                Continue where you left off.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#ECEFEA] text-[#587A63] flex items-center justify-center text-sm font-semibold shrink-0">
              {userInitial}
            </div>
          </div>
        </section>

        {/* Stats Row */}
        {activityStats && (
          <section className="mb-10">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl p-4 sm:p-5 min-w-0"
                >
                  <div className="text-xl sm:text-2xl font-semibold text-[#20242B]">
                    {value}
                  </div>
                  <div className="text-xs text-[#8A8F96] mt-1 font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section className="mb-10">
          <p className="text-xs uppercase tracking-[0.16em] text-[#8A8F96] mb-4">
            Quick actions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/practice"
              className="group bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl p-5 hover:border-[#C7CBD1] transition-all block"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-[#20242B] group-hover:text-[#253044]">
                  Practice
                </h3>
                <span className="text-xs font-medium text-[#8A8F96] group-hover:text-[#253044] transition-colors">
                  Start →
                </span>
              </div>
              <p className="text-xs text-[#70757D] leading-relaxed">
                Interview questions and timed aptitude mock tests.
              </p>
            </Link>

            <Link
              to="/community"
              className="group bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl p-5 hover:border-[#C7CBD1] transition-all block"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-[#20242B] group-hover:text-[#253044]">
                  Community
                </h3>
                <span className="text-xs font-medium text-[#8A8F96] group-hover:text-[#253044] transition-colors">
                  Explore →
                </span>
              </div>
              <p className="text-xs text-[#70757D] leading-relaxed">
                Share what you learned. Read others' learning journeys.
              </p>
            </Link>
          </div>
        </section>

        {/* Recent Community Notes */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8A8F96]">
              Recent community notes
            </p>
            <Link
              to="/community"
              className="text-xs font-medium text-[#253044] hover:underline"
            >
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl p-5 flex items-center gap-3 text-xs text-[#8A8F96]">
              <div className="spinner"></div>
              <span>Loading notes…</span>
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/community/${post._id}`}
                  className="group bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl p-4 flex items-center justify-between gap-4 transition-all hover:border-[#C7CBD1]"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="text-[11px] text-[#8A8F96]">
                      {post.user?.name || post.user?.fullName || "Learner"}
                    </div>
                    <div className="text-sm font-medium text-[#20242B] group-hover:text-[#253044] truncate">
                      {post.title}
                    </div>
                  </div>
                  <span className="text-xs text-[#8A8F96] group-hover:text-[#253044] shrink-0">
                    →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl p-8 text-center">
              <p className="text-sm text-[#70757D]">
                No recent activity yet.{" "}
                <Link
                  to="/community/create"
                  className="font-medium text-[#253044] hover:underline"
                >
                  Share your first note →
                </Link>
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-[#E2E3DE]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A8F96]">
            <p>Small, steady sessions beat cramming. Come back tomorrow.</p>
            <div className="flex items-center gap-4">
              <Link to="/practice" className="hover:text-[#20242B]">
                Practice
              </Link>
              <Link to="/community" className="hover:text-[#20242B]">
                Community
              </Link>
              <Link to="/profile" className="hover:text-[#20242B]">
                Profile
              </Link>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}

export default Dashboard;