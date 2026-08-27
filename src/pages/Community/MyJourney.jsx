import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyPosts,
  deletePost,
} from "../../services/communityService";

function MyJourney() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchMyPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMyPosts();

      setPosts(
        Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : []
      );
    } catch (error) {
      console.error("My journey error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load your journey entries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Delete this journey entry?"
    );

    if (!confirmed) return;

    setDeletingId(postId);
    setError("");

    try {
      await deletePost(postId);

      setPosts((previous) =>
        previous.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error("Delete post error:", error);

      setError(
        error.response?.data?.message ||
          "Could not delete the journey entry."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#F7F7F3] text-[#20242B]">
      <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        {/* =========================
            HEADER
        ========================= */}

        <section className="pb-8 border-b border-[#E2E3DE]">

          <Link
            to="/community"
            className="inline-flex items-center text-sm text-[#8A8F96] hover:text-[#253044] transition-colors mb-5"
          >
            ← Back to Community
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#8A8F96] mb-3">
                Your Journey
              </p>

              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#20242B]">
                What you've been learning.
              </h1>

              <p className="mt-3 text-sm sm:text-[15px] text-[#70757D] leading-relaxed">
                A record of the things you worked on,
                struggled with, and finally understood.
              </p>
            </div>

            <Link
              to="/community/create"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#253044] !text-white hover:bg-[#1D2636] transition-colors text-sm font-medium shrink-0"
            >
              + New Entry
            </Link>

          </div>
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
            LOADING
        ========================= */}

        {loading && (
          <div className="py-16 text-center">

            <div className="w-7 h-7 mx-auto border-2 border-[#D9DCE1] border-t-[#253044] rounded-full animate-spin" />

            <p className="mt-4 text-sm text-[#8A8F96]">
              Loading your journey...
            </p>

          </div>
        )}


        {/* =========================
            EMPTY STATE
        ========================= */}

        {!loading && posts.length === 0 && !error && (
          <section className="py-16">

            <div className="max-w-md">

              <div className="w-12 h-12 rounded-xl bg-[#ECEFEA] text-[#587A63] flex items-center justify-center text-lg mb-5">
                ✎
              </div>

              <h2 className="text-xl font-semibold text-[#20242B]">
                Your journey starts here.
              </h2>

              <p className="mt-2 text-sm text-[#70757D] leading-6">
                Write about something you learned, a problem
                that confused you, or an idea that finally clicked.
              </p>

              <Link
                to="/community/create"
                className="inline-flex items-center justify-center mt-6 px-5 py-2.5 rounded-lg bg-[#253044] !text-white hover:bg-[#1D2636] transition-colors text-sm font-medium"
              >
                Share your first entry
              </Link>

            </div>
          </section>
        )}


        {/* =========================
            JOURNEY ENTRIES
        ========================= */}

        {!loading && posts.length > 0 && (
          <section className="pt-8">

            <div className="flex items-center justify-between pb-4 border-b border-[#E2E3DE]">

              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#8A8F96]">
                  Timeline
                </p>

                <h2 className="text-xl font-semibold text-[#20242B] mt-1">
                  Your entries
                </h2>
              </div>

              <p className="text-xs text-[#9A9EA4]">
                {posts.length}{" "}
                {posts.length === 1 ? "entry" : "entries"}
              </p>

            </div>


            <div className="divide-y divide-[#E2E3DE]">

              {posts.map((post) => {

                const postDate = post.createdAt
                  ? new Date(
                      post.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recently";

                return (
                  <article
                    key={post._id}
                    className="py-7"
                  >

                    {/* DATE */}

                    <p className="text-xs text-[#9A9EA4] mb-2">
                      {postDate}
                    </p>


                    {/* ENTRY */}

                    <Link
                      to={`/community/${post._id}`}
                      className="group block"
                    >

                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug text-[#20242B] group-hover:text-[#42556F] transition-colors">
                        {post.title}
                      </h3>


                      {post.content && (
                        <p className="mt-3 text-sm sm:text-[15px] text-[#70757D] leading-7 max-w-3xl line-clamp-3">
                          {post.content}
                        </p>
                      )}


                      {/* IMAGE */}

                      {post.image && (
                        <div className="mt-5 max-w-xl overflow-hidden rounded-xl border border-[#E2E3DE] bg-[#F0F1EC]">

                          <img
                            src={post.image}
                            alt={
                              post.title ||
                              "Journey attachment"
                            }
                            className="w-full max-h-[320px] object-cover"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display =
                                "none";
                            }}
                          />

                        </div>
                      )}


                      {/* TAGS */}

                      {Array.isArray(post.tags) &&
                        post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-5">

                            {post.tags
                              .slice(0, 3)
                              .map((tag, index) => (
                                <span
                                  key={`${tag}-${index}`}
                                  className="text-[11px] text-[#737A83] bg-[#F0F1EC] border border-[#E2E3DE] px-2.5 py-1 rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}

                          </div>
                        )}

                    </Link>


                    {/* ACTIONS */}

                    <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-[#ECEDE9]">

                      <Link
                        to={`/community/${post._id}`}
                        className="text-sm font-medium text-[#59616B] hover:text-[#253044] transition-colors"
                      >
                        View entry
                      </Link>

                      <div className="flex items-center gap-4">

                        <Link
                          to={`/community/edit/${post._id}`}
                          className="text-sm font-medium text-[#59616B] hover:text-[#253044] transition-colors"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(post._id)
                          }
                          disabled={
                            deletingId === post._id
                          }
                          className="text-sm font-medium text-[#A55D5D] hover:text-[#874747] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {deletingId === post._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          </section>
        )}


        {/* =========================
            FOOTER
        ========================= */}

        <footer className="pt-10 text-center">

          <p className="text-xs text-[#A0A4AA]">
            Keep track of the things that finally clicked.
          </p>

        </footer>

      </div>
    </main>
  );
}

export default MyJourney;