<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition ${isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`;

  const applicantLinks = [
    { to: "/dashboard", label: "📋 My Applications" },
    { to: "/jobs", label: "🔍 Browse Jobs" },
  ];

  const recruiterLinks = [
    { to: "/recruiterdashboard", label: "📊 Dashboard" },
    { to: "/post-job", label: "➕ Post Job" },
    { to: "/jobs", label: "🔍 Browse Jobs" },
  ];

  const links = user.role === "recruiter" ? recruiterLinks : applicantLinks;

  return (
    <aside className="w-52 min-h-screen bg-white border-r px-3 py-6 hidden md:block">
      <p className="text-xs text-gray-400 uppercase font-semibold px-4 mb-3">Menu</p>
      <nav className="space-y-1">
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>
        ))}
      </nav>
    </aside>
  );
}
=======
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition ${isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`;

  const applicantLinks = [
    { to: "/dashboard", label: "📋 My Applications" },
    { to: "/jobs", label: "🔍 Browse Jobs" },
  ];

  const recruiterLinks = [
    { to: "/recruiterdashboard", label: "📊 Dashboard" },
    { to: "/post-job", label: "➕ Post Job" },
    { to: "/jobs", label: "🔍 Browse Jobs" },
  ];

  const links = user.role === "recruiter" ? recruiterLinks : applicantLinks;

  return (
    <aside className="w-52 min-h-screen bg-white border-r px-3 py-6 hidden md:block">
      <p className="text-xs text-gray-400 uppercase font-semibold px-4 mb-3">Menu</p>
      <nav className="space-y-1">
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>
        ))}
      </nav>
    </aside>
  );
}
>>>>>>> 1f3bf29 (updated)
