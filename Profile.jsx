import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-ngt-dark">
      <Navbar />
      <div className="px-6 md:px-12 py-10 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Profil</h1>

        <div className="flex items-center gap-4 mb-8">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="" className="h-16 w-16 rounded-full" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-ngt-gradient flex items-center justify-center text-xl font-bold">
              {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold text-lg">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-white/50">{user?.email}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/40">Fournisseur de connexion</p>
            <p className="font-medium mt-1">{user?.provider}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/40">Crédits disponibles</p>
            <p className="font-medium mt-1">{user?.credits}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/40">Membre depuis</p>
            <p className="font-medium mt-1">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("fr-FR") : "—"}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/40">Dernière connexion</p>
            <p className="font-medium mt-1">
              {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString("fr-FR") : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
