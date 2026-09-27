import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../api/client";

const emptyForm = { name: "", description: "", tone: "", language: "fr", instructions: "" };

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { agents } = await api.get("/agents");
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
      await api.post("/agents", form);
      setForm(emptyForm);
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    await api.del(`/agents/${id}`);
    load();
  }

  return (
    <div className="min-h-screen bg-ngt-dark">
      <Navbar />
      <div className="px-6 md:px-12 py-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Mes agents</h1>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="px-4 py-2 rounded-full bg-ngt-gradient text-sm font-medium"
          >
            {showForm ? "Annuler" : "+ Nouvel agent"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <input
              required
              placeholder="Nom de l'agent"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm"
            />
            <textarea
              placeholder="Description / rôle"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm"
              rows={2}
            />
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                placeholder="Ton (ex: humoristique, sérieux)"
                value={form.tone}
                onChange={(e) => setForm({ ...form, tone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm"
              />
              <input
                placeholder="Langue (ex: fr, en)"
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm"
              />
            </div>
            <textarea
              placeholder="Instructions personnalisées"
              value={form.instructions}
              onChange={(e) => setForm({ ...form, instructions: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm"
              rows={2}
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" className="px-5 py-2 rounded-full bg-ngt-gradient text-sm font-medium">
              Créer l'agent
            </button>
          </form>
        )}

        {loading ? (
          <p className="text-white/40 text-sm">Chargement...</p>
        ) : agents.length === 0 ? (
          <p className="text-white/40 text-sm">Aucun agent pour le moment. Créez votre premier agent IA.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((a) => (
              <div key={a.id} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{a.name}</h3>
                  <button onClick={() => handleDelete(a.id)} className="text-white/30 hover:text-red-400 text-xs">
                    Supprimer
                  </button>
                </div>
                {a.description && <p className="text-sm text-white/50 mt-2">{a.description}</p>}
                <div className="flex gap-2 mt-3 text-xs text-white/40">
                  {a.tone && <span className="px-2 py-1 rounded-full bg-white/5">{a.tone}</span>}
                  {a.language && <span className="px-2 py-1 rounded-full bg-white/5">{a.language}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
