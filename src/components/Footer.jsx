import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-6 border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-400">
          © 2024 QuikNote. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
            href="#"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
