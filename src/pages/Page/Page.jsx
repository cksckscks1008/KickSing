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

  function addGoal() {
    const id = crypto.randomUUID();

    setCards((previous) => [
      ...previous,
      {
        id,
        number: Math.max(0, ...previous.map((card) => card.number)) + 1,
        title: "새 학습 목표",
        items: [],
      },
    ]);
  }

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

  function addItem(cardId, title) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const item = { id: crypto.randomUUID(), title: trimmedTitle, completed: false };
    setCards((previous) =>
      previous.map((card) =>
        card.id === cardId ? { ...card, items: [...card.items, item] } : card,
      ),
    );
  }

  function deleteItem(cardId, itemId) {
    setCards((previous) =>
      previous.map((card) =>
        card.id === cardId
          ? { ...card, items: card.items.filter((item) => item.id !== itemId) }
          : card,
      ),
    );
  }

  function deleteCard(cardId) {
    setCards((previous) => previous.filter((card) => card.id !== cardId));
  }

  return (
    <div className="roadmap-page">
      <div className="roadmap-heading">
        <h1>언어 학습 로드맵</h1>
        <AddGoal onAdd={addGoal} />
      </div>

      <Progress conceptCount={total} total={total} completed={completed} />
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            onToggle={(itemId) => toggleItem(card.id, itemId)}
            onAdd={(title) => addItem(card.id, title)}
            onDeleteItem={(itemId) => deleteItem(card.id, itemId)}
            onDelete={() => deleteCard(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
