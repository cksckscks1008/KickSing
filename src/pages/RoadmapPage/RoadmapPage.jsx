import { useEffect, useState } from 'react';
import CurriculumCard from '../../components/CurriculumCard/CurriculumCard.jsx';
import Header from '../../components/Header/Header.jsx';
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary.jsx';
import { curriculum, roadmap } from '../../data/curriculum.js';
import styles from './RoadmapPage.module.css';

const STORAGE_KEY = 'chagok-roadmap-v1';
const emptyRoadmap = { chapters: curriculum, completedIds: [], darkMode: false };

function loadRoadmap() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.chapters) && Array.isArray(saved.completedIds)) {
      return saved;
    }
  } catch {
    return emptyRoadmap;
  }

  return emptyRoadmap;
}

export default function RoadmapPage() {
  const [saved] = useState(loadRoadmap);
  const [chapters, setChapters] = useState(saved.chapters);
  const [completedIds, setCompletedIds] = useState(() => new Set(saved.completedIds));
  const [darkMode, setDarkMode] = useState(Boolean(saved.darkMode));
  const [addingGoal, setAddingGoal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');

  const lessons = chapters.flatMap(chapter => chapter.lessons);
  const completedCount = lessons.filter(lesson => completedIds.has(lesson.id)).length;

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ chapters, completedIds: [...completedIds], darkMode }),
      );
    } catch {
      // Saving is optional; the current session still works without it.
    }
  }, [chapters, completedIds, darkMode]);

  function toggleLesson(id) {
    setCompletedIds(previous => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function addGoal() {
    const title = goalTitle.trim();
    if (!title) return;

    setChapters(previous => {
      const nextNumber = Math.max(
        0,
        ...previous.map(chapter => Number(chapter.number) || 0),
      ) + 1;
      const chapter = {
        id: `goal-${Date.now()}`,
        number: String(nextNumber).padStart(2, '0'),
        title,
        lessons: [],
      };

      return [...previous, chapter];
    });
    setGoalTitle('');
    setAddingGoal(false);
  }

  function removeChapter(chapterId) {
    setChapters(previous => previous.filter(chapter => chapter.id !== chapterId));
    setCompletedIds(previous => {
      const remaining = [...previous].filter(lessonId => !lessonId.startsWith(`${chapterId}-`));
      return new Set(remaining);
    });
  }

  function addLesson(chapterId, title) {
    setChapters(previous => previous.map(chapter => {
      if (chapter.id !== chapterId) return chapter;

      const lesson = {
        id: `${chapterId}-lesson-${Date.now()}`,
        title,
      };

      return { ...chapter, lessons: [...chapter.lessons, lesson] };
    }));
  }

  function removeLesson(chapterId, lessonId) {
    setChapters(previous => previous.map(chapter => {
      if (chapter.id !== chapterId) return chapter;
      return {
        ...chapter,
        lessons: chapter.lessons.filter(lesson => lesson.id !== lessonId),
      };
    }));

    setCompletedIds(previous => {
      const next = new Set(previous);
      next.delete(lessonId);
      return next;
    });
  }

  function submitGoal(event) {
    event.preventDefault();
    addGoal();
  }

  return (
    <div className={styles.page}>
      <Header darkMode={darkMode} onToggleTheme={() => setDarkMode(value => !value)} />
      <main className={styles.main}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{roadmap.title}</h1>
          <button
            className={styles.addGoal}
            type="button"
            onClick={() => setAddingGoal(value => !value)}
            aria-expanded={addingGoal}
            aria-controls="add-goal-panel"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v10M7 12h10" />
            </svg>
            나의 학습 목표 추가
          </button>
        </div>

        {addingGoal && (
          <form id="add-goal-panel" className={styles.goalForm} onSubmit={submitGoal}>
            <input
              autoFocus
              aria-label="추가할 학습 목표"
              placeholder="예: 웹 API 만들기"
              value={goalTitle}
              onChange={event => setGoalTitle(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Escape') setAddingGoal(false);
              }}
            />
            <button type="submit" disabled={!goalTitle.trim()}>
              추가
            </button>
            <button
              className={styles.cancel}
              type="button"
              onClick={() => setAddingGoal(false)}
            >
              취소
            </button>
          </form>
        )}

        <ProgressSummary completed={completedCount} total={lessons.length} />

        <section className={styles.curriculum} aria-labelledby="curriculum-title">
          <h2 id="curriculum-title" className={styles.sectionTitle}>커리큘럼</h2>
          <div className={styles.grid}>
            {chapters.map(chapter => (
              <CurriculumCard
                key={chapter.id}
                chapter={chapter}
                completedIds={completedIds}
                onToggleLesson={toggleLesson}
                onAddLesson={addLesson}
                onRemoveLesson={removeLesson}
                onRemoveChapter={removeChapter}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
