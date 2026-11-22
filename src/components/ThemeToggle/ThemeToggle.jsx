import { useEffect, useState } from "react";
import "./ThemeToggle.css";

const themeKey = "charsing-theme";

function loadTheme() {
  try {
    return localStorage.getItem(themeKey) === "dark";
  } catch {
    return false;
  }
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(loadTheme);

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem(themeKey, theme);
    } catch (error) {
      console.warn("테마를 저장하지 못했습니다.", error);
    }
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
