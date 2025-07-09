// components/Header.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import { useMessage } from '@/lib/useMessage';
import './Header.css';
import { useScreenSizeStore } from '@/store/useScreenSizeStore';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu }) => {
  const getMessage = useMessage(); // メッセージ取得関数を使用

  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // 从 Zustand store 中获取 isMobileIframe 状态
  const isMobileIframe = useScreenSizeStore((state) => state.isMobileIframe);

  // 保持滚动检测
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    if (!isMobileIframe && isMenuOpen) {
      toggleMenu();
    }
  }, [isMobileIframe, isMenuOpen, toggleMenu]);

  const [initialPathname, setInitialPathname] = useState(pathname); 

  useEffect(() => {
    if (isMobileIframe && isMenuOpen && pathname !== initialPathname) {
      toggleMenu();
    }
    setInitialPathname(pathname);
  }, [pathname, isMobileIframe, isMenuOpen, toggleMenu, initialPathname]);


  const navItems = [
    { path: '/Pg001', label: getMessage('Pg001', 'nav_pg001') },
    { path: '/Pg002', label: getMessage('Pg001', 'nav_pg002') },
    { path: '/Pg003', label: getMessage('Pg001', 'nav_pg003') },
    { path: '/Pg004', label: getMessage('Pg001', 'nav_pg004') },
    { path: '/Pg005', label: getMessage('Pg001', 'nav_pg005') },
    // { path: '/Pg006', label: getMessage('Pg001', 'nav_pg006') },
  ];

  return (
    <>
      <header className={`custom-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="custom-header-inner">
          <div className="logo-group">
            <Image src="/image/headerImg.png" alt="Logo" width={40} height={40} />
            {/* 使用 isMobileIframe 来条件渲染公司名称 */}
            {!isMobileIframe && (
              <p className="company-name">
                <span>ネクサステクノロジー株式会社</span>
                <span>Shared ambition is vital nexus between us</span>
              </p>
            )}
          </div>

          {/* 桌面端导航菜单，使用 isMobileIframe 来条件渲染 */}
          {!isMobileIframe && (
            <nav className="nav-menu">
              {navItems.map((item) =>
                pathname === item.path ? (
                  <span key={item.path} className="nav-item active">
                    {item.label}
                  </span>
                ) : (
                  <Link key={item.path} href={item.path} className="nav-item">
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          )}

          <div className="header-right">
            {/* 桌面端语言切换器 */}
            {!isMobileIframe && <LanguageSwitcher scrolled={scrolled} />}
            {/* 手机端菜单切换按钮 */}
            {isMobileIframe && (
              <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <FiX size={28} /> : <FiAlignJustify size={28} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 移动端全屏菜单浮层 - 仅在手机模式且菜单打开时显示 */}
      {isMobileIframe && isMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            <nav className="mobile-nav-menu">
              {navItems.map((item) =>
                pathname === item.path ? (
                  <span key={item.path} className="nav-item active">
                    {item.label}
                  </span>
                ) : (
                  <Link key={item.path} href={item.path} className="nav-item">
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="mobile-language-switcher">
              <LanguageSwitcher scrolled={false} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;