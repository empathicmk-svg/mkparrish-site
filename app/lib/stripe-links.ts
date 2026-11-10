// Stripe payment-link → product slug maps.
//
// Products bought through a static buy.stripe.com link arrive with no metadata,
// so the payment link id is the only thing that identifies what was sold. The
// webhook needs this to address the delivery email, and the gated download
// route needs it to decide whether a checkout session entitles the caller to a
// file, so the maps live here rather than in either route.

export const EBOOK_LINKS: Record<string, string> = {
  plink_1Tq0o0JICEFzVEU9PHbP7s8I: "still-here-still-hers",
  plink_1Tq0o2JICEFzVEU9J4mlFhqn: "street-smarts",
  plink_1Tq0o3JICEFzVEU9oBKPjscB: "make-my-own-light",
  plink_1Tq0o4JICEFzVEU94PK0Ild1: "the-invisible-bruise",
  plink_1Tq0o5JICEFzVEU9qEeryjJX: "decoding-angel-numbers",
  plink_1Tn0zxJICEFzVEU9gncWmsAr: "rebecoming",
  plink_1TmgtDJICEFzVEU9oKhP76GL: "reinvention-workbook",
  plink_1Tmgt7JICEFzVEU9jlMVHqAC: "write-yourself-into-the-room",
  plink_1TmgtAJICEFzVEU9q5c8wGhH: "brand-voice-playbook",
  plink_1TlCZNJICEFzVEU9mHVtB8fi: "the-linkedin-bio-fix-kit",
  plink_1Td8tLJICEFzVEU9sRUsSds6: "the-edit-guide",
  plink_1Td8ttJICEFzVEU9tslM6aeS: "before-the-session",
  plink_1Td8uWJICEFzVEU9Vf2zXQSe: "the-rewrite-playbook",
  plink_1Td8vTJICEFzVEU9XKsiOwdd: "the-new-chapter-workbook",
  plink_1Td8vvJICEFzVEU9lRg5OlwR: "the-byline-method",
  plink_1Td8wSJICEFzVEU9jVpK8ggP: "the-build-copy-guide",
  plink_1TnJJvJICEFzVEU9fyC66LCl: "the-social-strategy-playbook",
  plink_1Tl8L3JICEFzVEU9XaRmKOuQ: "the-prompt-vault",
};

export const PAPERBACK_LINKS: Record<string, string> = {
  plink_1Tq0o1JICEFzVEU9QOEjF0RT: "still-here-still-hers",
  plink_1Tq0o2JICEFzVEU9xDndgSzk: "street-smarts",
  plink_1Tq0o3JICEFzVEU9uD35jmbb: "make-my-own-light",
  plink_1Tq0o4JICEFzVEU9rKOB1rfY: "the-invisible-bruise",
  plink_1Tq0o5JICEFzVEU9JU28fLmt: "decoding-angel-numbers",
  plink_1Tmgz6JICEFzVEU9j3eBWsqA: "rebecoming",
  plink_1TmgzEJICEFzVEU9SKjd8vUC: "reinvention-workbook",
  plink_1Tmgz8JICEFzVEU9JwRgrvmN: "write-yourself-into-the-room",
  plink_1TmgzBJICEFzVEU9GqXLg9rj: "brand-voice-playbook",
  plink_1Tn10pJICEFzVEU9EXukmman: "the-edit-guide",
  plink_1Tn10sJICEFzVEU9VyCugic5: "before-the-session",
  plink_1Tn10yJICEFzVEU9OI5Ja2g8: "the-rewrite-playbook",
  plink_1Tn112JICEFzVEU9FPoFQaJn: "the-new-chapter-workbook",
  plink_1Tn115JICEFzVEU9HAOUq02x: "the-byline-method",
  plink_1Tn118JICEFzVEU9u4gJLLjo: "the-build-copy-guide",
  plink_1Tn11CJICEFzVEU96rsJK3LV: "the-social-strategy-playbook",
  plink_1Tn11FJICEFzVEU9DW2jsN3X: "the-prompt-vault",
};

export const PRINT_LINKS: Record<string, string> = {
  plink_1Td8xXJICEFzVEU9hmiCBkOY: "promise-me",
  plink_1Td8y2JICEFzVEU9NxdCQ8p9: "the-rewrite-print",
  plink_1Td8z3JICEFzVEU9qwlHV3dv: "selected-lines",
  plink_1Tn0g3JICEFzVEU9XzVHfUan: "live-out-loud-print",
  plink_1Tn0gbJICEFzVEU9B13LgsmX: "not-afraid-of-storms-print",
  plink_1Tn0hJJICEFzVEU9dsa4dTuh: "never-too-late-print",
  plink_1Tq0qvJICEFzVEU9x6UbPTXB: "custom-quote-print",
};
