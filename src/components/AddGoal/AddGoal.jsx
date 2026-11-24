import './AddGoal.css';

// 학습 목표 추가 버튼 표시
export default function AddGoal({ onAdd }) {
  return (
    <button type="button" className="add-goal" onClick={onAdd}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M7 12h10" />
      </svg>
      나의 학습 목표 추가
    </button>
  );
}
