import pythonIcon from '../../assets/python.svg';
import logo from '../../assets/logo.svg';
import styles from './Header.module.css';

export default function Header({ darkMode, onToggleTheme }) {
  const themeLabel = darkMode ? '다크 모드 끄기' : '다크 모드 켜기';

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.brand} aria-label="차곡 홈">
          <span className={styles.brandMark} aria-hidden="true">
            <img className={styles.logo} src={logo} alt="" width="109" height="35" />
          </span>
          <span className={styles.brandName}>차곡.</span>
        </a>

        <nav className={styles.navigation} aria-label="학습 언어">
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index}
              className={`${styles.navItem} ${index === 2 ? styles.active : ''}`}
              type="button"
              aria-label={`Python 학습 ${index + 1}`}
              aria-current={index === 2 ? 'page' : undefined}
              disabled
            >
              <img src={pythonIcon} alt="" width="24" height="24" />
            </button>
          ))}
        </nav>

        <button
          className={styles.theme}
          type="button"
          onClick={onToggleTheme}
          aria-label={themeLabel}
          aria-pressed={darkMode}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            {darkMode ? (
              <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />
            ) : (
              <>
                <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
              </>
            )}
          </svg>
          <span>{darkMode ? 'ON' : 'OFF'}</span>
        </button>
      </div>
    </header>
  );
}
