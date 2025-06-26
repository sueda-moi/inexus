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

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu }) => {

  const getMessage = useMessage(); // メッセージ取得関数を使用

  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false); //screen width detection 
  const pathname = usePathname();

  useEffect(() => {
    if (isMobile && isMenuOpen) {
      toggleMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 👇 2. screen width detection 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 860);
    };
    handleResize(); // init first time set up
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // const navItems = [
  //   { path: '/Pg001', label: 'ホーム' },
  //   { path: '/Pg002', label: 'ネクサスの強み' },
  //   { path: '/Pg003', label: '企業情報' },
  //   { path: '/Pg004', label: '事業内容' },
  //   { path: '/Pg005', label: お問い合わせ},
  // { path: '/Pg006', label: 社内掲示板 },
  // ];
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


            {!isMobile && <p className="company-name">
              <span>ネクサステクノロジー株式会社</span>
              <span>Shared ambition is vital nexus between us</span>
            </p>}
          </div>

          {!isMobile && (
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
            {!isMobile && <LanguageSwitcher scrolled={scrolled} />}
            {isMobile && (
              <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <FiX size={28} /> : <FiAlignJustify size={28} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 移动端全屏菜单浮层 */}
      {isMobile && isMenuOpen && (
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
