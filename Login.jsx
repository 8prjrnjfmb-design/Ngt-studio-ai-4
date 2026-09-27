import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api/client";

const OAUTH_PROVIDERS = [
  { id: "google", label: "Continuer avec Google" },
  { id: "apple", label: "Continuer avec Apple" },
  { id: "facebook", label: "Continuer avec Facebook" },
  { id: "tiktok", label: "Continuer avec TikTok" },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Redirige vers la vraie route OAuth backend (jamais simulée, règle #4).
  function handleOAuth(provider) {
    window.location.href = `${API_URL}/auth/${provider}`;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ngt-dark px-6 py-12">
      <Link to="/">
        <Logo size="md" className="mb-8" />
      </Link>

      <div className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-center mb-6">Connexion à NGT Studio</h1>

        <div className="space-y-2 mb-6">
          {OAUTH_PROVIDERS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleOAuth(p.id)}
              className="w-full py-2.5 rounded-lg border border-white/15 text-sm hover:border-white/30 transition"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 my-6 text-white/30 text-xs">
          <div className="flex-1 h-px bg-white/10" />
          OU PAR EMAIL
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-ngt-blue outline-none text-sm"
          />
          <input
            type="password"
            required
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-ngt-blue outline-none text-sm"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-ngt-gradient font-medium text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-xs text-white/50">
          <Link to="/forgot-password" className="hover:text-white">Mot de passe oublié ?</Link>
          <Link to="/signup" className="hover:text-white">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}
