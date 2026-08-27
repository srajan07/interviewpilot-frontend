import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APTITUDE_QUESTIONS } from "../../data/aptitudeQuestions";
import api from "../../services/api";

function AptitudeMock() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) { handleSubmitTest(); return; }
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const currentQ = APTITUDE_QUESTIONS[currentIndex];

  const formatTime = (s) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handleSelect = (option) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: option }));
  };

  const handleSubmitTest = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    let score = 0;
    const categoryScores = {
      Quantitative: { correct: 0, total: 0 },
      "Logical Reasoning": { correct: 0, total: 0 },
      "Verbal Ability": { correct: 0, total: 0 },
      "Data Interpretation": { correct: 0, total: 0 },
    };

    APTITUDE_QUESTIONS.forEach((q) => {
      const cat = q.category;
      if (!categoryScores[cat]) categoryScores[cat] = { correct: 0, total: 0 };
      categoryScores[cat].total += 1;
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += 1;
        categoryScores[cat].correct += 1;
      }
    });

    const totalQuestions = APTITUDE_QUESTIONS.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    try {
      await api.post("/aptitude/attempt", {
        score, totalQuestions, percentage,
        categoryScores: Object.fromEntries(Object.entries(categoryScores).map(([k, v]) => [k, v.correct])),
      });
    } catch (err) {
      console.log("Could not save attempt:", err.message);
    }

    navigate("/aptitude/result", {
      state: { score, totalQuestions, percentage, categoryScores, selectedAnswers, questions: APTITUDE_QUESTIONS },
    });
  };

  const optionLetters = ["A", "B", "C", "D"];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6">

      {/* Header Bar */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 sm:p-5 flex items-center justify-between flex-wrap gap-4"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div>
          <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#DBEAFE] text-[#1E3A5F] border border-[#BFDBFE] mb-1.5">
            Timed Assessment
          </span>
          <h1 className="text-lg font-bold text-[#111827]">Aptitude Mock Test</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-mono font-bold text-sm ${
            timeLeft < 300 ? "border-[#FCA5A5] bg-[#FEE2E2] text-[#DC2626]" : "border-[#E5E7EB] bg-[#F5F5F0] text-[#111827]"
          }`}>
            <span className="text-[10px] font-normal font-sans text-[#9CA3AF]">Remaining</span>
            {formatTime(timeLeft)}
          </div>
          <button onClick={handleSubmitTest} disabled={isSubmitting} className="btn-primary text-xs">
            Submit Test
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Panel */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-7 space-y-6"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>

          <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6]">
            <span className="text-xs font-semibold text-[#9CA3AF]">
              Question {currentIndex + 1} / {APTITUDE_QUESTIONS.length}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#DBEAFE] text-[#1E3A5F] border border-[#BFDBFE]">
              {currentQ.category}
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-semibold text-[#111827] leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === option;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 ${
                    isSelected
                      ? "border-[#1E3A5F] bg-[#EFF6FF] ring-1 ring-[#1E3A5F]/20"
                      : "border-[#E5E7EB] bg-[#FAFAF8] hover:border-[#9CA3AF] hover:bg-white"
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isSelected
                      ? "bg-[#1E3A5F] text-white"
                      : "bg-white border border-[#E5E7EB] text-[#9CA3AF]"
                  }`}>
                    {optionLetters[idx]}
                  </span>
                  <span className={`text-sm ${isSelected ? "text-[#1E3A5F] font-semibold" : "text-[#374151]"}`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#F3F4F6]">
            <button
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              disabled={currentIndex === 0}
              className="btn-secondary text-xs disabled:opacity-40"
            >
              ← Previous
            </button>
            {currentIndex < APTITUDE_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((p) => Math.min(APTITUDE_QUESTIONS.length - 1, p + 1))}
                className="btn-primary text-xs"
              >
                Next →
              </button>
            ) : (
              <button onClick={handleSubmitTest} className="px-5 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-xs rounded-lg transition-colors">
                Finish & Submit ✓
              </button>
            )}
          </div>
        </div>

        {/* Question Palette */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 space-y-4 h-fit"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <p className="section-label">Question Palette</p>

          <div className="grid grid-cols-5 gap-1.5">
            {APTITUDE_QUESTIONS.map((q, idx) => {
              const isAnswered = !!selectedAnswers[q.id];
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-8 rounded-lg text-xs font-bold transition-colors border ${
                    isCurrent
                      ? "border-[#1E3A5F] bg-[#1E3A5F] text-white"
                      : isAnswered
                      ? "border-[#BFDBFE] bg-[#DBEAFE] text-[#1E3A5F]"
                      : "border-[#E5E7EB] bg-[#F5F5F0] text-[#9CA3AF] hover:text-[#374151]"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#F3F4F6] space-y-2 text-[11px] text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#DBEAFE] border border-[#BFDBFE]"></span>
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#F5F5F0] border border-[#E5E7EB]"></span>
              <span>Unanswered ({APTITUDE_QUESTIONS.length - answeredCount})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AptitudeMock;
