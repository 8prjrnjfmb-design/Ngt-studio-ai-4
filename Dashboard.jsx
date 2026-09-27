import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";

const actions = [
  { to: "/projects/new", label: "Créer une vidéo", icon: "🎬" },
  { to: "/agents", label: "Mes agents", icon: "🤖" },
  { to: "/projects", label: "Mes projets", icon: "📁" },
  { to: "/library?type=videos", label: "Mes vidéos", icon: "🎞️" },
  { to: "/library?type=history", label: "Historique", icon: "🕒" },
  { to: "/library", label: "Bibliothèque", icon: "📚" },
  { to: "/settings", label: "Paramètres", icon: "⚙️" },
  { to: "/profile", label: "Profil", icon: "👤" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [agentsRes, projectsRes] = await Promise.all([
          api.get("/agents"),
          api.get("/projects"),
        ]);
        const projects = projectsRes.projects || [];
        setStats({
          videos: projects.filter((p) => p.status === "COMPLETED").length,
          projects: projects.length,
          agents: (agentsRes.agents || []).length,
          generations: projects.length,
        });
      } catch {
        setStats({ videos: 0, projects: 0, agents: 0, generations: 0 });
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-ngt-dark">
      <Navbar />
      <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold">Bonjour, {user?.firstName || "vous"} 👋</h1>
        <p className="text-white/50 mt-1">Que voulez-vous créer aujourd'hui ?</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {actions.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition flex flex-col gap-2"
            >
              <span className="text-2xl">{a.icon}</span>
              <span className="font-medium">{a.label}</span>
            </Link>
          ))}
        </div>

        <h2 className="text-lg font-semibold mt-12 mb-4">Statistiques</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Vidéos créées", value: stats?.videos },
            { label: "Projets", value: stats?.projects },
            { label: "Agents", value: stats?.agents },
            { label: "Générations", value: stats?.generations },
          ].map((s) => (
            <div key={s.label} className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-2xl font-bold ngt-gradient-text">{s.value ?? "…"}</p>
              <p className="text-sm text-white/50 mt-1">{s.label}</p>
            </div>
          ))}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-2xl font-bold ngt-gradient-text">{user?.credits ?? "…"}</p>
            <p className="text-sm text-white/50 mt-1">Crédits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
