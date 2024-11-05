import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 backdrop-blur-sm bg-gray-900/80 z-50 border-b border-border">
      <Link className="flex items-center justify-center" to="/">
        <img src={Logo} alt="QuikNote Logo" className="h-20" />
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          QuikNote
        </span>
      </Link>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <a
          className="text-sm font-medium hover:text-purple-400 transition-colors"
          href="#features"
        >
          Features
        </a>
        <a
          className="text-sm font-medium hover:text-purple-400 transition-colors"
          href="#benefits"
        >
          Benefits
        </a>
        <Link
          className="text-sm font-medium hover:text-purple-400 transition-colors"
          to="/signup"
        >
          Get Started
        </Link>
      </nav>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-auto md:hidden">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[200px] md:hidden bg-gray-800 border border-gray-700 rounded-md shadow-lg"
        >
          <DropdownMenuItem asChild>
            <Link
              className="block px-4 py-2 text-sm font-medium text-gray-200 hover:text-purple-400 transition-colors"
              to="#features"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="block px-4 py-2 text-sm font-medium text-gray-200 hover:text-purple-400 transition-colors"
              to="#benefits"
              onClick={() => setIsOpen(false)}
            >
              Benefits
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="block px-4 py-2 text-sm font-medium text-gray-200 hover:text-purple-400 transition-colors"
              to="#cta"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
