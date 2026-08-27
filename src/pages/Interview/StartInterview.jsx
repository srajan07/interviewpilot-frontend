import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function StartInterview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await api.post("/interview/start");
      const sessionId = res.data?.data?._id;
      navigate(sessionId ? `/interview/session/${sessionId}` : `/interview/session/new`);
    } catch (err) {
      console.log("Starting local interview:", err.message);
      navigate(`/interview/session/new`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-10 space-y-7"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>

        <div>
          <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#DBEAFE] text-[#1E3A5F] border border-[#BFDBFE] mb-3">
            Fresher SDE Round
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
            Fresher SDE Interview Practice
          </h1>
          <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
            A realistic mock interview designed for campus placements and entry-level SDE roles.
          </p>
        </div>

        {/* Structure Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#F5F9FF] border border-[#BFDBFE] rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 className="text-sm font-bold text-[#111827]">Technical Round</h2>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              10 questions on OOP, OS, DBMS, Networks, and Data Structures.
            </p>
          </div>

          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#16A34A] text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h2 className="text-sm font-bold text-[#111827]">HR & Behavioural Round</h2>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              5 HR questions on communication, background, strengths, and goals.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FEF3C7] text-xs text-[#92400E]">
          <span className="text-base shrink-0">💡</span>
          <span>Type clear, concise answers. An evaluation report will be shown after submission.</span>
        </div>

        <button
          onClick={handleStart}
          disabled={loading}
          className="btn-primary text-sm"
        >
          {loading ? "Starting Interview…" : "Start SDE Interview →"}
        </button>
      </div>
    </div>
  );
}

export default StartInterview;
