import { useId, useState } from 'react';
import './Card.css';

export default function Card({ number, title, items, total = items.length }) {
  const [isOpen, setIsOpen] = useState(true);
  const contentId = useId();

  return (
    <div className="learning-card">
      <div className="card-header">
        <div className="card-number">{String(number).padStart(2, '0')}</div>
        <div className="card-title">{title}</div>
        <div className="card-count">0 / {total}개 완료</div>
        <button type="button" className="card-delete" aria-label={`${title} 삭제`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7" />
          </svg>
        </button>
        <button
          type="button"
          className="card-toggle"
          aria-label={`${title} ${isOpen ? '접기' : '펼치기'}`}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen((previous) => !previous)}
        >
          <div className="card-chevron" aria-hidden="true" />
        </button>
      </div>

      <div id={contentId} className="card-content" hidden={!isOpen}>
        <div className="card-list">
          {items.map((item) => (
            <div className="card-item" key={item.id}>
              <input type="checkbox" aria-label={item.title} />
              <div className="card-item-title">{item.title}</div>
              <button type="button" className="card-item-delete" aria-label={`${item.title} 삭제`}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <circle cx="10" cy="10" r="7" />
                  <path d="m7.5 7.5 5 5m0-5-5 5" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="card-add" aria-label={`${title} 항목 추가`}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M14 2v24M2 14h24" />
          </svg>
        </button>
      </div>
    </div>
  );
}
