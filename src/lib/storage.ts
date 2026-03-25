// Persistence layer — localStorage today, Supabase-ready tomorrow.
// All keys are namespaced with "gymlog:" to avoid collisions.

const PREFIX = "gymlog:";

export const storage = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error(`[storage] set("${key}") failed:`, e);
    }
  },

  delete(key: string): void {
    localStorage.removeItem(PREFIX + key);
  },
};
