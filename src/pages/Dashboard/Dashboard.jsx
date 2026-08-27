import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import api from "../../services/api";
import { getPosts } from "../../services/communityService";

function IconTarget(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconSeedling(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21V11" />
      <path d="M12 12c0-3.5-2.5-6-7-6 0 4 2.5 6 7 6Z" />
      <path d="M12 9c0-2.8 2-5 6-5 0 3.2-2 5-6 5Z" />
    </svg>
  );
}

function IconClipboard(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5.5" y="4.5" width="13" height="16" rx="2" />
      <path d="M9 4.5V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.5" />
      <path d="M8.5 11h7M8.5 15h5" />
    </svg>
  );
}

function IconMessage(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7Z" />
    </svg>
  );
}

function IconNotes(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.5V7a1 1 0 0 0 1 1h3.5" />
      <path d="M8.5 12.5h7M8.5 15.5h4.5" />
    </svg>
  );
}

function HeroLibrary(props) {
  return (
    <svg viewBox="0 0 200 100" fill="none" {...props}>
      {/* shelf */}
      <path d="M4 78H196" stroke="var(--border-strong)" strokeWidth="2" strokeLinecap="round" />

      {/* books standing upright, varied height/width/color */}
      <rect x="14" y="40" width="10" height="38" rx="1.5" fill="var(--blue-light)" stroke="var(--blue-dark)" strokeWidth="1.4" />
      <rect x="26" y="30" width="9" height="48" rx="1.5" fill="var(--green-light)" stroke="var(--green)" strokeWidth="1.4" />
      <rect x="37" y="48" width="12" height="30" rx="1.5" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="1.4" />
      <rect x="51" y="36" width="9" height="42" rx="1.5" fill="var(--bg-muted)" stroke="var(--border-strong)" strokeWidth="1.4" />
      <rect x="62" y="44" width="10" height="34" rx="1.5" fill="var(--blue-light)" stroke="var(--blue-dark)" strokeWidth="1.4" />

      {/* a couple of books leaning together on the right */}
      <rect x="150" y="42" width="9" height="36" rx="1.5" fill="var(--green-light)" stroke="var(--green)" strokeWidth="1.4" transform="rotate(-8 150 78)" />
      <rect x="160" y="38" width="10" height="40" rx="1.5" fill="var(--amber-light)" stroke="var(--amber)" strokeWidth="1.4" />
      <rect x="172" y="46" width="9" height="32" rx="1.5" fill="var(--blue-light)" stroke="var(--blue-dark)" strokeWidth="1.4" />

      {/* open book lying flat, front and center */}
      <path
        d="M92 74C97 71 106 71 111 74V79C106 76 97 76 92 79V74Z"
        fill="var(--bg-surface)"
        stroke="var(--blue-dark)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M111 74C116 71 125 71 130 74V79C125 76 116 76 111 79V74Z"
        fill="var(--bg-surface)"
        stroke="var(--blue-dark)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M111 74V79" stroke="var(--blue-dark)" strokeWidth="1.2" />
    </svg>
  );
}

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
    { label: "Mock tests", value: activityStats?.aptitudeAttemptsCount || 0, Icon: IconClipboard, tint: "blue" },
    { label: "Interviews", value: activityStats?.interviewsCompleted || 0, Icon: IconMessage, tint: "amber" },
    { label: "Community posts", value: recentPosts.length, Icon: IconNotes, tint: "green" },
  ];

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "var(--bg-app)" }}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Greeting */}
        <div className="card-surface-elevated relative overflow-hidden p-6 sm:p-7 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1.5">
              <p className="section-label">Workspace</p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                Welcome back, {displayName}
              </h1>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Continue where you left off.
              </p>
            </div>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0"
              style={{ backgroundColor: "var(--blue-dark)", color: "#fff", boxShadow: "var(--shadow-md)" }}
            >
              {userInitial}
            </div>
          </div>

          {/* Small background watermark — faint and small enough that it
              reads as texture, not a competing graphic. */}
          <HeroLibrary className="hidden sm:block absolute -bottom-3 right-3 w-32 opacity-25 pointer-events-none" />
        </div>

        {/* Stats Row */}
        {activityStats && (
          <div className="grid grid-cols-3 gap-4 mb-10">
            {stats.map(({ label, value, Icon, tint }) => (
              <div key={label} className="card-surface p-4 sm:p-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: `var(--${tint}-light)`,
                    color: tint === "blue" ? "var(--blue-dark)" : `var(--${tint})`,
                  }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{value}</div>
                <div className="text-xs mt-0.5 font-medium" style={{ color: "var(--text-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-10">
          <p className="section-label mb-3">Quick actions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/practice" className="card-surface group p-5 hover:shadow-md transition-all block">
              <div className="flex items-start justify-between">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--blue-light)", color: "var(--blue-dark)" }}
                >
                  <IconTarget style={{ width: 20, height: 20 }} />
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  Start →
                </span>
              </div>
              <div className="mt-3 space-y-0.5">
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Practice</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Interview questions and timed aptitude mock tests.
                </p>
              </div>
            </Link>

            <Link to="/community" className="card-surface group p-5 hover:shadow-md transition-all block">
              <div className="flex items-start justify-between">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--green-light)", color: "var(--green)" }}
                >
                  <IconSeedling style={{ width: 20, height: 20 }} />
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  Explore →
                </span>
              </div>
              <div className="mt-3 space-y-0.5">
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Community</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Share what you learned. Read others' learning journeys.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Community Notes */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <p className="section-label">Recent community notes</p>
            <Link to="/community" className="text-xs font-semibold hover:underline" style={{ color: "var(--blue-dark)" }}>
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="card-surface flex items-center gap-2 text-xs p-5" style={{ color: "var(--text-muted)" }}>
              <div className="spinner"></div>
              <span>Loading…</span>
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="space-y-2">
              {recentPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/community/${post._id}`}
                  className="card-surface group flex items-center justify-between p-3.5 transition-all"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
                      {post.user?.name || "Learner"} · {post.category}
                    </div>
                    <div className="text-sm font-semibold truncate pr-4" style={{ color: "var(--text-primary)" }}>
                      {post.title}
                    </div>
                  </div>
                  <span className="text-sm shrink-0" style={{ color: "var(--text-muted)" }}>
                    →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card-surface p-8 text-center">
              <IconSeedling
                style={{ width: 28, height: 28, color: "var(--green)", margin: "0 auto" }}
              />
              <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
                No recent activity yet.{" "}
                <Link to="/community/create" className="font-semibold hover:underline" style={{ color: "var(--blue-dark)" }}>
                  Share your first note →
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="pt-8 mt-2" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Small, steady sessions beat cramming. Come back tomorrow.
            </p>
            <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
              <Link to="/practice" className="hover:underline">Practice</Link>
              <Link to="/community" className="hover:underline">Community</Link>
              <Link to="/profile" className="hover:underline">Profile</Link>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Dashboard;