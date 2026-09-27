import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const links = [
  { to: "/dashboard", label: "Tableau de bord" },
  { to: "/agents", label: "Mes agents" },
  { to: "/projects", label: "Mes projets" },
  { to: "/library", label: "Bibliothèque" },
  { to: "/settings", label: "Paramètres" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-ngt-dark/90 backdrop-blur border-b border-white/10">
      <Link to="/dashboard" className="flex items-center gap-2">
        <Logo size="sm" />
      </Link>

      <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="hover:text-white transition">
            {l.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.firstName} className="h-8 w-8 rounded-full" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-ngt-gradient flex items-center justify-center text-xs font-bold">
            {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase()}
          </div>
        )}
        <button onClick={handleLogout} className="text-sm text-white/60 hover:text-white transition">
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
