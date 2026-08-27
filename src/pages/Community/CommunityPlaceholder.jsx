import React from "react";
import { Link } from "react-router-dom";

function CommunityPlaceholder() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
      {/* Header */}
      <div className="space-y-3 max-w-xl mx-auto">
        <span className="text-[10px] font-bold tracking-widest text-[#E8A33D] uppercase bg-[#E8A33D]/10 px-3 py-1 rounded-full border border-[#E8A33D]/20">
          Community
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#E4E8F1] tracking-tight">
          Community
        </h1>
        <p className="text-sm sm:text-base text-[#8890A0] leading-relaxed">
          “A place for learners to share what finally clicked for them.”
        </p>
      </div>

      {/* Main Card Note */}
      <div className="bg-[#12161F] border border-white/10 rounded-2xl p-8 sm:p-12 space-y-4 max-w-lg mx-auto shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-[#8B7FD1]/10 border border-[#8B7FD1]/30 flex items-center justify-center text-xl text-[#8B7FD1] mx-auto">
          💬
        </div>
        <h2 className="text-base font-semibold text-[#E4E8F1]">
          Community posts will be built later
        </h2>
        <p className="text-xs text-[#8890A0] leading-relaxed">
          We are focusing on mastering problem-solving instincts first. The interactive community features will be introduced in a future update.
        </p>
        <div className="pt-4">
          <Link
            to="/dsa"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#1A202C] hover:bg-[#252D3C] text-xs font-semibold text-[#E4E8F1] rounded-xl border border-white/10 transition-all"
          >
            Explore DSA Section →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CommunityPlaceholder;
