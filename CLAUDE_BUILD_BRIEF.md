# AMPâ€™D UP IMAGES â€” CLAUDE BUILD BRIEF (BETA)
**Target:** Deploy a premium, responsive beta at `https://ampdimages.com` via **Netlify** using a **GitHub** repo.

**Voice & Brand:** *Visual Alchemy, AMPâ€™d.* Whiteâ€“gold on black. Bold. Intuitive. Power verbs. No heavy jargon.

---

## 0) Tech & Hosting

- **Host:** Netlify (connect to GitHub repo)
- **Framework:** Next.js (App Router) + Tailwind CSS + shadcn/ui
- **LLM:** Anthropic Claude (Vision for analysis â†’ JSON, Text for prompt generation)
- **Storage:** Netlify Blobs (temporary) â€” Supabase later for â€œPrompt Vaultâ€
- **Auth:** None for beta (public). Add Supabase in Pro phase.

**Environment Variables (Netlify â†’ Site Settings â†’ Environment):**
```
ANTHROPIC_API_KEY=YOUR_KEY
ALLOWED_IMAGE_MAX_MB=10
```

---

## 1) Brand System (Tailwind tokens)

Add to `globals.css` (or `tailwind.css`) :
```css
:root {
  --ink:    #0B0B0C; /* page bg */
  --ink-2:  #121214; /* panels */
  --paper:  #F5F3EF; /* primary text on dark */
  --gold:   #D6B25E; /* accent */
  --gold-2: #F0D58B; /* hover/shine */
  --muted:  #9CA3AF; /* secondary text */
  --ring:   #D6B25E; /* focus/active */
}
html { color: var(--paper); background: var(--ink); }
```

**Fonts**
- Display: *Clash Display* (or *Migra*)
- Body/UI: *Inter* (or *Satoshi*)

**Motion**
- Subtle fade/translate on section reveal
- Gold glow on CTA hover
- AMPâ€™d Meter fader emits soft gold ring on drag

---

## 2) Page Structure (Single-page MVP)

Sections in order:

1. **Hero (WOW)**
   - Logo (white/gold)
   - **Headline:** â€œVisual Alchemy, AMPâ€™d.â€
   - **Subhead:** â€œInstant cinematic remixes â€” no prompt required. Upload. Dial the AMPâ€™d Meter. Unleash.â€
   - **CTA:** Enter the Beta Experience
   - **Note:** Limited-time free beta. Powered by Claude + AMP Studios.

2. **How It Works (1â€“2â€“3)**
   1) Upload your image (â‰¤ 10MB)  
   2) Choose a style + set **AMPâ€™d Meter**  
   3) Copy your **image prompt** or add **video direction** for a video prompt

3. **Feature Grid**
   - **Identity Locks:** Ethnicity (locked), Hair (locked), Eye (locked) â€” *never overridden by presets or AMPâ€™d Meter*
   - Presets (8): Cinematic Noir, Anime Essence, Fantasy Dreamscape, Futuristic Cyberpunk,
     Vintage Film, Natural Documentary, Mystical Portrait, Urban Street Art
   - Lighting / Aspect Ratio / Camera Angle

4. **AMPâ€™d Meter (Vertical Fader)**
   - Label: **AMPâ€™d Meter â€” Remix Intensity**
   - Microcopy: â€œDial the alchemy: from subtle refinement to full transformation.â€

5. **Video Prompt (Beta)**
   - Toggle: **Add Motion (Video Prompt Only)**
   - Textarea: â€œDescribe what happens nextâ€¦â€
   - Optional dropdowns: Camera motion (pan/dolly/drone/zoom), Pace, Mood
   - Button: **Generate Video Prompt**

6. **Coming Soon (Pro Tiers)**
   - **Prompt Vault (Pro):** save/organize/remix prompts
   - **Prompter License:** advanced sliders + new style packs
   - **Prompter Pro:** storyboard builder, video template packs, experimental modes
   - Voice-to-Prompt, Creator Dashboard, Remix Credits, Quickshare Links

7. **Final CTA**
   - Enter the Beta Experience  â€¢  (Optional) See Examples

8. **Footer**
   - Powered by Claude + AMP Studios. Â© YEAR

---

## 3) JSON Profile (Hidden; output of Claude Vision)

Serves as the single source of truth for identity + style. DO NOT expose in UI.

```json
{
  "subjects": [{
    "type": "person",
    "gender": "female|male|nonbinary|unspecified",
    "ethnicity": "Black|White|Latinx|South Asian|East Asian|Middle Eastern|Indigenous|Mixed|Other",
    "hair_color": "black|brown|blonde|red|white|bold_color",
    "eye_color": "brown|hazel|green|blue|gray|other",
    "age_range": "teen|20s|30s|40s|50s|60+"
  }],
  "environment": { "type": "indoor|outdoor|studio|city|nature|fantasy", "notes": "" },
  "lighting": { "type": "cinematic|natural|soft|hard|neon|studio", "temperature": "warm|neutral|cool" },
  "camera": { "lens": "35mm|50mm|85mm|tele|wide", "angle": "eye|low|high|top", "motion": "static|pan|tilt|dolly|drone|zoom" },
  "color_palette": ["#...", "#..."],
  "style_preset": "cinematic_noir|anime_essence|...",
  "aspect_ratio": "1:1|3:2|4:5|16:9|9:16",
  "ampd_meter": 1,
  "notes": "salient objects, mood words, textures"
}
```

**Lock rule:** `ethnicity`, `hair_color`, `eye_color` are authoritative and must never be overridden by presets or AMPâ€™d Meter.

---

## 4) API Contracts (Next.js App Router)

