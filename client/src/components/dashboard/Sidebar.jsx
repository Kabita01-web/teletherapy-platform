import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  MessageCircle,
  ClipboardList,
  BookOpen,
  UserSearch,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const navLinks = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Sessions", to: "/sessions", icon: Calendar },
  { label: "Messages", to: "/messages", icon: MessageCircle },
  { label: "Assessments", to: "/assessments", icon: ClipboardList },
  { label: "Resources", to: "/resources", icon: BookOpen },
  { label: "Find a Therapist", to: "/therapists", icon: UserSearch },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (to) =>
    to === "/dashboard"
      ? location.pathname === to
      : location.pathname.startsWith(to);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-on-background/40 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-surface-container-lowest border-r border-surface-variant flex flex-col z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo + mobile close */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-surface-variant flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-white"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-[18px] font-['Fraunces',serif] font-semibold text-primary tracking-tight">
              Inner Balance
            </span>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden p-1 text-text-muted hover:text-on-surface"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map(({ label, to, icon: Icon }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-text-muted hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User card + logout */}
        <div className="p-4 border-t border-surface-variant flex-shrink-0">
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
              <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold text-on-secondary-container">
                {(user?.name ?? "?")[0]}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface truncate">
                {user?.name ?? "Loading…"}
              </p>
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted text-xs capitalize truncate">
                {user?.role ?? ""}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-text-muted hover:bg-error-container hover:text-on-error-container transition-colors"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
