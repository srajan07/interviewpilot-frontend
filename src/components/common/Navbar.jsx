import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName = user?.name || user?.fullName || "User";
  const userInitial = displayName.charAt(0).toUpperCase();

  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Practice", path: "/practice" },
    { label: "Community", path: "/community" },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    if (path === "/practice") return location.pathname.startsWith("/practice") || location.pathname.startsWith("/aptitude") || location.pathname.startsWith("/interview");
    if (path === "/community") return location.pathname.startsWith("/community");
    return false;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-white border-b border-[#E5E7EB] sticky top-0 z-30" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8">
        <div className="h-[60px] flex items-center justify-between">

          {/* Logo */}
          <Link
  to="/dashboard"
  className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
>
  <img
    src="/src/assets/logo.png"
    alt="Learnlog logo"
    className="h-12 mx-auto object-contain"
  />
    </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-[#DBEAFE] text-[#1E3A5F] font-semibold"
                      : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F5F5F0]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Profile + Logout */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/profile"
              className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                location.pathname === "/profile"
                  ? "border-[#1E3A5F] bg-[#1E3A5F] text-white"
                  : "border-[#E5E7EB] bg-white text-[#374151] hover:border-[#D1D5DB] hover:bg-[#F5F5F0]"
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center text-[10px] font-bold">
                {userInitial}
              </div>
              <span className="max-w-[100px] truncate">{displayName}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs text-[#9CA3AF] hover:text-[#DC2626] font-medium transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/profile"
              className="w-8 h-8 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center text-xs font-bold shadow-sm"
            >
              {userInitial}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#374151] border border-[#E5E7EB] bg-white hover:bg-[#F5F5F0]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#E5E7EB] space-y-1 bg-white">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#DBEAFE] text-[#1E3A5F] font-semibold"
                      : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F5F5F0]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm text-[#6B7280] hover:text-[#111827] hover:bg-[#F5F5F0]"
            >
              Profile
            </Link>
            <div className="pt-2 border-t border-[#E5E7EB] px-3 flex items-center justify-between">
              <span className="text-xs text-[#9CA3AF]">
                Signed in as <strong className="text-[#374151]">{displayName}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-[#DC2626] hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
