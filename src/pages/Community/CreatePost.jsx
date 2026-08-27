import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPost } from "../../services/communityService";

function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    workedOn: "",
    confusedBy: "",
    learned: "",
    content: "",
    image: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and main reflection are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createPost({
        title: formData.title.trim(),
        workedOn: formData.workedOn.trim(),
        confusedBy: formData.confusedBy.trim(),
        learned: formData.learned.trim(),
        content: formData.content.trim(),
        image: formData.image.trim(),
        tags: formData.tags
          ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
          : [],
      });

      navigate("/community");
    } catch (error) {
      console.error("Create post error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to publish. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#F7F7F3] text-[#20242B]">

      <div className="w-full max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        {/* =========================
            HEADER
        ========================= */}

        <section className="pb-7 border-b border-[#E2E3DE]">

          <Link
            to="/community"
            className="inline-flex items-center text-sm text-[#8A8F96] hover:text-[#253044] transition-colors mb-5"
          >
            ← Back to Community
          </Link>

          <p className="text-xs uppercase tracking-[0.16em] text-[#8A8F96] mb-3">
            Your Journey
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Share something you learned.
          </h1>

          <p className="mt-3 text-sm sm:text-[15px] text-[#70757D] leading-relaxed">
            Talk about what you worked on, what confused you,
            and what finally made sense.
          </p>

        </section>


        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="mt-7 rounded-xl border border-[#E7CECE] bg-[#F8EEEE] px-4 py-3 text-sm text-[#A55D5D]">
            {error}
          </div>
        )}


        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-8"
        >

          {/* TITLE */}

          <div className="space-y-2">

            <label className="text-sm font-medium text-[#20242B]">
              Title
              <span className="text-[#A55D5D] ml-1">*</span>
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Two Pointers finally clicked for me"
              className="w-full px-4 py-3 bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl text-sm text-[#20242B] placeholder:text-[#A0A4AA] outline-none transition-colors focus:border-[#9AA5B5] focus:ring-2 focus:ring-[#D9E3F0]"
              required
            />

          </div>


          {/* LEARNING STRUCTURE */}

          <section className="border border-[#E2E3DE] bg-[#FCFCF9] rounded-2xl p-5 sm:p-6">

            <div className="mb-5">

              <p className="text-xs uppercase tracking-[0.14em] text-[#8A8F96]">
                Learning moment
              </p>

              <p className="text-sm text-[#70757D] mt-1.5">
                These are optional. They simply help you tell the
                story of what you learned.
              </p>

            </div>


            <div className="space-y-5">

              {/* Worked on */}

              <div className="space-y-2">

                <label className="text-sm font-medium text-[#4E5660]">
                  What I worked on
                </label>

                <input
                  type="text"
                  name="workedOn"
                  value={formData.workedOn}
                  onChange={handleChange}
                  placeholder="e.g. Two Sum II, JWT authentication, SQL joins"
                  className="w-full px-3.5 py-2.5 bg-[#F7F7F3] border border-[#E2E3DE] rounded-lg text-sm outline-none focus:border-[#9AA5B5] focus:ring-2 focus:ring-[#D9E3F0]"
                />

              </div>


              {/* Confused */}

              <div className="space-y-2">

                <label className="text-sm font-medium text-[#4E5660]">
                  What confused me
                </label>

                <input
                  type="text"
                  name="confusedBy"
                  value={formData.confusedBy}
                  onChange={handleChange}
                  placeholder="e.g. I thought HashMap was always the better option"
                  className="w-full px-3.5 py-2.5 bg-[#F7F7F3] border border-[#E2E3DE] rounded-lg text-sm outline-none focus:border-[#B8A58F] focus:ring-2 focus:ring-[#F1E8DE]"
                />

              </div>


              {/* Learned */}

              <div className="space-y-2">

                <label className="text-sm font-medium text-[#4E5660]">
                  What finally clicked
                </label>

                <input
                  type="text"
                  name="learned"
                  value={formData.learned}
                  onChange={handleChange}
                  placeholder="e.g. Sorted data lets two pointers eliminate possibilities"
                  className="w-full px-3.5 py-2.5 bg-[#F7F7F3] border border-[#E2E3DE] rounded-lg text-sm outline-none focus:border-[#8DA393] focus:ring-2 focus:ring-[#E5EDE7]"
                />

              </div>

            </div>

          </section>


          {/* MAIN REFLECTION */}

          <div className="space-y-2">

            <div className="flex items-center justify-between gap-4">

              <label className="text-sm font-medium text-[#20242B]">
                Your reflection
                <span className="text-[#A55D5D] ml-1">*</span>
              </label>

              <span className="text-xs text-[#A0A4AA]">
                {formData.content.length} characters
              </span>

            </div>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              placeholder="What happened? What did you struggle with? What helped you understand it?"
              className="w-full px-4 py-3.5 bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl text-sm text-[#20242B] placeholder:text-[#A0A4AA] outline-none resize-y leading-6 transition-colors focus:border-[#9AA5B5] focus:ring-2 focus:ring-[#D9E3F0]"
              required
            />

          </div>


          {/* IMAGE */}

          <div className="space-y-2">

            <label className="text-sm font-medium text-[#20242B]">
              Image
              <span className="ml-2 text-xs font-normal text-[#A0A4AA]">
                optional
              </span>
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/diagram.png"
              className="w-full px-4 py-3 bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl text-sm outline-none focus:border-[#9AA5B5] focus:ring-2 focus:ring-[#D9E3F0]"
            />

            <p className="text-xs text-[#9A9EA4]">
              Add a screenshot, handwritten note, diagram, or anything
              that helped you understand the idea.
            </p>

          </div>


          {/* TAGS */}

          <div className="space-y-2">

            <label className="text-sm font-medium text-[#20242B]">
              Tags
              <span className="ml-2 text-xs font-normal text-[#A0A4AA]">
                optional
              </span>
            </label>

            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="JWT, Backend, MongoDB"
              className="w-full px-4 py-3 bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl text-sm outline-none focus:border-[#9AA5B5] focus:ring-2 focus:ring-[#D9E3F0]"
            />

            <p className="text-xs text-[#9A9EA4]">
              Separate tags with commas.
            </p>

          </div>


          {/* ACTIONS */}

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-[#E2E3DE]">

            <Link
              to="/community"
              className="inline-flex justify-center px-5 py-2.5 rounded-lg border border-[#D8DBD5] bg-[#FCFCF9] text-sm font-medium text-[#5D646C] hover:border-[#BFC4C9] hover:text-[#20242B] transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#253044] hover:bg-[#1D2636] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
            >
              {loading ? "Publishing..." : "Publish Journey →"}
            </button>

          </div>

        </form>

      </div>
    </main>
  );
}

export default CreatePost;