import { useLocation, Link, Navigate } from "react-router-dom";

function AptitudeResult() {
  const location = useLocation();
  const state = location.state;
  if (!state) return <Navigate to="/aptitude" replace />;

  const { score = 0, totalQuestions = 30, percentage = 0, categoryScores = {}, selectedAnswers = {}, questions = [] } = state;
  const incorrectCount = totalQuestions - score;
  const incorrectQuestions = questions.filter((q) => selectedAnswers[q.id] !== q.correctAnswer);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">

      {/* Summary Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 text-center space-y-5"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
        <span className="inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#DBEAFE] text-[#1E3A5F] border border-[#BFDBFE]">
          Assessment Complete
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">Your Performance</h1>

        <div className="flex items-center justify-center gap-8 sm:gap-14 py-3 flex-wrap">
          <div>
            <div className="text-4xl font-extrabold text-[#111827]">{score}/{totalQuestions}</div>
            <div className="text-xs text-[#9CA3AF] font-medium mt-1">Overall Score</div>
          </div>
          <div className="w-px h-10 bg-[#E5E7EB] hidden sm:block"></div>
          <div>
            <div className="text-4xl font-extrabold text-[#1E3A5F]">{percentage}%</div>
            <div className="text-xs text-[#9CA3AF] font-medium mt-1">Percentage</div>
          </div>
          <div className="w-px h-10 bg-[#E5E7EB] hidden sm:block"></div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-[#16A34A]">{score} <span className="text-xs font-normal text-[#9CA3AF]">Correct</span></div>
            <div className="text-lg font-bold text-[#DC2626]">{incorrectCount} <span className="text-xs font-normal text-[#9CA3AF]">Wrong</span></div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/aptitude" className="btn-primary text-xs">Retake Test ↺</Link>
          <Link to="/dashboard" className="btn-secondary text-xs">Back to Dashboard</Link>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-4"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <h2 className="text-base font-bold text-[#111827] pb-3 border-b border-[#F3F4F6]">
          Category Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(categoryScores).map(([category, stats]) => {
            const catScore = typeof stats === "object" ? stats.correct : stats;
            const catTotal = typeof stats === "object" ? stats.total : 8;
            const catPct = Math.round((catScore / catTotal) * 100) || 0;
            return (
              <div key={category} className="bg-[#FAFAF8] border border-[#E5E7EB] rounded-xl p-4 space-y-2">
                <p className="section-label">{category}</p>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold text-[#111827]">{catScore}/{catTotal}</span>
                  <span className="text-xs font-semibold text-[#1E3A5F]">{catPct}%</span>
                </div>
                <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1E3A5F] rounded-full transition-all" style={{ width: `${catPct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mistakes */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 space-y-6"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div className="flex items-center justify-between pb-4 border-b border-[#F3F4F6] flex-wrap gap-2">
          <h2 className="text-base font-bold text-[#111827]">Review Mistakes ({incorrectQuestions.length})</h2>
          <span className="text-xs text-[#9CA3AF]">Review incorrect answers to improve.</span>
        </div>

        {incorrectQuestions.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <div className="text-3xl">🎉</div>
            <p className="text-sm font-bold text-[#16A34A]">Perfect Score! No mistakes.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {incorrectQuestions.map((q, idx) => {
              const userAns = selectedAnswers[q.id] || "Not Answered";
              return (
                <div key={q.id} className="bg-[#FAFAF8] border border-[#E5E7EB] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#DC2626]">Mistake #{idx + 1}</span>
                    <span className="badge">{q.category}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#111827] leading-relaxed">{q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#FEE2E2] border border-[#FCA5A5] rounded-lg text-[#DC2626]">
                      <span className="font-bold block mb-1">Your Answer</span>
                      {userAns}
                    </div>
                    <div className="p-3 bg-[#DCFCE7] border border-[#86EFAC] rounded-lg text-[#16A34A]">
                      <span className="font-bold block mb-1">Correct Answer</span>
                      {q.correctAnswer}
                    </div>
                  </div>
                  <div className="p-3 bg-[#FFFBEB] border border-[#FEF3C7] rounded-lg text-xs text-[#92400E]">
                    <span className="font-bold text-[#374151] block mb-1">Explanation</span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AptitudeResult;
