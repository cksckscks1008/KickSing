import './Progress.css';

// 학습 개념 수와 완료율 표시
export default function Progress({ conceptCount, total, completed, icon }) {
  const percentage =
    total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

  const stats = [
    { label: '전체 개념', value: total },
    { label: '완료한 개념', value: completed },
    { label: '학습 진행률', value: `${percentage}%` },
  ];

  return (
    <div className="learning-progress">
      <div className="progress-summary">
        <div className="progress-heading">
          <div className="progress-icon">
            <img src={`/images/${icon}`} alt="" />
          </div>

          <h2>지금부터 쌓아갈 {conceptCount}개의 개념</h2>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-label="학습 진행률"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="progress-stats">
        {stats.map((stat) => (
          <div className="progress-stat" key={stat.label}>
            <p className="progress-value">{stat.value}</p>
            <p className="progress-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
