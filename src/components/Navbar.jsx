import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 backdrop-blur-sm bg-gray-900/80 z-50 border-b border-gray-800">
      <Link className="flex items-center justify-center" href="#">
        <img src={Logo} alt="Logo" className="h-20" />
        <span className=" text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          QuikNote
        </span>
      </Link>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:text-purple-400 transition-colors"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:text-purple-400 transition-colors"
          href="#benefits"
        >
          Benefits
        </Link>
        <Link
          className="text-sm font-medium hover:text-purple-400 transition-colors"
          href="#cta"
        >
          Get Started
        </Link>
      </nav>
      <Button variant="ghost" size="icon" className="ml-auto md:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </header>
  );
}
