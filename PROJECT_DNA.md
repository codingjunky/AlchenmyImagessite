# AMP'D IMAGES - PROJECT DNA
**Last Updated:** October 31, 2025  
**Purpose:** Master blueprint for all developers/AIs working on this project

---

## 🎯 WHAT THIS IS

AMP'd Images is NOT an art generator.  
It's a **Visual DNA Extractor** + **Creative Handoff System**.

**The Magic:** Upload image → AI extracts DNA → User tweaks → Get professional prompts  
**The Goal:** Anyone can create pro-level prompts without being a prompt engineer

---

## 🧬 CORE PHILOSOPHY

1. **DNA First** - Analysis happens automatically on upload
2. **Identity Locks** - Ethnicity, hair, eyes NEVER change
3. **Two Paths** - Image remix OR Video scene
4. **Clean Output** - Master Prompts (MidJourney/Sora style), not raw JSON
5. **Visual Alchemy** - Brand voice: bold, premium, black/gold theme

---

## 📐 THE FLOW (Sacred - Don't Change Without Discussion)

### Stage 1: Upload
- **Purpose:** Get the image into Claude's hands
- **User Action:** Click upload/drag/camera
- **What Happens:** File → `/api/analyze` → Claude Vision extracts DNA
- **Visual State:** "Analyzing your image..." (progress bar)
- **Success State:** DNA stored with sessionId → show confirmation

### Stage 2: DNA Display
- **Purpose:** Show user what was detected
- **Visual:** Identity section shows:
  - Ethnicity: [X] 🔒
  - Hair Color: [X] 🔒  
  - Eye Color: [X] 🔒
  - Lighting, mood, scene details
- **User Action:** Review DNA, choose path (Image OR Video)

### Stage 3: Refinement Workspace
- **Purpose:** Let user AMP it up with controls
- **Controls:**
  - Style Presets (Cinematic Noir, Anime, etc.)
  - AMP'd Meter (1-100 intensity)
  - Lighting, Aspect Ratio, Camera Angle
- **Rule:** Presets CANNOT override Identity Locks
- **User Action:** Adjust sliders → Click "Generate Prompt"

### Stage 4: Output Display
- **Purpose:** Show the final Master Prompt
- **Visual:** Clean text box (like MidJourney)
- **Actions:** Copy button, Export JSON, Share link
- **Format Options:** MidJourney / Flex / Generic

---

## 🔒 IRON RULES (Never Violate)

1. **Auto-Analysis:** Upload MUST immediately call `/api/analyze` - not optional
2. **Identity Locks:** Ethnicity, Hair, Eyes are read-only after analysis
3. **Session-Based:** Every action uses sessionId for continuity
4. **No JSON Exposure:** Users see Master Prompts, not raw Claude JSON
5. **Brand Voice:** Copy from `CLAUDE_BUILD_BRIEF.md` is exact, don't rewrite

---

## 🏗️ ARCHITECTURE

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
/components/UploadWorkspace.tsx - Upload handler + DNA display
/components/AmpdUIKit.tsx       - Output console + analyzer
/app/page.tsx                   - Main single-page layout
/app/globals.css                - Black/gold theme tokens
```

### API Contracts:

**POST `/api/analyze`**
- Input: `FormData` with `file`
- Process: File → base64 → Claude Vision
- Output: `{ profile: {...DNA...}, sessionId }`
- Stores: Session data in Netlify Blobs

**POST `/api/prompt`**
- Input: `{ profile, userSelections, output: "image"|"video" }`
- Process: Merge DNA + selections → format Master Prompt
- Output: `{ prompt: "...", meta: {...} }`
- Rules: Respects Identity Locks

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

## 🐛 CURRENT STATE (As of Oct 31, 2025)

### What Works:
- ✅ UI renders correctly
- ✅ Upload button accepts files
- ✅ API routes exist and deploy
- ✅ Brand design implemented

### What's Broken:
- ❌ Upload doesn't call `/api/analyze` automatically
- ❌ No "Analyzing..." state visible to user
- ❌ DNA results don't populate Identity section
- ❌ Generate button doesn't trigger prompt creation

### Root Cause:
**Connection gap** between frontend and backend - components exist but aren't wired together.

---

## 🔧 FIX CHECKLIST

Before any AI says "it's fixed," verify ALL of these:

1. [ ] Upload image → See "Analyzing..." progress bar
2. [ ] Wait 2-3 seconds → Analysis completes
3. [ ] Identity section populates with detected values
4. [ ] Locked fields show 🔒 icon
5. [ ] Adjust AMP'd Meter → Value updates
6. [ ] Click "Generate" → Prompt appears in output
7. [ ] Click "Copy" → Prompt copies to clipboard
8. [ ] Check Netlify logs → No 400/500 errors

---

## 🚫 WHAT NOT TO DO

1. **Don't rewrite the UI** without explicit approval
2. **Don't change the copy** from BUILD_BRIEF
3. **Don't alter the logos** (provided by user)
4. **Don't expose JSON** to end users
5. **Don't override Identity Locks** with presets
6. **Don't make up your own design language**

---

## 💬 COMMUNICATION PROTOCOL

When an AI joins a session:

1. **Read this document first** (before touching code)
2. **Check current Git commit** to see actual state
3. **Ask clarifying questions** before assuming
4. **Test each fix** before moving to next
5. **Update this document** if architecture changes

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
1. Read `PROJECT_DNA.md` first
2. Read latest `SESSION_N_HANDOFF.md`
3. Check Git log for recent commits
4. Verify claims before proceeding

---

## 🎯 SUCCESS DEFINITION

AMP'd Images succeeds when:
- **10-year-old can use it:** Upload → get prompt
- **Artist trusts it:** DNA extraction is accurate
- **Pro adopts it:** Saves hours of prompt engineering
- **Creator shares it:** "I made this with AMP'd Images"

---

**This document is the SOURCE OF TRUTH.**  
When in doubt, come back here.  
When you change architecture, update this.  
When you finish a session, mark progress.

---

*"Visual Alchemy, AMP'd."*
