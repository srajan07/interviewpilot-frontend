import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import api from "../../services/api";

function InterviewReport() {
  const { id } = useParams();
  const location = useLocation();
  const [session, setSession] = useState(location.state?.session || null);
  const [loading, setLoading] = useState(!location.state?.session);

  useEffect(() => {
    if (!session && id && id !== "local") {
      async function fetchSession() {
        try {
          const res = await api.get(`/interview/${id}`);
          if (res.data?.data) setSession(res.data.data);
        } catch (err) {
          console.log("Error fetching session:", err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchSession();
    } else {
      setLoading(false);
    }
  }, [id, session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-sm text-[#9CA3AF]">
        <div className="spinner"></div>
        <span>Loading interview report…</span>
      </div>
    );
  }

  const report = session?.report || {
    overallSummary: "Interview submitted successfully.",
    strengths: ["Completed technical round", "Completed HR round"],
    weaknesses: [],
    technicalAssessment: "Answers saved.",
    communicationAssessment: "Answers saved.",
    recommendedTopics: ["Core CS Fundamentals"],
    finalAdvice: "Keep practicing!",
    isFallback: true,
  };

  const technicalAnswers = session?.technicalAnswers || [];
  const hrAnswers = session?.hrAnswers || [];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">

      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 space-y-5"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#DBEAFE] text-[#1E3A5F] border border-[#BFDBFE]">
            Evaluation Report
          </span>
          <span className="text-xs text-[#9CA3AF]">Fresher SDE Practice</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">SDE Interview Report</h1>

        {report.isFallback && (
          <div className="flex items-start gap-2.5 p-3.5 bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl text-xs text-[#92400E]">
            <span className="text-base shrink-0">ℹ️</span>
            <span>Your interview completed successfully. AI detailed report is temporarily unavailable — showing summary below.</span>
          </div>
        )}

        <div className="p-4 bg-[#F5F5F0] border border-[#E5E7EB] rounded-xl text-sm text-[#374151] leading-relaxed">
          {report.overallSummary}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 space-y-3"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#16A34A] flex items-center gap-2">
            ✨ Key Strengths
          </h2>
          <ul className="space-y-2">
            {report.strengths?.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-[#374151]">
                <span className="text-[#16A34A] font-bold shrink-0">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 space-y-3"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#DC2626] flex items-center gap-2">
            🎯 Areas to Improve
          </h2>
          <ul className="space-y-2">
            {report.weaknesses?.length > 0
              ? report.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[#374151]">
                    <span className="text-[#DC2626] font-bold shrink-0">•</span>
                    <span>{w}</span>
                  </li>
                ))
              : <li className="text-sm text-[#9CA3AF]">Nothing specific flagged.</li>
            }
          </ul>
        </div>
      </div>

      {/* Assessments */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-5"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

        <div className="space-y-2">
          <p className="section-label text-[#1E3A5F]">Technical Assessment</p>
          <p className="text-sm text-[#6B7280] leading-relaxed p-4 bg-[#F5F9FF] border border-[#DBEAFE] rounded-xl">
            {report.technicalAssessment}
          </p>
        </div>

        <div className="space-y-2">
          <p className="section-label text-[#16A34A]">HR & Communication</p>
          <p className="text-sm text-[#6B7280] leading-relaxed p-4 bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl">
            {report.communicationAssessment}
          </p>
        </div>

        {report.recommendedTopics?.length > 0 && (
          <div className="space-y-2">
            <p className="section-label text-[#D97706]">Recommended Study Topics</p>
            <div className="flex items-center gap-2 flex-wrap">
              {report.recommendedTopics.map((t, idx) => (
                <span key={idx} className="text-xs font-medium text-[#92400E] bg-[#FFFBEB] border border-[#FEF3C7] px-3 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {report.finalAdvice && (
          <div className="p-4 bg-[#F5F5F0] border border-[#E5E7EB] rounded-xl text-sm text-[#374151] italic">
            "{report.finalAdvice}"
          </div>
        )}
      </div>

      {/* Answer Review */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <h2 className="text-base font-bold text-[#111827] pb-3 border-b border-[#F3F4F6]">
          Your Submitted Responses
        </h2>

        {[
          { label: "Technical Round", items: technicalAnswers, prefix: "Q" },
          { label: "HR Round", items: hrAnswers, prefix: "HR Q" },
        ].map((section) => (
          <div key={section.label} className="space-y-3">
            <p className="section-label text-[#1E3A5F]">{section.label} ({section.items.length})</p>
            {section.items.map((ans, idx) => (
              <div key={idx} className="bg-[#FAFAF8] border border-[#E5E7EB] rounded-xl p-4 space-y-2">
                <div className="text-xs font-semibold text-[#374151]">
                  {section.prefix}{idx + 1}: {ans.question}
                </div>
                <div className="text-sm text-[#6B7280] bg-white border border-[#E5E7EB] p-3 rounded-lg leading-relaxed">
                  <span className="font-semibold text-[#374151] block mb-1">Answer:</span>
                  {ans.answer || <em className="text-[#9CA3AF]">No answer provided</em>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <Link to="/interview" className="btn-secondary text-xs">Retake Interview</Link>
        <Link to="/dashboard" className="btn-primary text-xs">Back to Dashboard →</Link>
      </div>
    </div>
  );
}

export default InterviewReport;
