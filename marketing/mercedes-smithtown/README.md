# MK × Mercedes-Benz of Smithtown social kit

These are social posts for **Instagram @mk_parrish**, **TikTok @mk_parrish** and
**Facebook MK Parrish**.

| Script | Builds |
| --- | --- |
| `build.mjs` | Volume 1: 7 feed posts, the Pick Your Bow carousel, 2 stories, 2 reels |
| `build-vol2.mjs` | Volume 2: 6 feed posts, 2 carousels, 2 stories, 5 reels |
| `build-vol3.mjs` | Volume 3: fleet vans, custom 2027 orders, community and MK: 10 feed posts, 2 carousels, 1 story, 6 reels |
| `build-gls-tiktok.mjs` | The GLS selfie-camera TikTok |
| `schedule.mjs` | Metricool schedule for all three volumes (Oct 12 – Nov 6) |

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
