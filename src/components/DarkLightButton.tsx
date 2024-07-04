import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function DarkLightButton() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark") === "true",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <Button
      size="icon"
      onClick={() => setIsDark(!isDark)}
      className="absolute top-2 left-2"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
