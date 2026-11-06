import { useEffect, useRef, useState } from 'react';
import styles from './AddGoalModal.module.css';

export default function AddGoalModal({ onAdd, onClose }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const startedOutside = useRef(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  function isOutside(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom;
  }

  function submit(event) {
    event.preventDefault();
    if (title.trim()) onAdd(title.trim());
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby="add-goal-title"
      aria-describedby="add-goal-description"
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={event => { startedOutside.current = isOutside(event); }}
      onClick={event => {
        if (startedOutside.current && isOutside(event)) onClose();
      }}
    >
      <div className={styles.heading}>
        <h2 id="add-goal-title">나의 학습 목표 추가</h2>
        <button type="button" className={styles.close} aria-label="팝업 닫기" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <p id="add-goal-description" className={styles.description}>새롭게 쌓아갈 학습 목표를 적어주세요.</p>
      <form onSubmit={submit} className={styles.form}>
        <label htmlFor="goal-title">학습 목표 이름</label>
        <input ref={inputRef} id="goal-title" autoFocus placeholder="예: 웹 API 만들기" value={title}
          onChange={event => setTitle(event.target.value)} />
        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onClose}>취소</button>
          <button type="submit" className={styles.submit} disabled={!title.trim()}>추가</button>
        </div>
      </form>
    </dialog>
  );
}
