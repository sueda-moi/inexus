// src/store/useScreenSizeStore.ts
import { create } from 'zustand';

interface ScreenSizeState {
  width: number;
  height: number;
  isMobileIframe: boolean; 
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

export const useScreenSizeStore = create<ScreenSizeState>((set) => ({
  // 初始值可以从 window 获取，但请注意在 SSR 环境下 window 不存在，需要判断
  width: typeof window !== 'undefined' ? window.innerWidth : 0,
  height: typeof window !== 'undefined' ? window.innerHeight : 0,
  isMobileIframe: typeof window !== 'undefined' ? window.innerWidth < 768 : false, // 假设 768 是你的移动端断点

  // 优化后的 setWidth 方法
  setWidth: (width) => { 
    const isMobile = width < 768; 
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('is-mobile-iframe', isMobile);
      document.documentElement.classList.toggle('is-desktop-iframe', !isMobile); // 也可以添加桌面类
    }
    set({ width, isMobileIframe: isMobile });
  },
  setHeight: (height) => set({ height }),
}));