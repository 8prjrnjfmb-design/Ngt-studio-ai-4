import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "./SplashScreen";

/**
 * Protège les pages privées côté client (pour l'UX de routage).
 * La vraie protection est côté serveur : chaque appel API passe par
 * requireAuth (backend/src/middleware/auth.js), qui ne fait jamais
 * confiance au frontend (règle #6 du cahier des charges).
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <SplashScreen />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
