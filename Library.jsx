import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api, API_URL } from "../api/client";

export default function Library() {
  const [videos, setVideos] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ videos }, { agents }] = await Promise.all([api.get("/videos"), api.get("/agents")]);
      setVideos(videos);
      setAgents(agents);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-ngt-dark">
      <Navbar />
      <div className="px-6 md:px-12 py-10 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Bibliothèque</h1>

        {loading ? (
          <p className="text-white/40 text-sm">Chargement...</p>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">Vidéos ({videos.length})</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {videos.length === 0 && <p className="text-white/40 text-sm">Aucune vidéo terminée pour le moment.</p>}
              {videos.map((v) => (
                <div key={v.id} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-medium">{v.title}</p>
                  <a href={`${API_URL}/videos/${v.id}/download`} className="text-xs text-ngt-cyan hover:underline">
                    Télécharger
                  </a>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-semibold mb-4">Agents ({agents.length})</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((a) => (
                <div key={a.id} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-medium">{a.name}</p>
                  <p className="text-xs text-white/40">{a.characters?.length || 0} personnage(s)</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
