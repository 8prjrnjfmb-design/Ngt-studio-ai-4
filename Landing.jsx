import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const features = [
  { title: "Création de scénarios", desc: "Concept, hook et scènes générés automatiquement par vos agents IA." },
  { title: "Agents IA", desc: "Créez des agents avec leur propre ton, style et instructions." },
  { title: "Génération de voix", desc: "Narrateur et personnages avec des voix distinctes, en plusieurs langues." },
  { title: "Génération d'images", desc: "Descriptions visuelles transformées en scènes, en 9:16." },
  { title: "Génération vidéo", desc: "Assemblage réel via FFmpeg : images, voix, musique, transitions." },
  { title: "Sous-titres automatiques", desc: "Générés à partir de la narration, lisibles sur mobile." },
  { title: "Projets & bibliothèque", desc: "Retrouvez tous vos projets, personnages et médias au même endroit." },
  { title: "Formats réseaux sociaux", desc: "Optimisé pour TikTok, Instagram Reels et YouTube Shorts." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-ngt-dark">
      <header className="flex items-center justify-between px-6 md:px-12 py-6">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-white/80 hover:text-white transition">
            Se connecter
          </Link>
          <Link
            to="/signup"
            className="text-sm px-4 py-2 rounded-full bg-ngt-gradient font-medium hover:opacity-90 transition"
          >
            Commencer gratuitement
          </Link>
        </div>
      </header>

      <section className="px-6 md:px-12 py-16 md:py-28 text-center max-w-4xl mx-auto">
        <Logo size="lg" className="mx-auto mb-8" />
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Créez des vidéos avec <span className="ngt-gradient-text">l'intelligence artificielle</span>
        </h1>
        <p className="mt-6 text-white/60 text-lg">
          NGT Studio transforme une simple idée en vidéo verticale complète — scénario, voix, images et montage — prête pour TikTok, Reels et Shorts.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="px-8 py-3 rounded-full bg-ngt-gradient font-semibold hover:opacity-90 transition w-full sm:w-auto text-center"
          >
            Commencer gratuitement
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 rounded-full border border-white/20 font-semibold hover:border-white/40 transition w-full sm:w-auto text-center"
          >
            Se connecter
          </Link>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((f) => (
          <div key={f.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition">
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-white/50">{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className="px-6 md:px-12 py-10 text-center text-xs text-white/30 border-t border-white/10">
        © {new Date().getFullYear()} NGT — L'IA au service de vos idées.
      </footer>
    </div>
  );
}
