'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
//import Image from 'next/image';
//import { usePathname } from 'next/navigation'; // 現在のパスを取得するためのフック
//import { useTranslation } from 'react-i18next';
import { useMessage } from '@/lib/useMessage';


interface FooterProps {
  floating?: boolean;
}

const Footer: React.FC<FooterProps> = ({ floating = false }) => {

  // const { messages } = useLocaleStore();
  // const footerMessages = messages['footer'];
  const getMessage = useMessage();// メッセージ取得関数を使用
  // const { t } = useTranslation('footer');
  const [scrolled, setScrolled] = useState(false);
  //const pathname = usePathname(); // 現在のページのパスを取得
  //const isPg001 = pathname === '/Pg001'; // パスが /Pg001 かどうかを判定

  //const { t } = useTranslation('common');

  // スクロールイベントを監視し、スクロール位置が50pxを超えたら状態を更新
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  return (
    <footer className={clsx('App-footer', {
      floating, // `floating` プロップが true の場合に特定のスタイルを適用
      scrolled, // スクロールに応じてクラス切り替え
    })}>

      <div className="w-full leading-[0.5]">
        <div className='bottom-0 text-center'>
          <p>{getMessage('Pg001', 'footer_copyright')}</p>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
