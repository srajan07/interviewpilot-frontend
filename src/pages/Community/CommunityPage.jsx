import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../services/communityService";
import { useAuth } from "../../Context/AuthContext";

const AVATAR_PALETTE = [
  { bg: "var(--blue-light)", text: "var(--blue-dark)" },
  { bg: "var(--green-light)", text: "var(--green)" },
  { bg: "var(--amber-light)", text: "var(--amber)" },
  { bg: "var(--red-light)", text: "var(--red)" },
  { bg: "var(--bg-muted)", text: "var(--text-secondary)" },
];

function avatarStyle(name) {
  const index = name.charCodeAt(0) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

function SkeletonCard() {
  return (
    <div className="card-surface p-6 sm:p-7 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full" style={{ backgroundColor: "var(--bg-muted)" }} />
        <div className="space-y-2">
          <div className="h-3 w-24 rounded" style={{ backgroundColor: "var(--bg-muted)" }} />
          <div className="h-2.5 w-16 rounded" style={{ backgroundColor: "var(--bg-muted)" }} />
        </div>
      </div>
      <div className="h-5 w-3/4 rounded mb-3" style={{ backgroundColor: "var(--bg-muted)" }} />
      <div className="h-3 w-full rounded mb-2" style={{ backgroundColor: "var(--bg-muted)" }} />
      <div className="h-3 w-5/6 rounded" style={{ backgroundColor: "var(--bg-muted)" }} />
    </div>
  );
}

function CommunityPage() {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getPosts();

      setPosts(
        Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : []
      );
    } catch (err) {
      console.error("Error fetching posts:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load learning journeys."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="w-full min-h-screen" style={{ backgroundColor: "var(--bg-app)", color: "var(--text-primary)" }}>

      <div className="w-full max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        {/* =================================
            HEADER
        ================================= */}

        <section className="pb-10">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

            <div className="max-w-2xl">

              <p className="section-label mb-3">
                Learning community
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl tracking-tight" style={{ color: "var(--text-primary)" }}>
                Learn from each other.
              </h1>

              <p className="mt-4 text-sm sm:text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Share what you worked on, what confused you,
                and what finally clicked.
              </p>

            </div>


            <div className="flex items-center gap-2 shrink-0">

              <Link to="/community/me" className="btn-secondary">
                My journey
              </Link>

              <Link to="/community/create" className="btn-primary">
                Share journey
              </Link>

            </div>

          </div>

        </section>

        <div className="h-px mb-9" style={{ backgroundColor: "var(--border)" }} />


        {/* =================================
            ERROR
        ================================= */}

        {error && (
          <div
            className="mb-7 rounded-xl px-4 py-3 text-sm"
            style={{
              border: "1px solid var(--red)",
              backgroundColor: "var(--red-light)",
              color: "var(--red)",
            }}
          >
            {error}
          </div>
        )}


        {/* =================================
            SECTION HEADER
        ================================= */}

        <section>

          <div className="flex items-end justify-between pb-5">

            <div>
              <p className="section-label">
                Recent
              </p>
              <h2 className="text-xl font-semibold mt-1" style={{ color: "var(--text-primary)" }}>
                Learning journeys
              </h2>
            </div>

            {!loading && posts.length > 0 && (
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {posts.length}{" "}
                {posts.length === 1 ? "entry" : "entries"}
              </p>
            )}

          </div>


          {/* =================================
              LOADING — skeleton cards
          ================================= */}

          {loading && (
            <div className="space-y-5">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}


          {/* =================================
              POSTS — card feed
          ================================= */}

          {!loading && posts.length > 0 && (
            <div className="space-y-5">

              {posts.map((post) => {

                const authorName =
                  post.user?.name ||
                  post.user?.fullName ||
                  "Learner";

                const authorInitial =
                  authorName.charAt(0).toUpperCase();

                const avatar = avatarStyle(authorName);

                const postDate = post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
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
                  <article
                    key={post._id}
                    className="card-surface group p-6 sm:p-7 transition-all hover:shadow-md"
                    style={{ borderColor: "var(--border)" }}
                  >

                    {/* AUTHOR */}

                    <div className="flex items-center gap-3 mb-5">

                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                        style={{ backgroundColor: avatar.bg, color: avatar.text }}
                      >
                        {authorInitial}
                      </div>

                      <div className="min-w-0">

                        <div className="flex items-center gap-2 flex-wrap">

                          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                            {authorName}
                          </span>

                          {isOwner && (
                            <span className="badge" style={{ padding: "2px 8px" }}>
                              You
                            </span>
                          )}

                        </div>

                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {postDate}
                        </p>

                      </div>

                    </div>


                    {/* TITLE + CONTENT */}

                    <Link to={`/community/${post._id}`} className="block">

                      <h3
                        className="text-xl sm:text-[22px] font-semibold tracking-tight leading-snug transition-colors"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {post.title}
                      </h3>


                      {post.content && (
                        <p
                          className="mt-3 max-w-3xl text-sm sm:text-[15px] leading-7 line-clamp-3"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {post.content}
                        </p>
                      )}


                      {/* JOURNAL DETAILS — color-coded by what stage of learning they represent:
                          teal = in progress, amber = friction, green = resolved */}

                      {(post.workedOn ||
                        post.confusedBy ||
                        post.learned) && (

                          <div className="mt-6 grid gap-3 sm:grid-cols-3 max-w-3xl">

                            {post.workedOn && (
                              <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "var(--blue-light)" }}>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--blue-dark)" }}>
                                  Worked on
                                </p>
                                <p className="text-sm leading-6 line-clamp-3" style={{ color: "var(--text-primary)" }}>
                                  {post.workedOn}
                                </p>
                              </div>
                            )}

                            {post.confusedBy && (
                              <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "var(--amber-light)" }}>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--amber)" }}>
                                  Confused by
                                </p>
                                <p className="text-sm leading-6 line-clamp-3" style={{ color: "var(--text-primary)" }}>
                                  {post.confusedBy}
                                </p>
                              </div>
                            )}

                            {post.learned && (
                              <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "var(--green-light)" }}>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--green)" }}>
                                  What clicked
                                </p>
                                <p className="text-sm leading-6 line-clamp-3" style={{ color: "var(--text-primary)" }}>
                                  {post.learned}
                                </p>
                              </div>
                            )}

                          </div>
                        )}


                      {/* IMAGE */}

                      {post.image && (
                        <div
                          className="mt-6 max-w-2xl overflow-hidden rounded-2xl"
                          style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-muted)" }}
                        >

                          <img
                            src={post.image}
                            alt={
                              post.title ||
                              "Learning journey"
                            }
                            className="w-full max-h-[420px] object-cover"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget
                                .parentElement.style.display =
                                "none";
                            }}
                          />

                        </div>
                      )}


                      {/* TAGS + READ */}

                      <div
                        className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-5"
                        style={{ borderTop: "1px solid var(--border)" }}
                      >

                        <div className="flex items-center gap-2 flex-wrap">

                          {post.tags?.slice(0, 3).map(
                            (tag, index) => (
                              <span
                                key={`${tag}-${index}`}
                                className="text-[11px] px-2.5 py-1 rounded-full"
                                style={{
                                  color: "var(--text-secondary)",
                                  backgroundColor: "var(--bg-muted)",
                                  border: "1px solid var(--border)",
                                }}
                              >
                                #{tag}
                              </span>
                            )
                          )}

                        </div>

                        <span
                          className="text-sm font-medium group-hover:underline underline-offset-4 shrink-0"
                          style={{ color: "var(--blue-dark)" }}
                        >
                          Read journey →
                        </span>

                      </div>

                    </Link>

                  </article>
                );
              })}

            </div>
          )}


          {/* =================================
              EMPTY STATE
          ================================= */}

          {!loading && posts.length === 0 && !error && (
            <div className="rounded-2xl py-16 px-6" style={{ border: "1px dashed var(--border-strong)" }}>

              <div className="max-w-md mx-auto text-center">

                <div
                  className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-lg mb-5"
                  style={{ backgroundColor: "var(--green-light)", color: "var(--green)" }}
                >
                  ✎
                </div>

                <h3 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
                  Start the first journey.
                </h3>

                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  Share something you learned, a problem
                  that confused you, or an idea that finally
                  made sense.
                </p>

                <Link to="/community/create" className="btn-primary inline-flex mt-6">
                  Share your journey
                </Link>

              </div>

            </div>
          )}

        </section>


        {/* =================================
            FOOTER
        ================================= */}

        <footer className="pt-14 text-center">

          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Share what clicked. Someone else may be
            learning the same thing.
          </p>

        </footer>

      </div>
    </main>
  );
}

export default CommunityPage;