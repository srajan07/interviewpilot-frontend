import React from "react";
import { Link } from "react-router-dom";

const options = [
  {
    label: "Technical Practice",
    title: "Interview Practice",
    desc: "Practice core technical interview topics: OOP, OS, DBMS, Networks, and Data Structures.",
    to: "/interview",
    icon: "01",
    cta: "Start Interview →",
  },
  {
    label: "Timed Assessment",
    title: "Aptitude / OA Mock Test",
    desc: "30-minute timed mock test covering Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Data Interpretation.",
    to: "/aptitude",
    icon: "02",
    cta: "Start Assessment →",
  },
];

function PracticePage() {
  return (
    <main className="w-full min-h-screen bg-[#F7F7F3] text-[#20242B]">
      <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        {/* Header */}
        <section className="pb-8 border-b border-[#E2E3DE]">

          <p className="text-xs uppercase tracking-[0.16em] text-[#8A8F96] mb-3">
            Preparation
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#20242B]">
            Practice
          </h1>

          <p className="mt-3 max-w-xl text-sm sm:text-[15px] text-[#70757D] leading-7">
            Choose something to work on and practice at your own pace.
          </p>

        </section>


        {/* Practice Options */}
        <section className="pt-8">

          <div className="space-y-4 max-w-3xl">

            {options.map((option) => (
              <Link
                key={option.to}
                to={option.to}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FCFCF9] border border-[#E2E3DE] rounded-2xl p-5 sm:p-6 hover:border-[#C7CBD1] hover:shadow-[0_8px_24px_rgba(32,36,43,0.05)] transition-all duration-200"
              >

                <div className="flex items-start gap-4 min-w-0">

                  <div className="w-10 h-10 rounded-xl bg-[#EEF1F5] text-[#253044] flex items-center justify-center text-xs font-semibold shrink-0">
                    {option.icon}
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs uppercase tracking-[0.12em] text-[#92969D]">
                      {option.label}
                    </p>

                    <h2 className="mt-1.5 text-lg font-semibold text-[#20242B]">
                      {option.title}
                    </h2>

                    <p className="mt-1.5 text-sm text-[#70757D] leading-6">
                      {option.desc}
                    </p>

                  </div>

                </div>

                <span className="text-sm font-medium text-[#59616B] group-hover:text-[#253044] transition-colors whitespace-nowrap shrink-0 sm:ml-4">
                  {option.cta}
                </span>

              </Link>
            ))}

          </div>

        </section>


        {/* Coming Soon */}
        <section className="mt-14 pt-8 border-t border-[#E2E3DE]">

          <div className="max-w-3xl">
            <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

              <div>
                <h2 className="text-xl font-semibold text-[#20242B]">
                 More to come
                </h2>

              </div>

              <span className="text-xs text-[#9A9EA4] shrink-0">
                Coming soon
              </span>

            </div>

          </div>

        </section>


        {/* Footer note */}
        <footer className="pt-12 text-center">

          <p className="text-xs text-[#A0A4AA]">
            Start with one thing. Learn it well.
          </p>

        </footer>

      </div>
    </main>
  );
}

export default PracticePage;