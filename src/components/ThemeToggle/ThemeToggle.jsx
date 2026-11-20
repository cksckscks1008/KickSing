import { useEffect, useState } from "react";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.dataset.theme === "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="다크 모드"
      aria-pressed={isDark}
      onClick={() => setIsDark((previous) => !previous)}
    >
      <img
        className="theme-toggle-icon"
        src={isDark ? "/images/theme-moon.svg" : "/images/theme-sun.svg"}
        alt=""
      />
    </button>
  );
}
