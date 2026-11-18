import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Page from "./pages/Page/Page";

const menus = [{ id: "Python", label: "Python" }];

export default function App() {
  const [activeId, setActiveId] = useState("Python");

  return (
    <div>
      <Navbar items={menus} activeId={activeId} onSelect={setActiveId} />
      <Page />
    </div>
  );
}
