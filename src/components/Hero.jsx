import { Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import App from "../../public/App.png";

export default function Hero() {
  return (
    <header className="pt-40 pb-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8">
          Thoughts at the <span className="text-primary">Speed of Light</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          The minimalist note-taking engine for rapid ideation. Capture,
          organize, and retrieve your brilliance without the friction.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all"
          >
            Start Writing for Free
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-card border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
            <PlayCircle size={24} />
            Watch Demo
          </button>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-b from-primary/20 to-transparent blur-3xl opacity-30 -z-10 rounded-full"></div>
          <div className="bg-slate-200 dark:bg-slate-800 p-2 rounded-2xl shadow-2xl border border-slate-300/50 dark:border-slate-700/50">
            <div className="rounded-xl overflow-hidden bg-white dark:bg-card border border-slate-200 dark:border-slate-700 shadow-inner">
              <img
                src={App}
                alt="QuikNote Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