### `POST /api/analyze` â†’ Claude Vision â†’ JSON profile
**Body (multipart):**
- `file` (image, <= `ALLOWED_IMAGE_MAX_MB` MB)

**Response 200:**
```json
{ "profile": { ...JSON PROFILE... }, "blobUrl": "netlify-blob://..." }
```

### `POST /api/prompt` â†’ Claude Text â†’ Final prompt
**Body (json):**
```json
{
  "profile": { ... },
  "userSelections": {
    "preset": "cinematic_noir",
    "ethnicity": "...",
    "hair_color": "...",
    "eye_color": "...",
    "lighting": "cinematic",
    "aspect_ratio": "16:9",
    "camera_angle": "eye",
    "ampd_meter": 7,
    "mode": "image|video",
    "video_direction": "Camera pans upward through fog..."
  },
  "output": "image_prompt|video_prompt"
}
```

**Server logic:**
- Merge `userSelections` into `profile`, **respecting locks** (`ethnicity`, `hair_color`, `eye_color`)
- Map `ampd_meter` â†’ creativity/variance scale (low=conservative, high=bold)
- If `output=image_prompt` â†’ generate MJ-style image prompt
- If `output=video_prompt` â†’ generate Sora-style video prompt (no rendering)

**Response 200:**
```json
{
  "prompt": "FINAL PROMPT STRING",
  "meta": { "mode": "image|video", "ampd_meter": 7, "preset": "cinematic_noir" }
}
```

---

## 5) Prompt Templates

### Image Prompt (MJ-style; identity locked)
```
[subject & identity locked: {ethnicity}, {gender}, {hair_color} hair, {eye_color} eyes]
{style_preset} mood, {lighting.type} ({lighting.temperature}),
camera {camera.lens}, {camera.angle} angle, {environment.type}, textures {notes},
aspect ratio {aspect_ratio},
creative intensity: {ampd_meter}/10,
â€” keep identity features fixed; do not alter ethnicity/hair/eye
```

### Video Prompt (Sora-style text; no render)
```
SCENE: {environment.type}, {style_preset} tone, {lighting.type} ({lighting.temperature})
SUBJECT: {ethnicity} {gender}, {hair_color} hair, {eye_color} eyes â€” identity locked
ACTION: {video_direction}
CAMERA: {camera.motion}, {camera.angle}, {camera.lens}
PACE: {pace}, MOOD: {mood}
NOTES: maintain subject identity; do not alter ethnicity/hair/eye; emphasize {ampd_meter}/10 intensity
OUTPUT: single prompt for video generation tool (no actual render)
```

---

## 6) UI Acceptance Criteria

- Premium **whiteâ€“gold on black** theme; serif display + sans body
- Upload gate blocks files > `ALLOWED_IMAGE_MAX_MB` (helpful message)
- Presets change style; **never override** ethnicity/hair/eye
- **AMPâ€™d Meter** = vertical fader (1â€“10) with glow
- Prompt Preview with **Copy** button
- Video Prompt toggle reveals textarea + (optional) dropdowns
- Smooth loading states; mobile-first responsive; Lighthouse â‰¥ 90

---

## 7) File Map (suggested)

```
/app
  /api
    analyze/route.ts
    prompt/route.ts
  /components
    Hero.tsx
    HowItWorks.tsx
    PresetsGrid.tsx
    UploadPanel.tsx
    AmpdFader.tsx
    VideoPromptPanel.tsx
    PromptPreview.tsx
  /styles
    globals.css
  page.tsx
  favicon.ico
  public/logo.png (placeholder; use provided white/gold)
```

---

## 8) Netlify + GitHub Steps

1. **Create GitHub repo** (private or public).
2. Add this brief as `CLAUDE_BUILD_BRIEF.md` at repo root.
3. Push baseline Next.js app with Tailwind + sections.
4. In **Netlify**, click **â€œAdd new site â†’ Import from Gitâ€**, connect repo.
5. Build settings: Framework = Next.js; default build command; default publish dir.
6. Add env vars (`ANTHROPIC_API_KEY`, `ALLOWED_IMAGE_MAX_MB`).
7. Deploy; test upload â†’ analyze â†’ prompt; verify identity locks + AMPâ€™d Meter.

---

## 9) Copy Blocks (use as-is)

**Hero Headline:**  
**Visual Alchemy, AMPâ€™d.**

**Hero Subhead:**  
Instant cinematic remixes â€” no prompt required. Upload. Dial the AMPâ€™d Meter. Unleash.

**CTA:**  
**Enter the Beta Experience**

**How It Works (1â€“2â€“3):**  
1) Upload your image  
2) Choose your style + set the AMPâ€™d Meter  
3) Copy your prompt â€” image or video-ready

**AMPâ€™d Meter Microcopy:**  
Dial the alchemy: from subtle refinement to full transformation.

**Coming Soon (Pro):**  
Prompt Vault â€¢ Prompter License â€¢ Prompter Pro â€¢ Storyboard Builder â€¢ Voice-to-Prompt â€¢ Creator Dashboard â€¢ Remix Credits â€¢ Quickshare Links

**Footer:**  
Powered by Claude + AMP Studios. Â© YEAR

---

## 10) Stretch (optional for beta)

- Netlify Blobs: store `{ profile, finalPrompt }` per session
- â€œCopy Promptâ€ toast: â€œPrompt copied â€” go createâ€
- Example gallery (static cards) for social proof

---

**Deliverables for Beta**  
- Deployed site (Netlify) connected to GitHub  
- Working: upload â†’ analyze (Claude Vision) â†’ image prompt (MJ-style)  
- Working: video prompt (Sora-style text only)  
- Presets + AMPâ€™d Meter + identity locks  
- Premium whiteâ€“gold theme + amped language
