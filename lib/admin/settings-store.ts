import { COMPANY } from "@/lib/constants";

export interface SiteSettings {
  name: string;
  shortName: string;
  tagline: string;
  address: string;
  city: string;
  cityFull: string;
  phone: string;
  email: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __adminSettingsStore: SiteSettings | undefined;
}

function getStore(): SiteSettings {
  if (!globalThis.__adminSettingsStore) {
    globalThis.__adminSettingsStore = { ...COMPANY };
  }
  return globalThis.__adminSettingsStore;
}

export function getSettings(): SiteSettings {
  return structuredClone(getStore());
}

export function updateSettings(data: Partial<SiteSettings>): SiteSettings {
  const store = getStore();
  Object.assign(store, data);
  return structuredClone(store);
}
