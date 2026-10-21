/* Blog publishing schedule. Each post goes live at 00:00 Perth time (AWST, UTC+8) on its date. */
import { POSTS } from './blog-manifest.js';

export const SITE = 'https://powerpoint2vid.com';

export function perthToday(now = Date.now()) {
  return new Date(now + 8 * 3600 * 1000).toISOString().slice(0, 10);
}

export function isLive(date, today = perthToday()) {
  return date <= today;
}

export function livePosts(today = perthToday()) {
  return POSTS.filter((p) => isLive(p.date, today)).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function findPost(slug) {
  return POSTS.find((p) => p.slug === slug);
}

/* Cache until the next Perth midnight (at most 10 minutes), so new posts appear on time. */
export function cacheSeconds(now = Date.now()) {
  const perth = now + 8 * 3600 * 1000;
  const toMidnight = Math.ceil((86400000 - (perth % 86400000)) / 1000);
  return Math.max(30, Math.min(600, toMidnight));
}

export const xmlEscape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
