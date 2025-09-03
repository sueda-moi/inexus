import { create } from 'zustand';

type Locale = 'ja' | 'en' | 'zh';
type MessageFile = 'common' |'Pg001' | 'Pg002' | 'Pg003' | 'Pg004' | 'Pg005' | 'Pg006'| 'Pg900';

type Messages = Record<MessageFile, Record<string, string>>;

interface LocaleState {
  locale: Locale;
  messages: Messages;
  setLocale: (newLocale: Locale) => Promise<void>;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: 'ja',
  messages: {
    common: {},
    Pg001: {},
    Pg002: {},
    Pg003: {},
    Pg004: {},
    Pg005: {},
    Pg006: {},
    Pg900: {},
  },
  setLocale: async (newLocale) => {
    const loadedMessages: Messages = {
      common: {},
      Pg001: {},
      Pg002: {},
      Pg003: {},
      Pg004: {},
      Pg005: {},
      Pg006: {},
      Pg900: {},
    };

    const messageFiles: MessageFile[] = ['common', 'Pg001', 'Pg002', 'Pg003', 'Pg004', 'Pg005', 'Pg006', 'Pg900'];

    for (const file of messageFiles) {
      const mod = await import(`../../messages/${newLocale}/${file}.json`);
      loadedMessages[file] = mod.default as Record<string, string>;
    }

    set({ locale: newLocale, messages: loadedMessages });
  },
}));

export type { MessageFile, Locale };
