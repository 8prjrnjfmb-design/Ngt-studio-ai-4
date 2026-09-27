import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../api/client";

const STATUS_LABELS = {
  DRAFT: "Brouillon",
  ANALYZING: "Analyse en cours…",
  SCRIPTING: "Génération du scénario…",
  GENERATING_IMAGES: "Génération des images…",
  GENERATING_VOICE: "Génération de la voix…",
  ASSEMBLING: "Assemblage de la vidéo…",
  COMPLETED: "Terminé",
  FAILED: "Échec",
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState(null);

  async function load() {
    setLoading(true);
    const [{ projects }, { agents }] = await Promise.all([api.get("/projects"), api.get("/agents")]);
    setProjects(projects);
    setAgents(agents);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    try {
      const { project } = await api.post("/projects", { title, prompt, agentId: agentId || undefined });
      setTitle("");
      setPrompt("");
      await load();
      handleGenerate(project.id);
    } catch (err) {
      setError(err.message);
    }
  }

  // Lance le pipeline réel (réponse immédiate, tâche de fond côté serveur)
  // puis suit la progression réelle en interrogeant /api/generate/status/:id
  // toutes les 2s jusqu'à COMPLETED ou FAILED (règle #18 : progression réelle).
  async function handleGenerate(projectId) {
    setGeneratingId(projectId);
    setError("");
    try {
      await api.post("/generate", { projectId });
      await load();
      pollStatus(projectId);
    } catch (err) {
      setError(err.message);
      setGeneratingId(null);
    }
  }

  function pollStatus(projectId) {
    const interval = setInterval(async () => {
      try {
        const { status: s, progress, errorMessage } = await api.get(`/generate/status/${projectId}`);
        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? { ...p, status: s, progress, errorMessage } : p))
        );
        if (s === "COMPLETED" || s === "FAILED") {
          clearInterval(interval);
          setGeneratingId(null);
          load();
        }
      } catch {
        clearInterval(interval);
        setGeneratingId(null);
      }
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-ngt-dark">
      <Navbar />
      <div className="px-6 md:px-12 py-10 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Mes projets</h1>

        <form onSubmit={handleCreate} className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <input
            required
            placeholder="Titre du projet"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm"
          />
          <textarea
            required
            placeholder="Décrivez la vidéo que vous voulez créer..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm"
          />
          <select
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm"
          >
            <option value="">Aucun agent spécifique</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="px-5 py-2 rounded-full bg-ngt-gradient text-sm font-medium">
            Créer et générer la vidéo
          </button>
        </form>

        {loading ? (
          <p className="text-white/40 text-sm">Chargement...</p>
        ) : projects.length === 0 ? (
          <p className="text-white/40 text-sm">Aucun projet pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{p.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${p.status === "FAILED" ? "bg-red-500/20 text-red-400" : p.status === "COMPLETED" ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/60"}`}>
                    {STATUS_LABELS[p.status] || p.status}
                  </span>
                </div>
                {p.status !== "COMPLETED" && p.status !== "FAILED" && (
                  <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-ngt-gradient transition-all" style={{ width: `${p.progress}%` }} />
                  </div>
                )}
                {p.status === "FAILED" && p.errorMessage && (
                  <p className="text-xs text-red-400 mt-2">{p.errorMessage}</p>
                )}
                {p.status === "COMPLETED" && (
                  <a
                    href={`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/videos/${p.id}/download`}
                    className="inline-block mt-3 text-xs text-ngt-cyan hover:underline"
                  >
                    Télécharger la vidéo
                  </a>
                )}
                {(p.status === "DRAFT" || p.status === "FAILED") && (
                  <button
                    onClick={() => handleGenerate(p.id)}
                    disabled={generatingId === p.id}
                    className="mt-3 text-xs px-3 py-1.5 rounded-full border border-white/20 hover:border-white/40"
                  >
                    {generatingId === p.id ? "Génération…" : "Relancer la génération"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
