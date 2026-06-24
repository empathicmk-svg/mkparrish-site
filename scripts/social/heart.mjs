// Shared glowing petal-pink heart motif for the social templates.
export const HEART = (size = "") =>
  `<svg class="heart ${size}" viewBox="0 0 32 29" aria-hidden="true"><path d="M16 28.5S2.2 20.3 2.2 10.8C2.2 5.6 6.1 2 10.4 2 13 2 15 3.4 16 5.3 17 3.4 19 2 21.6 2 25.9 2 29.8 5.6 29.8 10.8 29.8 20.3 16 28.5 16 28.5z"/></svg>`;

export const HEART_CSS = `
.heart{display:block;fill:#F2AFC6;filter:drop-shadow(0 0 14px rgba(242,175,198,.9)) drop-shadow(0 0 36px rgba(242,175,198,.55))}
.heart.lg{width:88px;height:auto}
.heart.md{width:54px;height:auto}
.heart.sm{width:26px;height:auto}`;
