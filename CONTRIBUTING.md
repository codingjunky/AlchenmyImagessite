# Contributing to AMP'd Images

**Welcome!** This guide ensures anyone working on AMP'd Images (human or AI) builds according to Christopher's vision.

---

## 🎯 Mission Statement

**Give creators instant, editable image remixes—AI that suggests, never dictates.**

This one line guides every decision. When in doubt, ask: "Does this empower the creator or restrict them?"

---

## 📋 Quick Start for AI Agents

**Before coding, read these in order:**
1. This file (CONTRIBUTING.md)
2. NO_IDENTITY_LOCKS_POLICY.md
3. DECISION_GUIDE.md
4. CLAUDE_BUILD_BRIEF.md
5. AMP_D_IMAGES_PROJECT_DNA.md

**Session header (use this at start of every session):**
```
Use AMP Studio v3.3. If docs conflict, ask Christopher; default to freedom. 
No identity locks. Analysis can pre-fill editable fields only. Prompts come 
solely from current form values. Never add lock/preserve language or hidden constraints.
```

---

## 🚫 Hard Rules (Never Violate)

**Never do these things without explicit approval from Christopher:**

1. ❌ **Never lock identity traits** (ethnicity, hair, eyes, etc.)
2. ❌ **Never make detected fields read-only** or sticky after analysis
3. ❌ **Never insert hidden prefixes/notes** like `[IDENTITY LOCKED]`, "preserve identity", or `--note` constraints
4. ❌ **Never overwrite user-edited fields** after they've changed them
5. ❌ **Never expose internal JSON/IDs** ("secret sauce") in the UI
6. ❌ **Never add warnings that police identity choices** - keep language neutral
7. ❌ **Never gate baseline features** or collect extra data without approval

**Why these rules exist:**
- Users need complete creative freedom
- AI should help, not restrict
- No ethical gatekeeping in the product

---

## ✅ Guiding Principles

When you're unsure, default to:

| Instead of... | Choose... |
|--------------|-----------|
| Guardrails | Freedom |
| Constraints | Suggestions |
| Hidden logic | Visible choices |
| Forced behavior | Opt-in toggles (OFF by default) |
| Assuming | Asking first |

**Example:**
- ❌ "I'll add a confirmation dialog before changing ethnicity"
- ✅ "Should I add a confirmation? Or just let users edit freely?"

---

## 🔄 When Documentation Conflicts

Documentation may have conflicting instructions. Here's how to resolve:

### Step 1: Check Version & Date
- Newer version number wins (v3.3 > v3.2)
- More recent date wins (Oct 31, 2025 > Oct 24, 2025)
- Files marked "OBSOLETE" should be ignored

### Step 2: If Still Ambiguous
- **Stop and ask Christopher** which is current
- **Until answered:** Default to more freedom, not less
- **Never guess** which doc is correct

### Step 3: Log Your Decision
Create a short "Decision Note" documenting:
- What conflicted
- What you chose
- Why you chose it

**Example Decision Note:**
```
DECISION NOTE: Conflict between BUILD_BRIEF v2.1 (says "lock ethnicity") 
and NO_IDENTITY_LOCKS_POLICY v3.3 (says "no locks"). 
Chose v3.3 because newer and explicitly marked as authoritative.
```

---

## 🚧 If a Doc Proposes Restrictions

**Before implementing any restriction:**

### 1. Ask These Questions:
- "What problem does this restriction solve?"
- "Can we ship it as an optional toggle (OFF by default)?"
- "Please confirm this overrides v3.3 No-Identity-Locks policy"

### 2. Wait for Explicit Confirmation
- ❌ Don't implement until Christopher confirms
- ❌ Don't assume restrictions are wanted
- ✅ Propose freedom-preserving alternatives

### 3. Suggest Alternatives
Instead of restrictions, consider:
- Making it opt-in (disabled by default)
- Adding a confirmation dialog
- Showing a warning instead of blocking
- Letting user choose their own guardrails

