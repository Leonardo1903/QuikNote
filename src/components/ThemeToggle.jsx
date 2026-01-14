import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/themeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={handleToggle}>
      <Sun
        className={
          "h-[1.2rem] w-[1.2rem] transition-all " +
          (theme === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0")
        }
      />
      <Moon
        className={
          "absolute h-[1.2rem] w-[1.2rem] transition-all " +
          (theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90")
        }
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
