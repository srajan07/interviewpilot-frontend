import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(formData);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 bg-[#0B0E14] overflow-hidden">
      {/* Stage spotlight glow */}
      <div
        className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, #E8A33D 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#8B7FD1] mb-3">
            Session Access
          </p>
          <h1 className="font-['Fraunces'] text-4xl text-[#E4E8F1] tracking-tight">
            InterviewPilot
          </h1>
          <p className="text-[#8890A0] mt-2 text-sm">
            Step in. The room is ready.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#12161F] border border-white/5 rounded-2xl p-7 space-y-5 shadow-[0_0_60px_-15px_rgba(232,163,61,0.15)]"
        >
          {error && (
            <div className="flex items-start gap-2 bg-[#E8607A]/10 border border-[#E8607A]/20 text-[#E8607A] text-sm p-3 rounded-lg">
              <span className="mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block mb-2 text-xs uppercase tracking-wider text-[#8890A0]">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              autoFocus
              className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 text-[#E4E8F1] placeholder:text-[#4A5064] outline-none transition-colors focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D]/40"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase tracking-wider text-[#8890A0]">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#8B7FD1] hover:text-[#a89cf0] transition-colors"
              >
                Forgot?
              </Link>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-3 pr-11 text-[#E4E8F1] placeholder:text-[#4A5064] outline-none transition-colors focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D]/40"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8890A0] hover:text-[#E4E8F1] text-xs transition-colors"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E8A33D] hover:bg-[#f0b355] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B0E14] rounded-lg py-3 font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="flex items-end gap-[3px] h-3">
                  <span className="w-[3px] bg-[#0B0E14] animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
                  <span className="w-[3px] bg-[#0B0E14] animate-[pulse_0.8s_ease-in-out_0.15s_infinite] h-3" />
                  <span className="w-[3px] bg-[#0B0E14] animate-[pulse_0.8s_ease-in-out_0.3s_infinite] h-1.5" />
                </span>
                Signing in
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-center text-[#8890A0] text-sm pt-1">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#E8A33D] hover:text-[#f0b355] font-medium transition-colors"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;