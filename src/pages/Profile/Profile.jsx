import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import api from "../../services/api";
import { getMyPosts } from "../../services/communityService";

function Profile() {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ aptitudeAttemptsCount: 0, interviewsCompleted: 0, journeyPostsCount: 0 });
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    if (user) setName(user.name || user.fullName || "");

    async function fetchStats() {
      try {
        const [dashRes, myPostsRes] = await Promise.allSettled([
          api.get("/dashboard"),
          getMyPosts(),
        ]);
        setStats({
          aptitudeAttemptsCount: dashRes.status === "fulfilled" ? (dashRes.value.data?.data?.aptitudeAttemptsCount || 0) : 0,
          interviewsCompleted: dashRes.status === "fulfilled" ? (dashRes.value.data?.data?.interviewsCompleted || 0) : 0,
          journeyPostsCount: myPostsRes.status === "fulfilled" ? (myPostsRes.value.data?.length || 0) : 0,
        });
      } catch (err) {
        console.log("Could not load stats:", err.message);
      }
    }
    fetchStats();
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ text: "", type: "" });
    try {
      await api.put("/users/profile", { name });
      setMsg({ text: "Profile updated successfully!", type: "success" });
    } catch (err) {
      setMsg({ text: err.response?.data?.message || "Failed to update profile", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const userInitial = (user?.name || user?.fullName || "U").charAt(0).toUpperCase();
  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Recently";

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
        <div className="space-y-1">
          <p className="section-label">Account</p>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Profile & Settings</h1>
          <p className="text-sm text-[#6B7280]">Manage your account and view your progress.</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-[#1E3A5F] text-white flex items-center justify-center text-2xl font-bold shadow-md shrink-0">
          {userInitial}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Journey Posts", value: stats.journeyPostsCount },
          { label: "Mock Tests", value: stats.aptitudeAttemptsCount },
          { label: "Interviews", value: stats.interviewsCompleted },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-[#E5E7EB] p-4 text-center"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div className="text-2xl font-bold text-[#1E3A5F]">{stat.value}</div>
            <div className="text-xs text-[#9CA3AF] mt-0.5 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-5"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <p className="section-label">Account Details</p>

        {msg.text && (
          <div className={`p-3 rounded-lg text-xs font-semibold border ${
            msg.type === "success"
              ? "bg-[#DCFCE7] border-[#86EFAC] text-[#16A34A]"
              : "bg-[#FEE2E2] border-[#FCA5A5] text-[#DC2626]"
          }`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#374151]">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#374151]">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-3.5 py-2.5 text-sm rounded-lg opacity-60 cursor-not-allowed bg-[#F5F5F0]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#374151]">Member Since</label>
            <p className="text-sm text-[#6B7280]">{createdDate}</p>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#F3F4F6]">
            <button type="submit" disabled={saving} className="btn-primary text-xs">
              {saving ? "Saving…" : "Update Profile"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="text-xs font-semibold text-[#DC2626] hover:underline"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