**Example:**
```
I see the spec mentions "preventing changes to detected ethnicity."

Questions:
- What user problem does this solve?
- Could we instead add an optional "Lock Analysis" toggle (OFF by default)?
- This would override v3.3 No-Identity-Locks - please confirm if you want this.

Alternative: Let users edit freely (current behavior), but add a "Reset to Analysis" 
button if they want to restore original values.

Which approach do you prefer?
```

---

## 💬 Communication Templates

Use these templates when asking Christopher for clarification:

### Conflict Noticed
```
I see conflicting instructions:
- [Doc A] (v[X]) says: [quote]
- [Doc B] (v[Y]) says: [quote]

Which is current? I'll default to freedom ([option]) until you confirm.
```

### Restriction Proposed
```
This adds a restriction: [describe restriction]

Questions:
- What user problem does it solve?
- Should it be an optional toggle (OFF by default)?
- Please confirm this overrides v3.3 No-Identity-Locks before I proceed.
```

### Ambiguous Specification
```
Two viable paths for [feature]:
- Option A: [describe] (more freedom, fewer surprises)
- Option B: [describe] (more control, possible confusion)

I recommend Option A for user freedom. Approve?
```

---

## 🔍 Code Review Checklist

Before submitting changes, verify:

- [ ] No identity traits are locked or read-only
- [ ] All form fields remain editable after analysis
- [ ] No hidden prefixes in prompts (no `[IDENTITY LOCKED]`)
- [ ] No preservation notes added automatically
- [ ] Success messages are neutral (no trait mentions)
- [ ] Prompts use current form values, not original detected values
- [ ] No warnings that police user choices
- [ ] User has complete creative freedom

---

## 📁 File Organization

```
/
├── CONTRIBUTING.md           ← You are here
├── DECISION_GUIDE.md         ← Detailed decision framework
├── NO_IDENTITY_LOCKS_POLICY.md  ← Core policy (read this!)
├── CLAUDE_BUILD_BRIEF.md     ← Technical spec
├── AMP_D_IMAGES_PROJECT_DNA.md  ← Architecture guide
├── public/
│   └── studio.html           ← Main application
└── netlify/functions/
    ├── analyze.js            ← Claude Vision endpoint
    └── prompt.js             ← Prompt generation
```

---

## 🎨 Design Philosophy

**Core Values:**
1. **Freedom First** - Let users create without constraints
2. **AI as Assistant** - Suggest, don't dictate
3. **Transparency** - Show what AI detected, let user decide
4. **Simplicity** - Complex tech, simple UX
5. **Speed** - Fast analysis, fast generation

**Not Our Values:**
- ❌ Ethical policing
- ❌ Restricting creativity
- ❌ Enforcing "correct" choices
- ❌ Hidden guardrails

---

## 🐛 Bug Reports & Features

**When reporting bugs:**
1. Describe what you expected
2. Describe what actually happened
3. Include browser console errors
4. Link to Netlify deploy/function logs

**When proposing features:**
1. Explain the user problem it solves
2. Propose how it works (with freedom in mind)
3. Ask if it aligns with mission
4. Wait for approval before building

---

## 📞 Getting Help

**If you're stuck:**
1. Re-read NO_IDENTITY_LOCKS_POLICY.md
2. Check DECISION_GUIDE.md
3. Ask Christopher directly
4. When in doubt, choose freedom over restriction

**Contact:**
- GitHub Issues: [your repo]
- Project Owner: Christopher

---

## 📜 Version History

- **v3.3** (2025-10-31): Current - No identity locks
- **v3.2** (2025-10-31): Obsolete - Had locks (mistake)
- **v3.1** (2025-10-31): Obsolete - Had locks from old spec

---

## 🙏 Thank You

Thanks for contributing to AMP'd Images! Your work helps creators bring their visions to life without restrictions.

**Remember:** AI suggests, never dictates. 🎨✨

---

*Questions? Ask Christopher first. Default to freedom when unsure.*
