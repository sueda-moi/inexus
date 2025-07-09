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
  // const [isMobile, setIsMobile] = useState(false); // 移除或注释掉这个状态
  const pathname = usePathname();

  // 从 Zustand store 中获取 isMobileIframe 状态
  const isMobileIframe = useScreenSizeStore((state) => state.isMobileIframe);

  // 之前的 isMobile 相关的 useEffect 钩子可以移除，因为现在直接使用 isMobileIframe
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 860); // 这个逻辑将被 store 接管
  //   };
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // 保持滚动检测
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 当 isMobileIframe 变化且菜单打开时，关闭菜单
  useEffect(() => {
    // 假设当从手机模式切换到桌面模式时，如果菜单开着，应该关掉它
    // 或者当 isMobileIframe 发生变化时，统一管理菜单状态
    if (!isMobileIframe && isMenuOpen) { // 从手机模式切换到非手机模式时，如果菜单打开则关闭
        toggleMenu(); // 调用父组件传入的关闭菜单函数
    }
  }, [isMobileIframe, isMenuOpen, toggleMenu]); // 依赖项包含 isMobileIframe


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
            {/* 使用 isMobileIframe 来条件渲染 */}
            {!isMobileIframe && (
              <p className="company-name">
                <span>ネクサステクノロジー株式会社</span>
                <span>Shared ambition is vital nexus between us</span>
              </p>
            )}
          </div>

          {/* 使用 isMobileIframe 来条件渲染 */}
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
            {/* 使用 isMobileIframe 来条件渲染 */}
            {!isMobileIframe && <LanguageSwitcher scrolled={scrolled} />}
            {isMobileIframe && (
              <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <FiX size={28} /> : <FiAlignJustify size={28} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 移动端全屏菜单浮层 - 同样使用 isMobileIframe */}
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