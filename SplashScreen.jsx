import Logo from "./Logo";

/**
 * Écran de démarrage (règle #2) : affiche le logo NGT au centre pendant que
 * l'application vérifie la session utilisateur (voir AuthContext.checkSession).
 * Durée réelle = temps de la vérification de session, pas une fausse attente.
 */
export default function SplashScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ngt-dark">
      <div className="animate-pulse">
        <Logo size="xl" />
      </div>
      <div className="mt-8 h-1 w-40 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full w-1/2 bg-ngt-gradient animate-[loading_1.2s_ease-in-out_infinite]" />
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
