import logo from "../assets/logo.png";

/**
 * Logo officiel NGT — fourni par l'utilisateur, jamais recréé.
 * Utilisé sur : splash screen, accueil, connexion, inscription, dashboard,
 * navigation (règle #1 et #28 du cahier des charges).
 */
export default function Logo({ size = "md", withWordmark = false, className = "" }) {
  const sizes = {
    sm: "h-8",
    md: "h-12",
    lg: "h-24",
    xl: "h-40",
  };

  return (
    <img
      src={logo}
      alt="NGT Studio"
      className={`${sizes[size]} w-auto object-contain ${className}`}
      draggable={false}
    />
  );
}
