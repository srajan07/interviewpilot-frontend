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
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 text-[#20242B]">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#E2E3DE]">
        <div className="space-y-1 min-w-0">
          <p className="text-xs uppercase tracking-[0.16em] text-[#8A8F96]">Account</p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#20242B] tracking-tight">Profile &amp; Settings</h1>
          <p className="text-sm text-[#70757D]">Manage your account details and view your activity summary.</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#253044] text-white flex items-center justify-center text-lg font-semibold shrink-0">
          {userInitial}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Journey Notes", value: stats.journeyPostsCount },
          { label: "Mock Tests", value: stats.aptitudeAttemptsCount },
          { label: "Interviews", value: stats.interviewsCompleted },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#FCFCF9] rounded-xl border border-[#E2E3DE] p-4 text-center min-w-0">
            <div className="text-xl sm:text-2xl font-bold text-[#20242B]">{stat.value}</div>
            <div className="text-xs text-[#8A8F96] mt-1 font-medium leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Profile Form */}
      <div className="bg-[#FCFCF9] rounded-xl border border-[#E2E3DE] p-6 space-y-5">
        <p className="text-xs uppercase tracking-[0.16em] text-[#8A8F96]">Account Details</p>

        {msg.text && (
          <div className={`p-3 rounded-lg text-xs font-semibold border ${
            msg.type === "success"
              ? "bg-[#E6F4EA] border-[#B7E1CD] text-[#137333]"
              : "bg-[#F8EEEE] border-[#E7CECE] text-[#A55D5D]"
          }`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#20242B]">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl text-[#20242B] outline-none focus:border-[#9AA5B5]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#20242B]">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-3.5 py-2.5 text-sm bg-[#F0F1EC] border border-[#E2E3DE] rounded-xl text-[#70757D] cursor-not-allowed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#20242B]">Member Since</label>
            <p className="text-sm text-[#70757D]">{createdDate}</p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E3DE]">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? "Saving…" : "Update Profile"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="text-xs font-semibold text-[#A55D5D] hover:underline"
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
