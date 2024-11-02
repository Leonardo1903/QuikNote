import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Ideas", "Tasks", "Goals"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 overflow-hidden">
      <div className="container mx-auto relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-start space-y-4 text-left md:w-1/2 z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              Capture Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {words[currentWord]}
              </span>
            </h1>
            <p className="max-w-[600px] text-gray-400 md:text-xl">
              Quiknote: The fastest way to jot down ideas, make lists, and
              organize your life. Seamless sync across all your devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                asChild
              >
                <Link href="#cta">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-600 text-purple-400 hover:bg-purple-600/10"
                asChild
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute top-0 -right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
            <div className="relative space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`bg-gray-800 p-4 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform duration-300 ease-in-out ${
                    i % 2 === 0 ? "rotate-2" : "-rotate-2"
                  }`}
                  style={{
                    animationDelay: `${i * 200}ms`,
                  }}
                >
                  <h3
                    className={`text-lg font-semibold ${
                      i === 0
                        ? "text-purple-400"
                        : i === 1
                        ? "text-pink-400"
                        : "text-blue-400"
                    }`}
                  >
                    {i === 0
                      ? "Project Ideas"
                      : i === 1
                      ? "Daily Tasks"
                      : "Long-term Goals"}
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>
                      •{" "}
                      {i === 0
                        ? "Brainstorm new features"
                        : i === 1
                        ? "Review project timeline"
                        : "Learn a new language"}
                    </li>
                    <li>
                      •{" "}
                      {i === 0
                        ? "Sketch UI mockups"
                        : i === 1
                        ? "Team meeting at 2 PM"
                        : "Travel to Japan"}
                    </li>
                    <li>
                      •{" "}
                      {i === 0
                        ? "Research competitors"
                        : i === 1
                        ? "Prepare presentation"
                        : "Start a side business"}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
