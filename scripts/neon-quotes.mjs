// ─────────────────────────────────────────────────────────────────────────────
// Neon quote set: lines from MK's own books and poems, in posting order.
//
// `lines`   the quote as it lights up, one neon tube per line. Lines listed in
//           `pink` (0-based) glow hot pink; the rest glow white.
// `from`    the book (or poem) it comes from, printed under the quote.
// `caption` hook first (Instagram shows ~125 characters before "more"), then
//           the story, MK's sign-off and one engagement prompt.
// `cta`     where the post sends people. `tags` are 5 hashtags, Instagram's cap.
//
// Every quote is copied word for word from the source named in `source`.
// Built by scripts/build-neon-quotes.mjs.
// ─────────────────────────────────────────────────────────────────────────────

const shop = (slug) => `mkparrish.com/shop/${slug}`;

export const NEON_QUOTES = [
  {
    slug: 'never-dim',
    lines: ['i will never', 'dim another soul', 'to make my own', 'look brighter.'],
    pink: [3],
    from: 'make my own light',
    source: 'Make My Own Light, "Burn the Grief"',
    title: 'Make Your Own Light',
    caption:
      "there's a kind of light that only works by making everyone around it look darker. i don't want that kind. this is from a poem called burn the grief, about the day i stopped waiting for someone to hand me a match. 🕯️ ♡ - MK\n\nsend this to the friend whose light you'd never dim.",
    cta: `📖 Make My Own Light: poems from the dark, and the turning toward. ${shop('make-my-own-light')}`,
    tags: ['poetry', 'poetsofinstagram', 'healingjourney', 'selflove', 'mkparrish'],
  },
  {
    slug: 'not-late',
    lines: ['you are not late.', 'you are simply not', 'on a schedule', 'that was ever yours.'],
    pink: [0],
    from: 'the meantime',
    source: 'The Meantime',
    title: 'You Are Not Late',
    caption:
      "the clock nobody hung on the wall says you should be married by now, promoted by now, healed by now, further along by now. it's lying. you're not behind. you're in transit. ♡ - MK\n\ntag someone who needs to hear this today.",
    cta: `📖 The Meantime: a memoir on society's clock and the myth of falling behind. ${shop('the-meantime')}`,
    tags: ['comparison', 'trusttheprocess', 'mindset', 'personalgrowth', 'mkparrish'],
  },
  {
    slug: 'attention-for-care',
    lines: ['i wanted to be chosen', 'so badly that i kept', 'mistaking attention', 'for care.'],
    pink: [2, 3],
    from: 'still here, still hers',
    source: 'Still Here, Still Hers',
    title: "Attention Isn't Care",
    caption:
      "if you ever called someone's attention love because it was the closest thing you'd had in a while, you weren't foolish. you were hungry. there's a difference, and learning it changes who you let in. ♡ - MK\n\nsave this for the next time attention shows up dressed as care.",
    cta: `📖 Still Here, Still Hers: essays on losing yourself and learning to belong to your own life. ${shop('still-here-still-hers')}`,
    tags: ['healingjourney', 'selfworth', 'relationships', 'womenwhowrite', 'mkparrish'],
  },
  {
    slug: 'the-author',
    lines: ['i am the author.', 'i always have been.', 'i just had to believe', 'in the plot i was in.'],
    pink: [0],
    from: 'the rewrite',
    source: 'The Rewrite (poem), mkparrish.com/writing',
    title: 'I Am the Author',
    caption:
      "every scar now a sentence, every stumble a turn. this is the heart of a poem i wrote called the rewrite, and the heart of everything i do, for myself and for the people i write for. you are not a character waiting to be cast. ♡ - MK\n\ncomment ✍️ if you're picking the pen back up this year.",
    cta: '📖 Read the whole poem free at mkparrish.com/writing',
    tags: ['poetry', 'therewrite', 'newchapter', 'womenwhowrite', 'mkparrish'],
  },
  {
    slug: 'not-too-sensitive',
    lines: ['you are not', 'too sensitive.', 'you were trained', 'to doubt your own senses.'],
    pink: [3],
    from: 'the invisible bruise',
    source: 'The Invisible Bruise',
    title: 'Not Too Sensitive',
    caption:
      "\"you're too sensitive\" is one of the most effective ways to get someone to stop trusting what they see. the way back starts the moment you choose your own account over theirs. even once. even quietly. ♡ - MK\n\nsend this to someone who's been told they're too much.",
    cta: `📖 The Invisible Bruise: on gaslighting, and coming back to yourself. ${shop('the-invisible-bruise')}`,
    tags: ['gaslighting', 'emotionalabuse', 'healingjourney', 'trustyourself', 'mkparrish'],
  },
  {
    slug: 'voice-remembered',
    lines: ['positioning gets you', 'considered.', 'voice gets you', 'remembered.'],
    pink: [3],
    from: 'write yourself into the room',
    source: 'Write Yourself Into the Room',
    title: 'Voice Gets Remembered',
    caption:
      "you can copy a strategy. you can't copy a voice. most websites and bios sound like everyone else because they skipped the second half. that's what i build for clients: the site, the words, and the voice people remember. ♡ - MK\n\nwant your website or bio to finally sound like you? link in bio.",
    cta: '💻 Websites, copy and brand voice by MK: mkparrish.com/services',
    tags: ['brandvoice', 'copywriting', 'webdesign', 'smallbusiness', 'mkparrish'],
  },
  {
    slug: 'first-draft',
    lines: ['you were never broken.', 'you were a', 'first draft.'],
    pink: [2],
    from: 'the reinvention workbook',
    source: 'The Reinvention Workbook',
    title: 'A First Draft',
    caption:
      "and the best thing about a first draft is that it was always meant to be revised. nothing about who you were cancels who you're becoming. it's all material. ♡ - MK\n\nsave this for the day you forget.",
    cta: `📖 The Reinvention Workbook: better questions for the middle of a big change. ${shop('reinvention-workbook')}`,
    tags: ['reinvention', 'newchapter', 'selfgrowth', 'journaling', 'mkparrish'],
  },
  {
    slug: 'crime-scene',
    lines: ['i am tired of making', 'a crime scene', 'out of my softness.'],
    pink: [2],
    from: 'still here, still hers',
    source: 'Still Here, Still Hers',
    title: 'Done Apologizing',
    caption:
      "for years i treated being soft like evidence against me. like if i'd been harder, i would have seen it coming. i'm done prosecuting the part of me that loved anyway. ♡ - MK\n\nwhat part of you are you done apologizing for? 👇",
    cta: `📖 Still Here, Still Hers. ${shop('still-here-still-hers')}`,
    tags: ['softness', 'healingjourney', 'selfcompassion', 'womenwhowrite', 'mkparrish'],
  },
  {
    slug: 'load-bearing',
    lines: ['i know which loves', 'are load-bearing', 'and which are only', 'decorative.'],
    pink: [1],
    from: 'make my own light',
    source: 'Make My Own Light, "Street Smart"',
    title: 'Load-Bearing Love',
    caption:
      "my dad used to ask why i was so book smart and not street smart at all. this poem is the answer i found after he was gone: you learn to tell the people who hold the house up from the people who just look nice in it. ♡ - MK\n\ntag someone who's load-bearing in your life. 🤍",
    cta: `📖 Make My Own Light. ${shop('make-my-own-light')}`,
    tags: ['poetry', 'relationships', 'grief', 'friendship', 'mkparrish'],
  },
  {
    slug: 'room-never-locked',
    lines: ['the room was never locked.', 'you just had not written', 'the sentence', 'that opened it yet.'],
    pink: [0],
    from: 'write yourself into the room',
    source: 'Write Yourself Into the Room',
    title: 'The Room Was Never Locked',
    caption:
      "the job, the client, the room you want: most of them aren't closed. they're waiting for you to say clearly who you are and what you do. it starts with one sentence. ♡ - MK\n\ndrop what you do in ten words below 👇",
    cta: `📖 Write Yourself Into the Room: the personal-brand writing guide. ${shop('write-yourself-into-the-room')}`,
    tags: ['personalbranding', 'copywriting', 'careeradvice', 'linkedintips', 'mkparrish'],
  },
  {
    slug: 'shower-victory',
    lines: ['you take a shower', 'and call it a victory', 'because it is.'],
    pink: [2],
    from: 'still here, still hers',
    source: 'Still Here, Still Hers',
    title: 'Small Wins Count',
    caption:
      "some seasons, surviving looks like water, a clean shirt and walking outside even when the light feels personal. momentum isn't the same thing as healing, but it keeps you here long enough to get there. the small wins count. ♡ - MK\n\nwhat was your small win today? 👇",
    cta: `📖 Still Here, Still Hers. ${shop('still-here-still-hers')}`,
    tags: ['smallwins', 'mentalhealth', 'healingjourney', 'selfcare', 'mkparrish'],
  },
  {
    slug: 'confidence-gift',
    lines: ['confidence is a gift', 'i am learning to give myself,', 'since no one ever', 'wrapped it for me.'],
    pink: [3],
    from: 'make my own light',
    source: 'Make My Own Light, "The Value of Value"',
    title: 'Wrap It Yourself',
    caption:
      "nobody wrapped confidence up and handed it to me. so i'm learning to give it to myself, one kept promise at a time. you're allowed to do that too. ♡ - MK\n\nsend this to the friend who's learning the same thing.",
    cta: `📖 Make My Own Light. ${shop('make-my-own-light')}`,
    tags: ['confidence', 'selfworth', 'poetry', 'womenempowerment', 'mkparrish'],
  },
  {
    slug: 'just-you',
    lines: ['you need to be you.', 'not a sister. not a daughter.', 'not an aunt.', 'just you.'],
    pink: [3],
    from: 'dad, in street smarts',
    source: "Street Smarts (one of MK's father's texts)",
    title: 'Just You',
    caption:
      "my dad sent me this in one of the 1,109 texts i turned into a book after he died. it's the one i reread most. you're allowed to be a person before you're a role. ♡ - MK\n\nwho taught you that you were enough on your own? 🤍",
    cta: `📖 Street Smarts: what my father taught me in 1,109 texts. ${shop('street-smarts')}`,
    tags: ['grief', 'dad', 'fatherdaughter', 'selfidentity', 'mkparrish'],
  },
  {
    slug: 'see-and-ache',
    lines: ['i would rather see', 'and ache', 'than be comfortable', 'and asleep.'],
    pink: [1],
    from: 'make my own light',
    source: 'Make My Own Light, "Bliss Is Ignorance"',
    title: 'Rather See',
    caption:
      "waking up costs something. you see the patterns, the people, the parts of yourself you used to look away from. it aches. i'd still choose it, every time. ♡ - MK\n\nawake or comfortable? tell me which you'd pick 👇",
    cta: `📖 Make My Own Light. ${shop('make-my-own-light')}`,
    tags: ['poetry', 'awakening', 'shadowwork', 'selfawareness', 'mkparrish'],
  },
  {
    slug: 'i-survived',
    lines: ['to be continued', 'is just a longer way', 'of saying', 'i survived.'],
    pink: [3],
    from: 'make my own light',
    source: 'Make My Own Light, "To Be Continued"',
    title: 'To Be Continued',
    caption:
      "the last poem in the book. everyone expected me to be crying in the dark. i decided my story wasn't finished instead. if you're in a chapter that feels like an ending, it's a comma. ♡ - MK\n\nif this one found you in the dark, stay. in the US you can call or text 988, any hour, and a real person will answer.",
    cta: `📖 Make My Own Light. ${shop('make-my-own-light')}`,
    tags: ['poetry', 'tobecontinued', 'mentalhealthawareness', 'survivor', 'mkparrish'],
  },
];
