import { useState } from 'react';
import styles from './CurriculumCard.module.css';

export default function CurriculumCard({
  chapter,
  completedIds,
  onToggleLesson,
  onAddLesson,
  onRemoveLesson,
  onRemoveChapter,
}) {
  const [open, setOpen] = useState(false);
  const [addingLesson, setAddingLesson] = useState(false);
  const [lessonTitle, setLessonTitle] = useState('');
  const completed = chapter.lessons.filter(lesson => completedIds.has(lesson.id)).length;
  const panelId = `${chapter.id}-panel`;

  function submitLesson(event) {
    event.preventDefault();
    const title = lessonTitle.trim();
    if (!title) return;

    onAddLesson(chapter.id, title);
    setLessonTitle('');
    setAddingLesson(false);
  }

  function cancelLesson() {
    setAddingLesson(false);
  }

  return (
    <article className={styles.card}>
      <div className={styles.heading}>
        <button
          className={styles.toggle}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(value => !value)}
        >
          <span className={styles.number}>{chapter.number}</span>
          <span className={styles.title}>{chapter.title}</span>
          <span className={styles.count}>
            {completed} / {chapter.lessons.length}개 완료
          </span>
          <svg
            className={`${styles.chevron} ${open ? styles.rotated : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="m5 9 7 7 7-7" />
          </svg>
        </button>
        <button
          className={styles.removeChapter}
          type="button"
          onClick={() => onRemoveChapter(chapter.id)}
          aria-label={`${chapter.title} 삭제`}
          title="목표 삭제"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" />
          </svg>
        </button>
      </div>

      <div id={panelId} hidden={!open} className={styles.panel}>
        <div className={styles.lessons}>
          {chapter.lessons.map(lesson => (
            <div className={styles.lessonRow} key={lesson.id}>
              <label className={styles.lesson}>
                <input
                  type="checkbox"
                  checked={completedIds.has(lesson.id)}
                  onChange={() => onToggleLesson(lesson.id)}
                />
                <span>{lesson.title}</span>
              </label>
              <button
                className={styles.removeLesson}
                type="button"
                onClick={() => onRemoveLesson(chapter.id, lesson.id)}
                aria-label={`${lesson.title} 삭제`}
                title="항목 삭제"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {addingLesson ? (
          <form className={styles.lessonForm} onSubmit={submitLesson}>
            <input
              autoFocus
              aria-label="새 학습 항목"
              placeholder="학습 항목 이름"
              value={lessonTitle}
              onChange={event => setLessonTitle(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Escape') cancelLesson();
              }}
            />
            <button type="submit" disabled={!lessonTitle.trim()} aria-label="항목 추가">
              추가
            </button>
            <button type="button" className={styles.cancel} onClick={cancelLesson}>
              취소
            </button>
          </form>
        ) : (
          <button
            className={styles.addLesson}
            type="button"
            onClick={() => setAddingLesson(true)}
            aria-label={`${chapter.title}에 학습 항목 추가`}
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
}
