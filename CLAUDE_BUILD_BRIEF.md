# AMP'D UP IMAGES — CLAUDE BUILD BRIEF v3.3 (NO LOCKS)
**Target:** Deploy a premium, responsive beta at `https://ampdimages.com` via **Netlify** using a **GitHub** repo.

**Voice & Brand:** *Visual Alchemy, AMP'd.* White—gold on black. Bold. Intuitive. Power verbs. No heavy jargon.

**POLICY:** NO identity locks. Complete creative freedom. See NO_IDENTITY_LOCKS_POLICY.md

---

## 0) Tech & Hosting

- **Host:** Netlify (connect to GitHub repo)
- **Framework:** Next.js (App Router) + Tailwind CSS + shadcn/ui
- **LLM:** Anthropic Claude (Vision for analysis → JSON, Text for prompt generation)
- **Storage:** Netlify Blobs (temporary) — Supabase later for "Prompt Vault"
- **Auth:** None for beta (public). Add Supabase in Pro phase.

**Environment Variables (Netlify → Site Settings → Environment):**
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
- AMP'd Meter fader emits soft gold ring on drag

---

## 2) Page Structure (Single-page MVP)

Sections in order:

1. **Hero (WOW)**
   - Logo (white/gold)
   - **Headline:** "Visual Alchemy, AMP'd."
   - **Subhead:** "Instant cinematic remixes — no prompt required. Upload. Dial the AMP'd Meter. Unleash."
   - **CTA:** Enter the Beta Experience
   - **Note:** Limited-time free beta. Powered by Claude + AMP Studios.

2. **How It Works (1—2—3)**
   1) Upload your image (≤ 10MB)  
   2) Choose a style + set **AMP'd Meter**  
   3) Copy your **image prompt** or add **video direction** for a video prompt

3. **Feature Grid**
   - **Smart Analysis:** Claude AI detects lighting, mood, composition, and subject details
   - Presets (8): Cinematic Noir, Anime Essence, Fantasy Dreamscape, Futuristic Cyberpunk,
     Vintage Film, Natural Documentary, Mystical Portrait, Urban Street Art
   - Lighting / Aspect Ratio / Camera Angle
   - **Complete Freedom:** Edit any detected value to match your creative vision

4. **AMP'd Meter (Vertical Fader)**
   - Label: **AMP'd Meter — Remix Intensity**
   - Microcopy: "Dial the alchemy: from subtle refinement to full transformation."

5. **Video Prompt (Beta)**
   - Toggle: **Add Motion (Video Prompt Only)**
   - Textarea: "Describe what happens next…"
   - Optional dropdowns: Camera motion (pan/dolly/drone/zoom), Pace, Mood
   - Button: **Generate Video Prompt**

6. **Coming Soon (Pro Tiers)**
   - **Prompt Vault (Pro):** save/organize/remix prompts
   - **Prompter License:** advanced sliders + new style packs
   - **Prompter Pro:** storyboard builder, video template packs, experimental modes
   - Voice-to-Prompt, Creator Dashboard, Remix Credits, Quickshare Links

7. **Final CTA**
   - Enter the Beta Experience  •  (Optional) See Examples

8. **Footer**
   - Powered by Claude + AMP Studios. © YEAR

---

## 3) JSON Profile (Hidden; output of Claude Vision)

Serves as helpful analysis data for pre-filling form fields. NOT enforced, fully editable by user.

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

**Usage rule:** These values pre-fill editable form fields. User can change ANY/ALL values freely.

---

## 4) API Contracts (Next.js App Router)

### `POST /api/analyze` → Claude Vision → JSON profile
**Body (multipart):**
- `file` (image, <= `ALLOWED_IMAGE_MAX_MB` MB)

**Response 200:**
```json
{ "profile": { ...JSON PROFILE... }, "message": "Image analyzed successfully" }
```

### `POST /api/prompt` → Claude Text → Final prompt
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
- Use `userSelections` as the source of truth (whatever user entered in form)
- Map `ampd_meter` → creativity/variance scale (low=conservative, high=bold)
- If `output=image_prompt` → generate MJ-style image prompt
- If `output=video_prompt` → generate Sora-style video prompt (no rendering)
- **CRITICAL:** Use current form values, not original detected values

