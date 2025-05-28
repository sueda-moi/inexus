import { create } from 'zustand';

type Locale = 'ja' | 'en' | 'zh';
type MessageFile = 'about' | 'home' | 'header' | 'footer' | 'services' | 'contact';

type Messages = Record<MessageFile, Record<string, string>>;

interface LocaleState {
  locale: Locale;
  messages: Messages;
  setLocale: (newLocale: Locale) => Promise<void>;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: 'ja',
  messages: {
    about: {},
    home: {},
    header: {},
    footer: {},
    services: {},
    contact: {},
  },
  setLocale: async (newLocale) => {
    const loadedMessages: Messages = {
      about: {},
      home: {},
      header: {},
      footer: {},
      services: {},
      contact: {},
    };

    const messageFiles: MessageFile[] = ['about', 'home', 'header', 'footer', 'services', 'contact'];

    for (const file of messageFiles) {
      const mod = await import(`../../messages/${newLocale}/${file}.json`);
      loadedMessages[file] = mod.default as Record<string, string>;
    }

    set({ locale: newLocale, messages: loadedMessages });
  },
}));

export type { MessageFile };
