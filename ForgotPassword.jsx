import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { api } from "../api/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ngt-dark px-6 py-12">
      <Link to="/"><Logo size="md" className="mb-8" /></Link>

      <div className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-center mb-2">Mot de passe oublié</h1>
        <p className="text-sm text-white/50 text-center mb-6">
          Recevez un lien pour réinitialiser votre mot de passe.
        </p>

        {sent ? (
          <p className="text-sm text-center text-green-400">
            Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-ngt-blue outline-none text-sm"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-ngt-gradient font-medium text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Envoi..." : "Envoyer le lien"}
            </button>
          </form>
        )}

        <p className="text-center mt-4 text-xs text-white/50">
          <Link to="/login" className="hover:text-white">Retour à la connexion</Link>
        </p>
      </div>
    </div>
  );
}
