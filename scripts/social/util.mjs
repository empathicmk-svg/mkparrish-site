// Shared caption / hashtag / CSV helpers for the social generators.
import { BASE_TAGS } from "./catalog.mjs";

export const csvCell = (v = "") => `"${String(v).replace(/"/g, '""')}"`;
export const csvRow = (cells) => cells.map(csvCell).join(",");

export const allTags = (post) => [...new Set([...(post.tags || []), ...BASE_TAGS])];
export const hashtags = (post) => allTags(post).map((t) => `#${t}`).join(" ");

export const igCaption = (post) =>
  `${post.caption}\n\n🔗 ${post.cta}: link in bio\n\n${hashtags(post)}`;

export const ttCaption = (post) => {
  const tags = allTags(post).slice(0, 6).map((t) => `#${t}`).join(" ");
  return `${post.caption.split("\n")[0]} ${tags} #fyp`;
};

// Simple 3-slots/day scheduler starting from `start` (Date).
export function scheduler(start, times = ["09:00", "12:30", "18:00"]) {
  return (i) => {
    const day = Math.floor(i / times.length);
    const d = new Date(start);
    d.setDate(d.getDate() + day);
    return { date: d.toISOString().slice(0, 10), time: times[i % times.length] };
  };
}

export function nextMonday() {
  const d = new Date();
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
  d.setHours(0, 0, 0, 0);
  return d;
}
