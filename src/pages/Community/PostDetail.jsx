import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../../services/communityService";
import { useAuth } from "../../Context/AuthContext";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await getPost(id);

        setPost(response.data);
      } catch (error) {
        console.error("Post detail error:", error);

        setError(
          error.response?.data?.message ||
          "Journey entry not found."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this journey entry?"
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      await deletePost(id);

      navigate("/community");
    } catch (error) {
      console.error("Delete post error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to delete this journey entry."
      );

      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F3] flex items-center justify-center px-5">

        <div className="text-center">

          <div className="w-7 h-7 mx-auto border-2 border-[#D9DCE1] border-t-[#253044] rounded-full animate-spin" />

          <p className="mt-4 text-sm text-[#8A8F96]">
            Loading journey...
          </p>

        </div>

      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-[#F7F7F3] flex items-center justify-center px-5">

        <div className="text-center max-w-md">

          <div className="w-12 h-12 mx-auto rounded-xl bg-[#F8EEEE] text-[#A55D5D] flex items-center justify-center text-lg mb-5">
            !
          </div>

          <h1 className="text-xl font-semibold text-[#20242B]">
            We couldn't find this journey.
          </h1>

          <p className="mt-2 text-sm text-[#70757D]">
            {error || "This entry may have been removed."}
          </p>

          <Link
            to="/community"
            className="inline-flex mt-6 px-5 py-2.5 rounded-lg bg-[#253044] hover:bg-[#1D2636] text-white text-sm font-medium transition-colors"
          >
            ← Back to Community
          </Link>

        </div>

      </main>
    );
  }

  const authorName =
    post.user?.name ||
    post.user?.fullName ||
    "Learner";

  const authorInitial =
    authorName.charAt(0).toUpperCase();

  const postDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    )
    : "Recently";

  const isOwner =
    user &&
    post.user?._id &&
    String(post.user._id) === String(user.id);

  return (
    <main className="w-full min-h-screen bg-[#F7F7F3] text-[#20242B]">

      <div className="w-full max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        {/* =========================
            BACK
        ========================= */}

        <Link
          to="/community"
          className="inline-flex items-center text-sm text-[#8A8F96] hover:text-[#253044] transition-colors mb-8"
        >
          ← Back to Community
        </Link>


        {/* =========================
            ARTICLE
        ========================= */}

        <article>

          {/* AUTHOR */}

          <div className="flex items-center justify-between gap-5 pb-7 border-b border-[#E2E3DE]">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-[#ECEFEA] text-[#4F5D4A] flex items-center justify-center text-sm font-semibold">
                {authorInitial}
              </div>

              <div>

                <div className="flex items-center gap-2 flex-wrap">

                  <span className="text-sm font-medium text-[#20242B]">
                    {authorName}
                  </span>

                  {isOwner && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#EEF1F5] text-[#566174]">
                      You
                    </span>
                  )}

                </div>

                <p className="text-xs text-[#9A9EA4] mt-0.5">
                  {postDate}
                </p>

              </div>

            </div>


            {/* OWNER ACTIONS */}

            {isOwner && (
              <div className="flex items-center gap-2">

                <Link
                  to={`/community/edit/${post._id}`}
                  className="px-3.5 py-2 rounded-lg border border-[#D8DBD5] bg-[#FCFCF9] text-xs font-medium text-[#5D646C] hover:text-[#20242B] hover:border-[#BFC4C9] transition-colors"
                >
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-3.5 py-2 rounded-lg border border-[#E7CECE] bg-[#FCFCF9] text-xs font-medium text-[#A55D5D] hover:bg-[#F8EEEE] disabled:opacity-50 transition-colors"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>

              </div>
            )}

          </div>


          {/* TITLE */}

          <header className="pt-8">

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight text-[#20242B]">
              {post.title}
            </h1>

          </header>


          {/* LEARNING MOMENT */}

          {(post.workedOn ||
            post.confusedBy ||
            post.learned) && (

              <section className="mt-8 space-y-5">

                {post.workedOn && (
                  <div className="pl-5 border-l-2 border-[#D9DCD6]">

                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#9A9EA4] mb-1.5">
                      What I worked on
                    </p>

                    <p className="text-[15px] text-[#4E5660] leading-7">
                      {post.workedOn}
                    </p>

                  </div>
                )}


                {post.confusedBy && (
                  <div className="pl-5 border-l-2 border-[#D9C9B8]">

                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#9A7442] mb-1.5">
                      What confused me
                    </p>

                    <p className="text-[15px] text-[#4E5660] leading-7">
                      {post.confusedBy}
                    </p>

                  </div>
                )}


                {post.learned && (
                  <div className="pl-5 border-l-2 border-[#C8D8CB]">

                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#587A63] mb-1.5">
                      What finally clicked
                    </p>

                    <p className="text-[15px] text-[#4E5660] leading-7">
                      {post.learned}
                    </p>

                  </div>
                )}

              </section>
            )}


          {/* MAIN REFLECTION */}

          <div className="mt-9">

            <p className="text-[10px] uppercase tracking-[0.14em] text-[#9A9EA4] mb-3">
              Reflection
            </p>

            <div className="text-[15px] sm:text-base text-[#3F464F] leading-8 whitespace-pre-line">
              {post.content}
            </div>

          </div>


          {/* IMAGE */}

          {post.image && (
            <figure className="mt-9">

              <div className="overflow-hidden rounded-2xl border border-[#E2E3DE] bg-[#F0F1EC]">

                <img
                  src={post.image}
                  alt={post.title || "Journey attachment"}
                  className="w-full max-h-[520px] object-contain"
                />

              </div>

              <figcaption className="text-xs text-[#9A9EA4] mt-2">
                Shared with this journey entry.
              </figcaption>

            </figure>
          )}


          {/* TAGS */}

          {Array.isArray(post.tags) &&
            post.tags.length > 0 && (

              <div className="mt-9 pt-6 border-t border-[#E2E3DE]">

                <div className="flex flex-wrap gap-2">

                  {post.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="text-xs text-[#737A83] bg-[#F0F1EC] border border-[#E2E3DE] px-3 py-1.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}

                </div>

              </div>
            )}

        </article>


        {/* =========================
            FOOTER
        ========================= */}

        <div className="mt-12 pt-7 border-t border-[#E2E3DE] text-center">

          <p className="text-xs text-[#A0A4AA]">
            Share what clicked. Someone else might be
            learning the same thing.
          </p>

        </div>

      </div>
    </main>
  );
}

export default PostDetail;