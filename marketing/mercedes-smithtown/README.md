# MK × Mercedes-Benz of Smithtown social kit

These are social posts for **Instagram @mk_parrish**, **TikTok @mk_parrish** and
**Facebook MK Parrish**.

| Script | Builds |
| --- | --- |
| `build.mjs` | Volume 1: 7 feed posts, the Pick Your Bow carousel, 2 stories, 2 reels |
| `build-vol2.mjs` | Volume 2: 6 feed posts, 2 carousels, 2 stories, 5 reels |
| `build-vol3.mjs` | Volume 3: fleet vans, custom 2027 orders, community and MK: 10 feed posts, 2 carousels, 1 story, 6 reels |
| `build-gls-tiktok.mjs` | The GLS selfie-camera TikTok |
| `build-parktronic.mjs` | The Parktronic self-parking reel and poll story |
| `build-viral.mjs` | Six trend-format reels (pick one, costume reveal, fall edit, day in my life, rate it, things that make sense). Captions and sounds are in `captions-viral.md` |
| `build-vol4.mjs` | Volume 4 "Walk in with me": five reels (walk-in POV, GLE walkaround, BOO-tiful, member savings, pray on it) and four feed posts. Captions in `captions-vol4.md`. Shared reel templates live in `trend.mjs` |
| `build-vol5.mjs` | Volume 5 "Your Mercedes girl": a showroom reel and two "Ask for MK" feed posts from MK's retouched black-dress selfies. Captions in `captions-vol5.md` |
| `build-vol6.mjs` | Volume 6 "Book it": green flags, book-in-30-seconds and things-nobody-tells-you reels plus a link-sticker story, all driving to mkparrish.com/test-drive. Captions and strategy in `captions-vol6.md` |
| `build-friday.mjs` | Friday reels ("Friday night vibes" and "POV: Friday at my desk"): showroom AMG GT, desk roses and "Make it happen" desk mat with a night grade, glow and pink sparkles, ending on a weekend test-drive CTA. Captions in `captions-friday.md` |
| `build-gwagon.mjs` | "2027 G-Wagon, today": walkaround reel with a chrome light sweep, a story and two feed posts, all ending on a call-or-text-today CTA. Captions in `captions-gwagon.md` |
| `schedule.mjs` | Metricool schedule for all three volumes (Oct 12 – Nov 6) |

After building any reels, run `node scripts/add-music.mjs`. It gives every
silent video MK's own music bed (made by `scripts/audio/make-music-beds.py`),
so nothing posts without sound.
Photo and carousel posts go out as short Reels with music: `node
scripts/photo-reels.mjs` builds them into `output/photo-reels/`, because
Instagram can't add a song to a scheduled photo post.

`lib.mjs` holds the shared brand, photo retouch and templates. Source photos
and clips live in `media/`. Captions are in `captions.md`,
`captions-vol2.md`, `captions-vol3.md` and `schedule.mjs`.

## Automating the posting with Metricool

Metricool posts to Instagram, Facebook and TikTok for you on schedule.

1. **Connect the accounts (one time).** In Metricool, create a brand called
   "MK Parrish" and connect:
   - Instagram @mk_parrish. It must be a Business or Creator account linked
     to the MK Parrish Facebook Page. Personal profiles can't auto-publish.
   - The MK Parrish Facebook **Page**. Facebook only allows scheduling to
     Pages, not personal profiles.
   - TikTok @mk_parrish.
   - Set the brand's time zone to **America/New_York**.
2. **Make the media public.** The CSVs point at the files on GitHub `main`,
   so merge the PR first. Metricool downloads each image and video from those
   links.
3. **Import.** Go to Metricool → Planner → **Import CSV**. Upload
   `output/mercedes-smithtown/metricool-schedule-1.csv`, then
   `metricool-schedule-2.csv`. Choose date format **DD/MM/YYYY** and time
   **HH:MM**.
4. **Review and approve.** Rows import as **drafts**. Open each one, check the
   preview and the model name, and for Instagram videos pick **Reel** as the
   post type. Then switch the draft to scheduled. To skip review, set
   `DRAFT = 'FALSE'` in `schedule.mjs` and rebuild.
5. **Stories.** Stories aren't in the CSV. Post them from your phone so you
   can add the poll and question stickers.

To change dates, times or captions, edit `CALENDAR` or `POSTS` in
`schedule.mjs`, then run `node marketing/mercedes-smithtown/schedule.mjs`.
