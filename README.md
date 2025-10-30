# 🎬 AMPâ€™d UP IMAGES

**Visual Alchemy, AMPâ€™d.**

Instant cinematic remixes — no prompt required. Upload. Dial the AMPâ€™d Meter. Unleash.

---

## 🚀 Features

- **🔒 Identity Locks:** Ethnicity, hair color, and eye color are automatically detected and protected — never overridden
- **🎨 8 Style Presets:** From Cinematic Noir to Futuristic Cyberpunk
- **⚡ AMPâ€™d Meter:** Vertical fader (1-10) controls creative intensity
- **🖼️ Image Prompts:** Generate Midjourney-style prompts
- **🎬 Video Prompts:** Generate Sora-style video prompts (text only, no rendering)
- **🤖 Powered by Claude:** Vision API for analysis, Text API for prompt generation

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 + Custom brand system
- **AI:** Anthropic Claude (Vision + Text)
- **Deployment:** Netlify
- **Storage:** Netlify Blobs (future: Supabase for Prompt Vault)

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Anthropic API key

### Steps

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd ampd-images
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:
```env
ANTHROPIC_API_KEY=your_api_key_here
ALLOWED_IMAGE_MAX_MB=10
```

4. **Run development server:**
```bash
npm run dev
```

5. **Open in browser:**
```
http://localhost:3000
```

---

## 🎨 Brand System

### Colors
- **Ink:** `#0B0B0C` (page background)
- **Ink-2:** `#121214` (panels)
- **Paper:** `#F5F3EF` (primary text)
- **Gold:** `#D6B25E` (accent)
- **Gold-2:** `#F0D58B` (hover/shine)
- **Muted:** `#9CA3AF` (secondary text)

### Typography
- **Body/UI:** Inter
- **Display:** (Future: Clash Display or Migra)

---

## 📁 Project Structure

```
ampd-images/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts    # Claude Vision image analysis
│   │   └── prompt/route.ts     # Claude Text prompt generation
│   ├── globals.css             # Brand colors & animations
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page (all sections)
├── components/
│   ├── Hero.tsx                # Landing hero section
│   ├── HowItWorks.tsx          # 1-2-3 steps
│   ├── FeatureGrid.tsx         # Features + Identity Locks
│   ├── UploadWorkspace.tsx     # Interactive upload + controls
│   ├── VideoPromptPanel.tsx    # Video prompt generator
│   ├── PromptPreview.tsx       # Prompt display + copy
│   ├── ComingSoon.tsx          # Pro tier features
│   └── Footer.tsx              # Final CTA + branding
├── public/
│   ├── Ampd_Image_logo.jpg     # Product logo
│   └── AmpStudio_Logo.webp     # Company logo
├── CLAUDE_BUILD_BRIEF.md       # Original build specification
├── BUILD_STATUS.md             # Development progress tracker
└── README.md                   # This file
```

---

## 🔑 API Routes

### POST /api/analyze
Analyzes uploaded image using Claude Vision API.

**Request:**
- `Content-Type: multipart/form-data`
- `file`: Image file (≤10MB)

**Response:**
```json
{
  "profile": {
    "subjects": [...],
    "environment": {...},
    "lighting": {...},
    "camera": {...},
    "notes": "..."
  }
}
```

### POST /api/prompt
Generates image or video prompt using Claude Text API.

**Request:**
```json
{
  "profile": {...},
  "userSelections": {
    "preset": "cinematic_noir",
    "ampd_meter": 7,
    "lighting": "cinematic",
    "aspect_ratio": "16:9",
    "camera_angle": "eye"
  },
  "output": "image_prompt|video_prompt"
}
```

**Response:**
```json
{
  "prompt": "Generated prompt text...",
  "meta": {
    "mode": "image|video",
    "ampd_meter": 7,
    "preset": "cinematic_noir"
  }
}
```

---

## 🚀 Deployment (Netlify)

1. **Push to GitHub:**
```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import from Git"
   - Select your GitHub repository
   - Framework: Next.js (auto-detected)
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Add Environment Variables in Netlify:**
   - Go to Site Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY`
   - Add `ALLOWED_IMAGE_MAX_MB`

4. **Deploy!**
   - Click "Deploy site"
   - Your site will be live at `https://your-site.netlify.app`
   - Configure custom domain (ampdimages.com) in Site Settings

---

## 🔐 Identity Locks

**CRITICAL FEATURE:** The app automatically detects and locks:
- Ethnicity
- Hair color
- Eye color

These attributes are:
- ✅ Detected by Claude Vision in `/api/analyze`
- ✅ Preserved in JSON profile
- ✅ Never overridden by style presets
- ✅ Never modified by AMPâ€™d Meter
- ✅ Always included in final prompts

---

## 🎯 Coming Soon (Pro Tiers)

- **Prompt Vault (Pro):** Save, organize, and remix prompts
- **Prompter License:** Advanced sliders + new style packs
- **Prompter Pro:** Storyboard builder, video template packs, experimental modes
- Voice-to-Prompt
- Creator Dashboard
- Remix Credits
- Quickshare Links

---

## 📝 License

© 2025 AMP Studios. All rights reserved.

---

## 🙏 Powered By

- **Claude** by Anthropic
- **AMP Studios**
