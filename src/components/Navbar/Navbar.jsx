import { useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

// 학습 메뉴와 테마 전환 버튼 표시
export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(3);

  return (
    <nav className="navbar" aria-label="상단 네비게이션">
      <div className="navbar-inner">
        <a className="navbar-brand" href="/" aria-label="차곡 홈">
          <img className="brand-light" src="/images/chagok-logo.svg" alt="차곡" />
          <img className="brand-dark" src="/images/chagok-logo-dark.svg" alt="차곡" />
        </a>
        <div className="navbar-menu">
          {[1, 2, 3, 4, 5].map((id) => (
            <button
              key={id}
              type="button"
              className="navbar-block"
              aria-label={`학습 메뉴 ${id}`}
              aria-pressed={activeMenu === id}
              onClick={() => setActiveMenu(id)}
            >
              <img src="/images/python-logo.svg" alt="" />
            </button>
          ))}
        </div>
        <div className="navbar-right">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
