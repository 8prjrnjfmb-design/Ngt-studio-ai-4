import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setAccessToken, api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "../components/SplashScreen";

/**
 * Reçoit le token après une connexion OAuth réussie (Google/Facebook),
 * redirigé depuis backend/src/routes/auth.js (*_callback).
 */
export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    async function finalize() {
      const token = params.get("token");
      if (!token) {
        navigate("/login?error=oauth");
        return;
      }
      setAccessToken(token);
      try {
        const { user } = await api.get("/auth/me");
        setUser(user);
        navigate("/dashboard");
      } catch {
        navigate("/login?error=oauth");
      }
    }
    finalize();
  }, [params, navigate, setUser]);

  return <SplashScreen />;
}
