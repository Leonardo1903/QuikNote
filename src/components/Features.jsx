import { FileEdit, Zap, Search, BookOpen } from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-card" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Everything you need, nothing you don't
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Built for speed, refined for clarity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
          {/* Dynamic Note Cards */}
          <div className="md:col-span-8 bg-white dark:bg-card border border-slate-200/60 dark:border-slate-700 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <FileEdit className="text-primary w-10 h-10 mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                Dynamic Note Cards
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                Experience text-based speed and clarity with a clean, minimalist
                design for distraction-free writing. Our structured Smart Card
                system replaces messy sticky notes forever.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 h-full bg-slate-50 dark:bg-slate-900 border-l border-t border-slate-100 dark:border-slate-700 rounded-tl-3xl translate-y-12 translate-x-12 group-hover:translate-y-8 group-hover:translate-x-8 transition-transform p-6">
              <div className="space-y-2">
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-2 w-1/2 bg-primary/20 rounded"></div>
              </div>
            </div>
          </div>

          {/* Instant Performance */}
          <div className="md:col-span-4 bg-white dark:bg-card border border-slate-200/60 dark:border-slate-700 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-end">
            <Zap className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Instant Performance</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Engineered for sub-100ms response times. Your writing experience
              feels local, even on the web.
            </p>
          </div>

          {/* Instant Search */}
          <div className="md:col-span-4 bg-white dark:bg-card border border-slate-200/60 dark:border-slate-700 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-end">
            <Search className="text-primary w-10 h-10 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
              Instant Search
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Find any note or notebook in milliseconds. Access your entire
              brain with lightning-fast global hotkey support.
            </p>
          </div>

          {/* Smart Notebooks */}
          <div className="md:col-span-8 bg-white dark:bg-card border border-slate-200/60 dark:border-slate-700 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <BookOpen className="text-primary w-10 h-10 mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                Smart Notebooks
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                Organize notes into structured collections with custom metadata
                and streamlined navigation for professional workflows.
              </p>
            </div>
            <div className="absolute -bottom-6 right-10 flex gap-4">
              <div className="w-28 h-36 bg-white dark:bg-card border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform p-4 flex flex-col gap-2">
                <div className="h-1.5 w-1/2 bg-slate-100 dark:bg-slate-700 rounded"></div>
                <div className="h-1 w-full bg-slate-50 dark:bg-slate-800 rounded"></div>
                <div className="h-1 w-full bg-slate-50 dark:bg-slate-800 rounded"></div>
                <div className="mt-auto h-3 w-full bg-primary/10 rounded flex items-center px-1">
                  <div className="h-1 w-2 bg-primary/30 rounded"></div>
                </div>
              </div>
              <div className="w-28 h-36 bg-white dark:bg-card border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg -rotate-6 group-hover:rotate-0 transition-transform p-4 flex flex-col gap-2">
                <div className="h-1.5 w-2/3 bg-slate-100 dark:bg-slate-700 rounded"></div>
                <div className="h-1 w-full bg-slate-50 dark:bg-slate-800 rounded"></div>
                <div className="h-1 w-full bg-slate-50 dark:bg-slate-800 rounded"></div>
                <div className="mt-auto h-3 w-full bg-primary/10 rounded flex items-center px-1">
                  <div className="h-1 w-3 bg-primary/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
