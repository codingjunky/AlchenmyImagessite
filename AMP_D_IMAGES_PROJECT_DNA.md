# AMP'D IMAGES - PROJECT DNA v3.3 (NO LOCKS)
**Last Updated:** October 31, 2025  
**Purpose:** Master blueprint for all developers/AIs working on this project

**POLICY:** NO identity locks. Complete creative freedom. See NO_IDENTITY_LOCKS_POLICY.md

---

## 🎯 WHAT THIS IS

AMP'd Images is NOT an art generator.  
It's a **Visual Analysis Assistant** + **Creative Prompt Builder**.

**The Magic:** Upload image → AI analyzes → User customizes → Get professional prompts  
**The Goal:** Anyone can create pro-level prompts without being a prompt engineer

---

## 🧬 CORE PHILOSOPHY

1. **Analysis First** - AI examines image automatically on upload
2. **Suggestions, Not Restrictions** - Detected values are helpful starting points
3. **Complete Freedom** - User can edit ANYTHING at ANY time
4. **Two Paths** - Image remix OR Video scene
5. **Clean Output** - Master Prompts (MidJourney/Sora style), not raw JSON
6. **Visual Alchemy** - Brand voice: bold, premium, black/gold theme

---

## 🔓 THE FLOW (Sacred - Don't Change Without Discussion)

### Stage 1: Upload
- **Purpose:** Get the image into Claude's hands
- **User Action:** Click upload/drag/camera
- **What Happens:** File → `/api/analyze` → Claude Vision analyzes image
- **Visual State:** "Analyzing your image..." (progress bar)
- **Success State:** Analysis complete → show confirmation

### Stage 2: Analysis Results
- **Purpose:** Show user what was detected and pre-fill form
- **Visual:** Form fields populate with detected values:
  - Subject: [Detected description]
  - Lighting: [Detected lighting type]
  - Camera Angle: [Detected angle]
  - Aspect Ratio: [Detected ratio]
- **User Action:** Review, edit any values freely, choose path (Image OR Video)
- **CRITICAL:** All fields remain editable — no locks, no restrictions

### Stage 3: Refinement Workspace
- **Purpose:** Let user AMP it up with controls
- **Controls:**
  - Style Presets (Cinematic Noir, Anime, etc.)
  - AMP'd Meter (1-100 intensity)
  - Lighting, Aspect Ratio, Camera Angle
  - Subject, Setting (all editable text fields)
- **Rule:** User can change ANYTHING — complete creative freedom
- **User Action:** Adjust sliders → Click "Generate Prompt"

### Stage 4: Output Display
- **Purpose:** Show the final Master Prompt
- **Visual:** Clean text box (like MidJourney)
- **Actions:** Copy button, Export JSON, Share link
- **Format Options:** MidJourney / Flex / Generic
- **CRITICAL:** Prompt reflects current form values, not original detected values

---

## 🔓 IRON RULES (Never Violate)

1. **Auto-Analysis:** Upload MUST immediately call `/api/analyze` - not optional
2. **Complete Freedom:** ALL form fields must remain editable at all times
3. **Session-Based:** Every action uses sessionId for continuity
4. **No JSON Exposure:** Users see Master Prompts, not raw Claude JSON
5. **Brand Voice:** Copy from `CLAUDE_BUILD_BRIEF.md` is exact, don't rewrite
6. **NO LOCKS:** Never restrict what users can change — see NO_IDENTITY_LOCKS_POLICY.md

---

## 🗿 ARCHITECTURE

### Tech Stack:
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Netlify Functions
- **AI:** Claude Sonnet 4 (Vision + Text)
- **Storage:** Netlify Blobs (temp), Supabase (later)

### Key Files:
```
/app/api/analyze/route.ts       - Claude Vision analysis
/app/api/prompt/route.ts        - Master Prompt generation
/components/UploadWorkspace.tsx - Upload handler + form
/components/AmpdUIKit.tsx       - Output console + analyzer
/app/page.tsx                   - Main single-page layout
/app/globals.css                - Black/gold theme tokens
```

### API Contracts:

**POST `/api/analyze`**
- Input: `FormData` with `file`
- Process: File → base64 → Claude Vision
- Output: `{ profile: {...analysis data...}, message: "..." }`
- Stores: Session data in Netlify Blobs
- Purpose: Provide helpful analysis to pre-fill form fields

**POST `/api/prompt`**
- Input: `{ profile, userSelections, output: "image"|"video" }`
- Process: Use userSelections (current form values) → format Master Prompt
- Output: `{ prompt: "...", meta: {...} }`
- Rules: Use current form values, NOT original detected values

---

## 🎨 DESIGN SYSTEM

