import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Page from "./pages/Page/Page";

const languages = {
  c: { name: "C", icon: "c.svg" },
  java: { name: "Java", icon: "java.svg" },
  python: { name: "Python", icon: "python-logo.svg" },
  javascript: { name: "JavaScript", icon: "js.svg" },
};

function getLanguage() {
  const key = window.location.hash.slice(1);
  return Object.hasOwn(languages, key) ? key : "python";
}

// 내비게이션과 학습 로드맵 표시
export default function App() {
  const [language, setLanguage] = useState(getLanguage);

  useEffect(() => {
    function syncLanguage() {
      setLanguage(getLanguage());
    }

    window.addEventListener("hashchange", syncLanguage);
    syncLanguage();
    return () => window.removeEventListener("hashchange", syncLanguage);
  }, []);

  return (
    <div>
      <Navbar language={language} />
      <Page key={language} language={language} {...languages[language]} />
    </div>
  );
}
