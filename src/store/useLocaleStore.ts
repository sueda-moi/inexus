import { create } from 'zustand';

type Locale = 'ja' | 'en' | 'zh';
type MessageFile = 'Pg001' | 'Pg002' | 'Pg003' | 'Pg004' | 'Pg005' | 'Pg006';

type Messages = Record<MessageFile, Record<string, string>>;

interface LocaleState {
  locale: Locale;
  messages: Messages;
  setLocale: (newLocale: Locale) => Promise<void>;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: 'ja',
  messages: {
    Pg001: {},
    Pg002: {},
    Pg003: {},
    Pg004: {},
    Pg005: {},
    Pg006: {},

  },
  setLocale: async (newLocale) => {
    const loadedMessages: Messages = {
      Pg001: {},
      Pg002: {},
      Pg003: {},
      Pg004: {},
      Pg005: {},
      Pg006: {},
    };

    const messageFiles: MessageFile[] = ['Pg001', 'Pg002', 'Pg003', 'Pg004', 'Pg005', 'Pg006'];

    for (const file of messageFiles) {
      const mod = await import(`../../messages/${newLocale}/${file}.json`);
      loadedMessages[file] = mod.default as Record<string, string>;
    }

    set({ locale: newLocale, messages: loadedMessages });
  },
}));

export type { MessageFile };
