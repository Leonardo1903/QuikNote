import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto bg-primary rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to organize your mind?
          </h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto font-medium">
            Join 50,000+ creators and thinkers using QuikNote to turn chaos into
            clarity.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-primary px-10 py-5 rounded-2xl font-extrabold text-xl shadow-lg hover:bg-slate-50 hover:scale-105 transition-all"
          >
            Join QuikNote for Free
          </Link>
        </div>
      </div>
    </section>
  );
}
