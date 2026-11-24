import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Page from "./pages/Page/Page";

const menus = [{ id: "Python", label: "Python" }];

// 내비게이션과 학습 로드맵 표시
export default function App() {
  const [activeId, setActiveId] = useState("Python");

  return (
    <div>
      <Navbar items={menus} activeId={activeId} onSelect={setActiveId} />
      <Page />
    </div>
  );
}
