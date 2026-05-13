import type { Reading } from "./types";

const KEY = "future.readings.v1";
const LATEST = "future.latest.v1";

export function loadReadings(): Reading[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Reading[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveReading(r: Reading) {
  if (typeof window === "undefined") return;
  const xs = loadReadings();
  xs.unshift(r);
  localStorage.setItem(KEY, JSON.stringify(xs.slice(0, 50)));
  localStorage.setItem(LATEST, r.id);
}

export function getLatestId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LATEST);
}

export function getReading(id: string): Reading | null {
  return loadReadings().find((r) => r.id === id) || null;
}

export function deleteReading(id: string) {
  if (typeof window === "undefined") return;
  const xs = loadReadings().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(xs));
  if (localStorage.getItem(LATEST) === id) {
    localStorage.setItem(LATEST, xs[0]?.id || "");
  }
}

export function clearAll() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  localStorage.removeItem(LATEST);
}
