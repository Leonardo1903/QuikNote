import Logo from "../../public/Logo.png";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 opacity-60">
          <img src={Logo} alt="QuikNote" className="w-24" />
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <a className="hover:text-primary transition-colors" href="#">
            Privacy
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Terms
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Twitter
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            LinkedIn
          </a>
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-sm">
          © 2026 QuikNote. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
