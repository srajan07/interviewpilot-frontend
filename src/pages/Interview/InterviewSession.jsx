import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TECHNICAL_QUESTIONS, HR_QUESTIONS } from "../../data/interviewQuestions";
import api from "../../services/api";

function InterviewSession() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const allQuestions = [
    ...TECHNICAL_QUESTIONS.map((q) => ({ ...q, type: "Technical" })),
    ...HR_QUESTIONS.map((q) => ({ ...q, type: "HR" })),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQ = allQuestions[currentIndex];
  const totalCount = allQuestions.length;
  const progressPct = ((currentIndex + 1) / totalCount) * 100;

  const currentTechIdx = currentQ.type === "Technical" ? currentIndex + 1 : 10;
  const currentHRIdx = currentQ.type === "HR" ? currentIndex - 9 : 0;

  const handleAnswerChange = (val) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: val }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const technicalAnswers = TECHNICAL_QUESTIONS.map((q) => ({
      questionId: q.id, question: q.question, answer: answers[q.id] || "",
    }));
    const hrAnswers = HR_QUESTIONS.map((q) => ({
      questionId: q.id, question: q.question, answer: answers[q.id] || "",
    }));

    try {
      const res = await api.post("/interview/submit", {
        sessionId: sessionId !== "new" ? sessionId : undefined,
        technicalAnswers, hrAnswers,
      });
      const returnedSession = res.data?.data;
      const returnedId = returnedSession?._id || sessionId || "latest";
      navigate(`/interview/report/${returnedId}`, { state: { session: returnedSession } });
    } catch (err) {
      console.log("Submitting locally:", err.message);
      const mockSession = {
        _id: "local-session", technicalAnswers, hrAnswers, status: "completed",
        report: {
          overallSummary: "Your interview was completed. AI report is temporarily unavailable.",
          strengths: ["Attempted all 10 technical questions", "Submitted all 5 HR questions"],
          weaknesses: ["AI evaluation unavailable"],
          technicalAssessment: "Technical responses recorded.",
          communicationAssessment: "HR responses recorded.",
          recommendedTopics: ["Operating Systems", "DBMS Normalization", "Networks (TCP vs UDP)"],
          finalAdvice: "Keep practicing technical fundamentals.",
          isFallback: true,
        },
      };
      navigate(`/interview/report/local`, { state: { session: mockSession } });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">

      {/* Header */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 sm:p-6 flex items-center justify-between flex-wrap gap-4"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div>
          <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border mb-1.5 ${
            currentQ.type === "Technical"
              ? "bg-[#DBEAFE] text-[#1E3A5F] border-[#BFDBFE]"
              : "bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]"
          }`}>
            {currentQ.type === "Technical"
              ? `Technical Round (${currentTechIdx}/10)`
              : `HR Round (${currentHRIdx}/5)`}
          </span>
          <h1 className="text-lg font-bold text-[#111827]">Fresher SDE Mock Interview</h1>
        </div>
        <span className="text-xs font-semibold text-[#9CA3AF]">
          {currentIndex + 1} / {totalCount} Questions
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1E3A5F] rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 space-y-6"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>

        <div className="space-y-2">
          <p className="section-label">Question {currentIndex + 1}</p>
          <h2 className="text-base sm:text-xl font-bold text-[#111827] leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#6B7280]">Your Answer</label>
          <textarea
            rows={6}
            value={answers[currentQ.id] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your detailed answer here…"
            className="w-full p-4 text-sm rounded-xl resize-y leading-relaxed"
          ></textarea>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F3F4F6]">
          <button
            onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
            disabled={currentIndex === 0 || isSubmitting}
            className="btn-secondary text-xs disabled:opacity-40"
          >
            ← Previous
          </button>

          {currentIndex < totalCount - 1 ? (
            <button
              onClick={() => setCurrentIndex((p) => Math.min(totalCount - 1, p + 1))}
              className="btn-primary text-xs"
            >
              Next Question →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-xs rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting…" : "Finish &amp; Submit ✓"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InterviewSession;
