import { Brain, History, RefreshCw } from "lucide-react";

export default function Benefits() {
  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-background" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Why Choose QuikNote?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Designed for thinkers who need to move as fast as their ideas,
            offering a seamless bridge between thought and digital record.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="bg-white dark:bg-card size-16 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto text-primary">
              <Brain size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Clutter-Free Mind
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Focus on what matters. Our minimalist UI removes distractions so
              your ideas can flow freely.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="bg-white dark:bg-card size-16 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto text-primary">
              <History size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Instant Retrieval
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Never lose a thought again. Access your entire history with a
              single shortcut command.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="bg-white dark:bg-card size-16 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto text-primary">
              <RefreshCw size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Cross-Platform Sync
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Available on web, desktop, and mobile. Your notes are always
              encrypted and perfectly in sync.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
