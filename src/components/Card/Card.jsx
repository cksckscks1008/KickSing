import { useId, useState } from 'react';
import './Card.css';

export default function Card({ number, title, items, onToggle, onAdd, onDeleteItem, onDelete, onRename }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const contentId = useId();
  const completed = items.filter((item) => item.completed).length;

  function closeInput() {
    setNewTitle('');
    setIsAdding(false);
  }

  function submitItem() {
    if (!newTitle.trim()) return;
    onAdd(newTitle.trim());
    closeInput();
  }

  return (
    <div className="learning-card">
      <div className="card-header">
        <div className="card-number">{String(number).padStart(2, '0')}</div>
        {isEditingTitle ? (
          <input
            className="card-title card-title-input"
            aria-label="학습 목표 제목"
            defaultValue={title}
            autoFocus
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing || event.keyCode === 229) return;
              if (event.key === 'Escape') setIsEditingTitle(false);
              if (event.key !== 'Enter') return;

              const nextTitle = event.currentTarget.value.trim();
              if (!nextTitle) return;
              onRename(nextTitle);
              setIsEditingTitle(false);
            }}
          />
        ) : (
          <div className="card-title">{title}</div>
        )}
        <div className="card-count">{completed} / {items.length}개 완료</div>
        <button type="button" className="card-highlight" aria-label="제목 수정" onClick={() => setIsEditingTitle(true)} />
        <button type="button" className="card-delete" aria-label={`${title} 삭제`} onClick={onDelete}>
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
              <input
                type="checkbox"
                aria-label={item.title}
                checked={item.completed}
                onChange={() => onToggle(item.id)}
              />
              <div className="card-item-title">{item.title}</div>
              <button type="button" className="card-item-delete" aria-label={`${item.title} 삭제`} onClick={() => onDeleteItem(item.id)}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <circle cx="10" cy="10" r="7" />
                  <path d="m7.5 7.5 5 5m0-5-5 5" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        {isAdding && (
          <div className="card-item-editor">
            <input
              type="text"
              aria-label="추가할 학습 개념"
              placeholder="학습 개념을 입력하세요"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing || event.keyCode === 229) return;
                if (event.key === 'Enter') {
                  event.preventDefault();
                  submitItem();
                }
                if (event.key === 'Escape') closeInput();
              }}
              autoFocus
            />
            <div className="card-editor-actions">
              <button type="button" onClick={submitItem}>추가</button>
              <button type="button" onClick={closeInput}>취소</button>
            </div>
          </div>
        )}
        <button type="button" className="card-add" aria-label={`${title} 항목 추가`} onClick={() => setIsAdding(true)} hidden={isAdding}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M14 2v24M2 14h24" />
          </svg>
        </button>
      </div>
    </div>
  );
}
