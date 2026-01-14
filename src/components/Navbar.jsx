import { Link } from "react-router-dom";
import Logo from "../../public/Logo.png";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-card/70 backdrop-blur-xl border-b border-slate-200/30 dark:border-slate-800/30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={Logo} alt="QuikNote Logo" className="w-32" />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/login"
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
