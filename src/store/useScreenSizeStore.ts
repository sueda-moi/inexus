import { create } from 'zustand';

interface ScreenSizeState {
  width: number;
  height: number;
  isMobileIframe: boolean;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

export const useScreenSizeStore = create<ScreenSizeState>((set) => ({
  width: typeof window !== 'undefined' ? window.innerWidth : 0, // 初始值可以从 window 获取
  height: typeof window !== 'undefined' ? window.innerHeight : 0,
  isMobileIframe: typeof window !== 'undefined' ? window.innerWidth < 768 : false, //  768 是你的移动端断点

  setWidth: (width) => set((state) => {
    const isMobile = width < 768; // 移动端断点
    // 动态添加/移除 class 到 html 标签
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('is-mobile-iframe', isMobile);
      document.documentElement.classList.toggle('is-desktop-iframe', !isMobile);
    }
    return { width, isMobileIframe: isMobile };
  }),
  setHeight: (height) => set({ height }),
}));