**Response 200:**
```json
{
  "prompt": "FINAL PROMPT STRING",
  "meta": { "mode": "image|video", "ampd_meter": 7, "preset": "cinematic_noir" }
}
```

---

## 5) Prompt Templates

### Image Prompt (MJ-style)
```
[subject from form], {style_preset} mood, {lighting.type} ({lighting.temperature}),
camera {camera.lens}, {camera.angle} angle, {environment.type}, textures {notes},
aspect ratio {aspect_ratio}, creative intensity: {ampd_meter}/10
```

**NOTE:** Use whatever is currently in the form fields. Do NOT add identity preservation notes.

### Video Prompt (Sora-style text; no render)
```
SCENE: {environment.type}, {style_preset} tone, {lighting.type} ({lighting.temperature})
SUBJECT: [from form field]
ACTION: {video_direction}
CAMERA: {camera.motion}, {camera.angle}, {camera.lens}
PACE: {pace}, MOOD: {mood}
NOTES: emphasize {ampd_meter}/10 intensity
OUTPUT: single prompt for video generation tool (no actual render)
```

**NOTE:** Use current form values. No identity preservation language.

---

## 6) UI Acceptance Criteria

- Premium **white—gold on black** theme; serif display + sans body
- Upload gate blocks files > `ALLOWED_IMAGE_MAX_MB` (helpful message)
- Analysis pre-fills form fields with detected values
- **All fields remain fully editable** — user can change anything
- **AMP'd Meter** = vertical fader (1—10) with glow
- Prompt Preview with **Copy** button
- Video Prompt toggle reveals textarea + (optional) dropdowns
- Smooth loading states; mobile-first responsive; Lighthouse ≥ 90
- Success message: "Analysis complete" (neutral, no trait mentions)

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
4. In **Netlify**, click "Add new site → Import from Git", connect repo.
5. Build settings: Framework = Next.js; default build command; default publish dir.
6. Add env vars (`ANTHROPIC_API_KEY`, `ALLOWED_IMAGE_MAX_MB`).
7. Deploy; test upload → analyze → prompt; verify user can edit all fields freely.

---

## 9) Copy Blocks (use as-is)

**Hero Headline:**  
**Visual Alchemy, AMP'd.**

**Hero Subhead:**  
Instant cinematic remixes — no prompt required. Upload. Dial the AMP'd Meter. Unleash.

**CTA:**  
**Enter the Beta Experience**

**How It Works (1—2—3):**  
1) Upload your image  
2) Choose your style + set the AMP'd Meter  
3) Copy your prompt — image or video-ready

**AMP'd Meter Microcopy:**  
Dial the alchemy: from subtle refinement to full transformation.

**Coming Soon (Pro):**  
Prompt Vault • Prompter License • Prompter Pro • Storyboard Builder • Voice-to-Prompt • Creator Dashboard • Remix Credits • Quickshare Links

**Footer:**  
Powered by Claude + AMP Studios. © YEAR

---

## 10) Analysis & Freedom (v3.3 Policy)

**What Analysis Does:**
- Detects subject details (age, gender, ethnicity, hair, eyes)
- Identifies lighting, mood, composition
- Suggests style presets
- Pre-fills form fields with detected values

**What User Can Do:**
- Edit ANY field to match their creative vision
- Change detected ethnicity, hair, eyes, lighting — anything
- No restrictions, no warnings, complete freedom
- Final prompt reflects current form values only

**Success Message:**
- "Analysis complete"
- "Form fields populated with detected values"
- NO mentions of specific traits
- NO "DNA" or "locked" language

---

## 11) Stretch (optional for beta)

- Netlify Blobs: store `{ profile, finalPrompt }` per session
- "Copy Prompt" toast: "Prompt copied — go create"
- Example gallery (static cards) for social proof

---

**Deliverables for Beta**  
- Deployed site (Netlify) connected to GitHub  
- Working: upload → analyze (Claude Vision) → image prompt (MJ-style)  
- Working: video prompt (Sora-style text only)  
- All form fields editable with complete freedom
- Presets + AMP'd Meter + smart analysis
- Premium white—gold theme + amped language
- NO identity locks or restrictions

---

**CRITICAL REMINDER:** See NO_IDENTITY_LOCKS_POLICY.md for authoritative policy on user freedom.
