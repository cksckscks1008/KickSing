import { useEffect, useState } from "react";
import Progress from "../../components/Progress/Progress";
import Card from "../../components/Card/Card";
import AddGoal from "../../components/AddGoal/AddGoal";
import initCards from "../../data/roadmap";
import "./Page.css";

const storageKey = "charsing-cards";

// 저장된 카드를 불러오고 읽기 실패 시 기본 목록 사용
function loadCards() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));

    if (Array.isArray(saved) && saved.every((card) => Array.isArray(card?.items))) {
      return saved;
    }
  } catch {
    return initCards;
  }

  return initCards;
}

// 학습 카드 목록과 전체 진행 상태 관리
export default function Page() {
  const [cards, setCards] = useState(loadCards);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(cards));
    } catch (error) {
      console.warn("학습 목표를 저장하지 못했습니다.", error);
    }
  }, [cards]);

  const allItems = cards.flatMap((card) => card.items);
  const total = allItems.length;
  const completed = allItems.filter((item) => item.completed).length;

  // 목록 끝에 빈 학습 목표 카드 추가
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

  // 선택한 학습 개념의 완료 상태 변경
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

  // 지정한 카드에 미완료 학습 개념 추가
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

  // 지정한 카드에서 선택한 학습 개념 삭제
  function deleteItem(cardId, itemId) {
    setCards((previous) =>
      previous.map((card) =>
        card.id === cardId
          ? { ...card, items: card.items.filter((item) => item.id !== itemId) }
          : card,
      ),
    );
  }

  // 선택한 학습 목표 카드 삭제
  function deleteCard(cardId) {
    setCards((previous) => previous.filter((card) => card.id !== cardId));
  }

  // 선택한 학습 목표 카드의 제목 변경
  function renameCard(cardId, title) {
    setCards((previous) =>
      previous.map((card) => card.id === cardId ? { ...card, title } : card),
    );
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
            onRename={(title) => renameCard(card.id, title)}
          />
        ))}
      </div>
    </div>
  );
}
