import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

const menus = [
  { id: 1, language: 'C', icon: 'c.svg' },
  { id: 2, language: 'Java', icon: 'java.svg' },
  { id: 3, language: 'Python', icon: 'python-logo.svg' },
  { id: 4, language: 'JavaScript', icon: 'js.svg' },
  { id: 5, language: 'Python', icon: 'python-logo.svg' },
];

// 학습 메뉴와 테마 전환 버튼 표시
export default function Navbar({ language: activeLanguage }) {
  return (
    <nav className="navbar" aria-label="상단 네비게이션">
      <div className="navbar-inner">
        <a className="navbar-brand" href="/" aria-label="차곡 홈">
          <img className="brand-light" src="/images/chagok-logo.svg" alt="차곡" />
          <img className="brand-dark" src="/images/chagok-logo-dark.svg" alt="차곡" />
        </a>
        <div className="navbar-menu">
          {menus.map(({ id, language, icon }) => (
            <a
              key={id}
              href={`#${language.toLowerCase()}`}
              className="navbar-block"
              aria-label={`${language} 학습 메뉴 ${id}`}
              aria-current={activeLanguage === language.toLowerCase() && id !== 5 ? 'page' : undefined}
            >
              <img src={`/images/${icon}`} alt="" />
            </a>
          ))}
        </div>
        <div className="navbar-right">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
