import pythonIcon from '../../assets/python.svg';
import styles from './ProgressSummary.module.css';

export default function ProgressSummary({ completed, total }) {
  const percent = total ? Math.round((completed / total) * 100) : 0;

  return (
    <section className={styles.summary} aria-label="학습 현황">
      <div className={styles.overview}>
        <div className={styles.heading}>
          <div className={styles.icon}>
            <img src={pythonIcon} alt="" width="32" height="32" />
          </div>
          <div className={styles.summaryTitle}>지금부터 쌓아갈 {total}개의 개념</div>
        </div>
        <div
          className={styles.track}
          role="progressbar"
          aria-label="학습 진행률"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
      </div>

      <dl className={styles.stats} aria-live="polite">
        <div>
          <dt className={styles.statLabel}>완료한 개념</dt>
          <dd className={styles.statValue}>{completed}</dd>
        </div>
        <div>
          <dt className={styles.statLabel}>전체 개념</dt>
          <dd className={styles.statValue}>{total}</dd>
        </div>
        <div>
          <dt className={styles.statLabel}>학습 진행률</dt>
          <dd className={styles.statValue}>{percent}%</dd>
        </div>
      </dl>
    </section>
  );
}
