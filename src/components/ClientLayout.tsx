'use client'; // Explicitly declare this as a client component

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import { usePageTransition } from '@/hooks/usePageTransition';
import { useLocaleStore } from '@/store/useLocaleStore';
import { useScreenSizeStore } from '@/store/useScreenSizeStore'; // <-- 导入你的 Zustand store

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const LOADING_DURATION = 400;
  const { loading } = usePageTransition(LOADING_DURATION);
  const [isFirstLoadFinished, setIsFirstLoadFinished] = useState(false);
  const setLocale = useLocaleStore((state) => state.setLocale);

  // 从 store 中获取设置尺寸的方法
  const setScreenWidth = useScreenSizeStore((state) => state.setWidth);
  const setScreenHeight = useScreenSizeStore((state) => state.setHeight);

  // === 处理 iframe 尺寸的代码 ===
  useEffect(() => {
    const handleMessageFromParent = (event: MessageEvent) => {
      // **重要：验证发送方来源**
      const allowedParentOrigin = 'http://www.inexus.co.jp'; // <--- 替换为实际parent画面域名和协议

      if (event.origin !== allowedParentOrigin) {
        console.warn('收到来自未经授权parent源的消息:', event.origin);
        return;
      }

      // 检查消息类型
      if (event.data && event.data.type === 'updateScreenSize') {
        if (typeof event.data.width === 'number') {
          console.log('setScreenWidth之前event.data.width:', event.data.width);
          alert('setScreenWidth之前event.data.width:'+ event.data.width);
          setScreenWidth(event.data.width); // 调用 store 中的方法更新宽度
          console.log('setScreenWidth之后event.data.width:', event.data.width);
           alert('setScreenWidth之后event.data.width:'+ event.data.width);
        }
        if (typeof event.data.height === 'number') {
          console.log('setScreenWidth之前event.data.height:', event.data.height);
          alert('setScreenWidth之前event.data.height:'+ event.data.height);
          setScreenHeight(event.data.height); // 调用 store 中的方法更新高度
          console.log('setScreenWidth之后event.data.height:', event.data.height);
          alert('setScreenWidth之后event.data.height:'+ event.data.height);
        }
        console.log('从parent画面收到 iframe 宽度和高度:', event.data.width, event.data.height);
        alert('从parent画面收到 iframe 宽度:'+ event.data.width + ' 和高度:'+ event.data.height);
      }
    };

    // 添加事件监听器
    window.addEventListener('message', handleMessageFromParent);

    // 初次加载时，尝试从 URL 参数获取宽度和高度（作为 fallback/初始值）
    const urlParams = new URLSearchParams(window.location.search);
    const initialWidth = urlParams.get('width');
    const initialHeight = urlParams.get('height');

    if (initialWidth) {
      const parsedWidth = parseInt(initialWidth, 10);
      if (!isNaN(parsedWidth)) {
        console.log('setScreenWidth之前initialWidth:', initialWidth);
        alert('setScreenWidth之前initialWidth:'+ initialWidth);
        setScreenWidth(parsedWidth);
        console.log('setScreenWidth之后initialWidth:', initialWidth);
        alert('setScreenWidth之后initialWidth:'+ initialWidth);
      }
    }
    if (initialHeight) {
      const parsedHeight = parseInt(initialHeight, 10);
      if (!isNaN(parsedHeight)) {
        console.log('setScreenWidth之前initialHeight:', initialHeight);
        alert('setScreenWidth之前initialHeight:'+ initialHeight);
        setScreenHeight(parsedHeight);
        console.log('setScreenWidth之后initialHeight:', initialHeight);
        alert('setScreenWidth之后initialHeight:'+ initialHeight);
      }
    }

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('message', handleMessageFromParent);
    };
  }, [setScreenWidth, setScreenHeight]); // 依赖项是 setState 函数，确保正确性

  // === 其他 useEffect 钩子和逻辑保持不变 ===
  useEffect(() => {
    const unlockScroll = () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      document.body.style.overflow = '';
    };
    unlockScroll();
  }, [pathname]);

  // ✅ MutationObserver fallback: auto-fix scroll lock if caused by 3rd-party animation or transitions
  useEffect(() => {
    const unlockScroll = () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    };

    const observer = new MutationObserver(() => {
      const html = document.documentElement;
      if (html.style.overflow === 'hidden' || html.style.paddingRight) {
        console.warn('[Fix] Detected scroll lock. Unlocking.');
        unlockScroll();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Initialize default language on first load
  useEffect(() => {
    const handleInitialLoad = () => {
      // Set default language (e.g., Japanese). You can read from localStorage instead if needed.
      setLocale('ja');

      // Delay content appearance for loading animation
      setTimeout(() => {
        setIsFirstLoadFinished(true);
      }, LOADING_DURATION);
    };

    if (document.readyState === 'complete') {
      handleInitialLoad();
    } else {
      window.addEventListener('load', handleInitialLoad);
      return () => window.removeEventListener('load', handleInitialLoad);
    }
  }, [setLocale]);

  // Header menu toggle state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
  const unlockScroll = () => {
    document.documentElement.style.overflow = '';
    document.documentElement.style.paddingRight = '';
    document.body.style.overflow = '';
  };
  unlockScroll();
}, [pathname]);

  // Show loading screen on first load
  if (!isFirstLoadFinished) {
    return <LoadingScreen />;
  }




  return (
    <>
      {/* Header with menu toggle */}
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Animate page transitions */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}

        {!loading && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <main className="flex-1 w-full">{children}</main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer (floats if on home screen) */}
      <Footer />
    </>
  );
}