### Colors:
```css
--ink: #0B0B0C     /* page bg */
--gold: #D6B25E    /* primary accent */
--paper: #F5F3EF   /* text on dark */
--muted: #9CA3AF   /* secondary text */
```

### Typography:
- **Display:** Clash Display (or Migra)
- **Body:** Inter (or Satoshi)

### Components:
- **ampd-surface:** Dark panel with subtle border
- **ampd-btn:** Gold accent button
- **ampd-meter:** Horizontal slider with glow

---

## 📊 CURRENT STATE (As of Oct 31, 2025 - v3.3)

### What Works:
- ✅ UI renders correctly
- ✅ Upload button accepts files
- ✅ API routes exist and deploy
- ✅ Claude Vision analysis works
- ✅ Form fields pre-populate from analysis
- ✅ User can edit all fields freely
- ✅ Prompt generation uses current form values
- ✅ NO identity locks or restrictions
- ✅ Brand design implemented

### Policy Changes:
- ✅ Identity locks REMOVED (v3.3)
- ✅ Complete creative freedom implemented
- ✅ Neutral success messages (no DNA/lock language)
- ✅ Prompts reflect user's current choices

---

## 🔧 FUNCTIONALITY CHECKLIST

Before any AI says "it's fixed," verify ALL of these:

1. [ ] Upload image → See "Analyzing..." progress bar
2. [ ] Wait 2-3 seconds → Analysis completes
3. [ ] Form fields populate with detected values
4. [ ] User can edit ANY field (subject, lighting, etc.)
5. [ ] Adjust AMP'd Meter → Value updates
6. [ ] Click "Generate" → Prompt appears using current form values
7. [ ] Prompt does NOT include "[IDENTITY LOCKED: ...]" prefix
8. [ ] Click "Copy" → Prompt copies to clipboard
9. [ ] Check Netlify logs → No 400/500 errors
10. [ ] Success toast: "Analysis complete" (neutral, no trait mentions)

---

## 🚫 WHAT NOT TO DO

1. **Don't add identity locks** - User must have complete freedom
2. **Don't rewrite the UI** without explicit approval
3. **Don't change the copy** from BUILD_BRIEF
4. **Don't alter the logos** (provided by user)
5. **Don't expose JSON** to end users
6. **Don't restrict form fields** based on detected values
7. **Don't make up your own design language**
8. **Don't add preservation language** to prompts

---

## 💬 COMMUNICATION PROTOCOL

When an AI joins a session:

1. **Read NO_IDENTITY_LOCKS_POLICY.md FIRST** (before touching code)
2. **Read this document** (PROJECT_DNA)
3. **Check current Git commit** to see actual state
4. **Ask clarifying questions** before assuming
5. **Test each fix** before moving to next
6. **Update this document** if architecture changes

When user says "it's broken":
1. **Ask what they see** (not what error message says)
2. **Check Netlify logs** for actual errors
3. **Test the flow end-to-end** before declaring fixed
4. **Update CURRENT STATE** section of this doc

---

## 📞 HANDOFF BETWEEN SESSIONS

When ending a session, AI should:
1. Update **CURRENT STATE** section
2. Create `SESSION_N_HANDOFF.md` with:
   - What was attempted
   - What worked
   - What's still broken
   - Next steps
3. Commit both files to Git

Next AI should:
1. Read `NO_IDENTITY_LOCKS_POLICY.md` first
2. Read `PROJECT_DNA.md` second
3. Read latest `SESSION_N_HANDOFF.md`
4. Check Git log for recent commits
5. Verify claims before proceeding

---

## 🎯 SUCCESS DEFINITION

AMP'd Images succeeds when:
- **10-year-old can use it:** Upload → edit → get prompt
- **Artist trusts it:** Analysis is accurate and helpful
- **Pro adopts it:** Saves hours of prompt engineering
- **Creator shares it:** "I made this with AMP'd Images"
- **Complete freedom:** Users can customize everything

---

## 📝 VERSION HISTORY

- **v3.3** (2025-10-31): Removed identity locks. Complete freedom implemented.
- **v3.2** (2025-10-31): ❌ OBSOLETE - Had identity locks (mistake)
- **v3.1** (2025-10-31): ❌ OBSOLETE - Had identity locks from old spec
- **Earlier**: Old spec had identity locks - no longer valid

---

**This document is the SOURCE OF TRUTH.**  
When in doubt, come back here.  
When you change architecture, update this.  
When you finish a session, mark progress.

**For authoritative policy on user freedom, see NO_IDENTITY_LOCKS_POLICY.md**

---

*"Visual Alchemy, AMP'd — Your vision, your way."*
