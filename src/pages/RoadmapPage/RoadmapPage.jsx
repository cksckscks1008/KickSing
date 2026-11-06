import { useEffect, useState } from 'react';
import CurriculumCard from '../../components/CurriculumCard/CurriculumCard.jsx';
import Header from '../../components/Header/Header.jsx';
import AddGoalModal from '../../components/AddGoalModal/AddGoalModal.jsx';
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary.jsx';
import { curriculum, roadmap } from '../../data/curriculum.js';
import styles from './RoadmapPage.module.css';

const STORAGE_KEY = 'chagok-language-roadmap-v1';
const emptyRoadmap = { chapters: curriculum, completedIds: [], darkMode: false };

function loadRoadmap() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem('chagok-roadmap-v1'),
    );
    if (saved && Array.isArray(saved.chapters) && Array.isArray(saved.completedIds)) {
      // 기존 진행 상황과 사용자 편집은 유지하고 새 기본 항목만 한 번 추가합니다.
      if (saved.curriculumVersion !== 2) {
        const previousCounts = [8, 9, 9, 9, 8, 8];
        saved.chapters = saved.chapters.map(chapter => {
          const index = curriculum.findIndex(item => item.id === chapter.id);
          if (index === -1) return chapter;
          const newLessons = curriculum[index].lessons.slice(previousCounts[index]);
          return {
            ...chapter,
            lessons: [
              ...chapter.lessons,
              ...newLessons.filter(lesson => !chapter.lessons.some(item => item.id === lesson.id)),
            ],
          };
        });
      }
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

  const lessons = chapters.flatMap(chapter => chapter.lessons);
  const completedCount = lessons.filter(lesson => completedIds.has(lesson.id)).length;

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ curriculumVersion: 2, chapters, completedIds: [...completedIds], darkMode }),
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

  function addGoal(goalTitle) {
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

  return (
    <div className={styles.page}>
      <Header darkMode={darkMode} onToggleTheme={() => setDarkMode(value => !value)} />
      <main className={styles.main}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{roadmap.title}</h1>
          <button
            className={styles.addGoal}
            type="button"
            onClick={() => setAddingGoal(true)}
            aria-expanded={addingGoal}
            aria-haspopup="dialog"
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
          <AddGoalModal onAdd={addGoal} onClose={() => setAddingGoal(false)} />
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
