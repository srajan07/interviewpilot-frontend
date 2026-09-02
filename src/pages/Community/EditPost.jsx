import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, updatePost } from "../../services/communityService";
import { useAuth } from "../../Context/AuthContext";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [removeExistingImage, setRemoveExistingImage] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await getPost(id);
        const post = response.data;

        const currentUserId = (user?._id || user?.id || "").toString();
        const postAuthorId = post?.user
          ? (post.user._id ? post.user._id.toString() : post.user.toString())
          : "";

        if (
          user &&
          currentUserId &&
          postAuthorId &&
          postAuthorId !== currentUserId
        ) {
          setError("You are not authorized to edit this post.");
          setLoading(false);
          return;
        }

        setFormData({
          title: post.title || "",
          content: post.content || "",
          tags: Array.isArray(post.tags)
            ? post.tags.join(", ")
            : "",
        });

        if (post.image) {
          setImagePreview(post.image);
        }
      } catch (error) {
        console.error("Failed to load post:", error);
        setError(error.response?.data?.message || "Failed to load post.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, GIF).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setRemoveExistingImage(false);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setRemoveExistingImage(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and note are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("title", formData.title.trim());
      payload.append("content", formData.content.trim());
      payload.append("tags", formData.tags);

      if (imageFile) {
        payload.append("image", imageFile);
      } else if (removeExistingImage) {
        payload.append("removeImage", "true");
      }

      await updatePost(id, payload);

      navigate("/community/me");
    } catch (error) {
      console.error("Update post error:", error);
      setError(
        error.response?.data?.message ||
        "Failed to update the entry."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F3] text-[#20242B] flex items-center justify-center px-5">
        <div className="text-center">
          <div className="spinner mx-auto" />
          <p className="mt-4 text-sm text-[#8A8F96]">Loading note...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#F7F7F3] text-[#20242B]">
      <div className="w-full max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        {/* HEADER */}
        <section className="pb-7 border-b border-[#E2E3DE]">
          <Link
            to="/community/me"
            className="inline-flex items-center text-sm text-[#8A8F96] hover:text-[#253044] transition-colors mb-5"
          >
            ← Back to My Journey
          </Link>

          <p className="text-xs uppercase tracking-[0.16em] text-[#8A8F96] mb-3">
            Your Journey
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Edit your learning note.
          </h1>
        </section>

        {/* ERROR */}
        {error && (
          <div className="mt-7 rounded-xl border border-[#E7CECE] bg-[#F8EEEE] px-4 py-3 text-sm text-[#A55D5D]">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-7">

          {/* TITLE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#20242B]">
              Title <span className="text-[#A55D5D] ml-1">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Two Pointers finally clicked for me"
              className="w-full px-4 py-3 bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl text-sm text-[#20242B] placeholder:text-[#8A8F96] outline-none transition-colors focus:border-[#9AA5B5]"
              required
            />
          </div>

          {/* NOTE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-medium text-[#20242B]">
                Your note <span className="text-[#A55D5D] ml-1">*</span>
              </label>
              <span className="text-xs text-[#8A8F96]">
                {formData.content.length} characters
              </span>
            </div>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              placeholder="What did you learn? What helped you understand it?"
              className="w-full px-4 py-3.5 bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl text-sm text-[#20242B] placeholder:text-[#8A8F96] outline-none resize-y leading-6 transition-colors focus:border-[#9AA5B5]"
              required
            />
          </div>

          {/* IMAGE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#20242B]">
              Image <span className="ml-2 text-xs font-normal text-[#8A8F96]">optional</span>
            </label>

            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center gap-2 w-full px-4 py-8 bg-[#FCFCF9] border border-dashed border-[#E2E3DE] rounded-xl text-sm text-[#8A8F96] cursor-pointer hover:border-[#9AA5B5] transition-colors">
                <span>Click to upload image (max 5MB)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative max-w-sm overflow-hidden rounded-xl border border-[#E2E3DE]">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-56 object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full hover:bg-black/80 transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* TAGS */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#20242B]">
              Tags <span className="ml-2 text-xs font-normal text-[#8A8F96]">optional</span>
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="JWT, Backend, MongoDB"
              className="w-full px-4 py-3 bg-[#FCFCF9] border border-[#E2E3DE] rounded-xl text-sm outline-none focus:border-[#9AA5B5]"
            />
            <p className="text-xs text-[#8A8F96]">
              Separate tags with commas.
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-[#E2E3DE]">
            <Link to="/community/me" className="btn-secondary">
              Cancel
            </Link>

            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? "Saving..." : "Save Changes →"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}

export default EditPost;