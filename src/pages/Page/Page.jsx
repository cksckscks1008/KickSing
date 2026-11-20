import { useState } from "react";
import Progress from "../../components/Progress/Progress";
import Card from "../../components/Card/Card";
import AddGoal from "../../components/AddGoal/AddGoal";
import initCards from "../../data/roadmap";
import "./Page.css";

export default function Page() {
  const [cards, setCards] = useState(initCards);

  const allItems = cards.flatMap((card) => card.items);
  const total = allItems.length;
  const completed = allItems.filter((item) => item.completed).length;

  function toggleItem(cardId, itemId) {
    setCards((previous) =>
      previous.map((card) =>
        card.id === cardId
          ? {
              ...card,
              items: card.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item,
              ),
            }
          : card,
      ),
    );
  }

  return (
    <div className="roadmap-page">
      <div className="roadmap-heading">
        <h1>언어 학습 로드맵</h1>
        <AddGoal />
      </div>

      <Progress conceptCount={total} total={total} completed={completed} />
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            onToggle={(itemId) => toggleItem(card.id, itemId)}
          />
        ))}
      </div>
    </div>
  );
}
