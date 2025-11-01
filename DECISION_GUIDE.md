# Decision Guide for AMP'd Images

**Purpose:** Detailed framework for making good decisions when building AMP'd Images.

**Audience:** AI agents, developers, contributors

---

## 🎯 Core Decision Framework

When facing any decision, ask these questions in order:

### 1. Does it give users more freedom or less?
- ✅ More freedom → Probably good
- ❌ Less freedom → Question it heavily

### 2. Does it align with the mission?
**Mission:** "Give creators instant, editable image remixes—AI that suggests, never dictates."
- ✅ Aligns → Proceed
- ❌ Conflicts → Stop and ask Christopher

### 3. Would a user expect this behavior?
- ✅ Unsurprising → Good UX
- ❌ Surprising → Might need rethinking

### 4. Is it optional or forced?
- ✅ Optional (opt-in) → Usually fine
- ❌ Forced → Needs strong justification

### 5. Can you explain it simply?
- ✅ Simple explanation → Probably good design
- ❌ Complex explanation → Maybe overengineered

---

## 🔀 Decision Trees

### When You Want to Add a Restriction

```
START: I want to add [restriction]

Q: What user problem does it solve?
├─ No clear problem → DON'T ADD IT
└─ Clear problem exists
   |
   Q: Can we solve it without restricting?
   ├─ Yes → USE THE NON-RESTRICTIVE SOLUTION
   └─ No, restriction seems necessary
      |
      Q: Can it be optional (OFF by default)?
      ├─ Yes → MAKE IT OPT-IN, ASK CHRISTOPHER
      └─ No, must be forced
         |
         Q: Does it override v3.3 No-Identity-Locks?
         ├─ Yes → STOP, ASK CHRISTOPHER EXPLICITLY
         └─ No → ASK CHRISTOPHER ANYWAY
```

**Example:**
```
"I want to prevent users from changing detected ethnicity"

Q: What problem does it solve?
A: Prevents misrepresentation of people in images

Q: Can we solve it without restricting?
A: Yes - we could show original detection and let user compare
A: Yes - we could add educational tooltips
A: Yes - we could let users choose their own ethics

→ USE NON-RESTRICTIVE SOLUTION
```

### When Documentation Conflicts

```
START: Doc A says X, Doc B says Y

Q: Does one have a newer version number?
├─ Yes → USE THE NEWER VERSION
└─ No, same version or no versions
   |
   Q: Does one have a more recent date?
   ├─ Yes → USE THE MORE RECENT
   └─ No, same date or no dates
      |
      Q: Is one marked "OBSOLETE" or "DEPRECATED"?
      ├─ Yes → USE THE NON-OBSOLETE ONE
      └─ No, both seem current
         |
         Q: Does one give more freedom?
         ├─ Yes → DEFAULT TO MORE FREEDOM
         |          LOG DECISION
         |          ASK CHRISTOPHER FOR CONFIRMATION
         └─ Same level of freedom
            |
            STOP → ASK CHRISTOPHER WHICH IS CURRENT
```

**Example:**
```
Doc A (v3.1, no date): "Lock ethnicity field"
Doc B (v3.3, Oct 31): "No locks, complete freedom"

→ v3.3 is newer
→ v3.3 has date, v3.1 doesn't
→ USE v3.3
→ Log: "Chose v3.3 over v3.1 due to version number"
```

### When Feature Request Is Ambiguous

```
START: "Add [vague feature]"

Q: Can I interpret it two ways?
├─ No, pretty clear → IMPLEMENT AS SPECIFIED
└─ Yes, multiple interpretations
   |
   Q: Does one interpretation give more freedom?
   ├─ Yes → PROPOSE THE FREEDOM VERSION
   |          "I see two options: A (more freedom) and B (more restriction)"
   |          "I recommend A. Approve?"
   └─ No, equal freedom
      |
      Q: Does one interpretation seem simpler?
      ├─ Yes → PROPOSE THE SIMPLER VERSION
      |          "Two options: A (simpler) and B (complex)"
      |          "I recommend A for better UX. Approve?"
      └─ No, equally complex
         |
         ASK → "Two viable paths: A [describe] and B [describe]"
               "Which do you prefer?"
```

---

## 📊 Decision Matrix Examples

### Example 1: Field Locking

| Scenario | Decision | Reasoning |
|----------|----------|-----------|
| Lock ethnicity after detection | ❌ DON'T | Violates v3.3, removes freedom |
| Make all fields read-only | ❌ DON'T | Users need to edit |
| Disable fields until analysis | ❌ DON'T | Adds unnecessary friction |
| Pre-fill fields but keep editable | ✅ DO | Helpful + freedom |

### Example 2: Prompt Generation

| Scenario | Decision | Reasoning |
|----------|----------|-----------|
| Add `[IDENTITY LOCKED]` prefix | ❌ DON'T | Violates v3.3 policy |
| Add preservation notes | ❌ DON'T | Restricts user intent |
| Use original detected values | ❌ DON'T | Ignores user edits |
| Use current form values | ✅ DO | Respects user choices |

### Example 3: User Feedback

| Scenario | Decision | Reasoning |
|----------|----------|-----------|
| "DNA Extracted: [traits]" | ❌ DON'T | Mentions specific traits |
| "Identity locked" | ❌ DON'T | Implies restrictions |
| "Analysis complete" | ✅ DO | Neutral, informative |
| "Fields populated" | ✅ DO | Clear, non-restrictive |

### Example 4: Feature Additions

| Scenario | Decision | Reasoning |
|----------|----------|-----------|
| "Lock Analysis" toggle (OFF) | ✅ ASK | Optional feature, might be useful |
| "Preserve Identity" checkbox | ❌ DON'T | Conflicts with v3.3 |
| "Reset to Analysis" button | ✅ DO | Helpful, doesn't restrict |
| Automatic identity enforcement | ❌ DON'T | Forced restriction |

---

## 🗣️ Communication Scripts

### Script 1: Conflicting Documentation

```
Hi Christopher,

I found conflicting instructions:

📄 File A: [filename] (version, date)
Says: "[quote the relevant part]"

📄 File B: [filename] (version, date)  
Says: "[quote the relevant part]"

Based on [version/date/freedom], I'm defaulting to File B's approach: [explain].

Can you confirm File B is current, or should I use File A instead?

Decision logged in: [link to commit/note]
```

### Script 2: Restriction Proposed in Spec

```
Hi Christopher,

I'm implementing [feature] and the spec mentions: "[quote restriction]"

This would [describe what it restricts].

Questions:
1. What user problem does this solve?
2. Could we make it optional (OFF by default)?
3. This appears to override v3.3 No-Identity-Locks - please confirm you want this.

Alternatives I can propose:
- [Alternative 1: non-restrictive approach]
- [Alternative 2: opt-in approach]

Which approach do you prefer?
```

### Script 3: Ambiguous Specification

```
Hi Christopher,

The spec says: "[quote]"

I see two ways to implement this:

**Option A: [Freedom-focused]**
- [How it works]
- Pro: [benefits]
- Con: [drawbacks]

**Option B: [Restriction-focused]**
- [How it works]
- Pro: [benefits]
- Con: [drawbacks]

I recommend Option A because [reasoning focused on freedom].

Approve Option A, or would you prefer Option B?
```

### Script 4: Uncertainty About Intent

```
Hi Christopher,

I'm not sure about the intent of [feature/requirement].

It could mean:
1. [Interpretation 1]
2. [Interpretation 2]

Could you clarify which interpretation is correct?

If helpful, here's how each would work:
[Brief explanation of each]
```

---

## 🎯 Red Flags (Stop and Ask)

If you encounter these, STOP and ask Christopher:

### 🚩 Red Flag 1: Restriction Without Clear Benefit
```
Spec: "Users cannot change ethnicity after analysis"
Ask: "What problem does this solve? Can we make it opt-in instead?"
```

### 🚩 Red Flag 2: Hidden Behavior
```
Spec: "Silently preserve original ethnicity in prompt even if user changed it"
Ask: "This seems to ignore user choices. Is this intentional?"
```

### 🚩 Red Flag 3: Forced Behavior
```
Spec: "Always show warning when ethnicity changes"
Ask: "Can this be optional? Or shown once with 'don't show again'?"
```

### 🚩 Red Flag 4: Conflicts With v3.3
```
Spec: "Lock hair color and eye color fields"
Ask: "This conflicts with v3.3 No-Identity-Locks. Confirm override?"
```

### 🚩 Red Flag 5: Surprising Behavior
```
Spec: "Ethnicity changes require email confirmation"
Ask: "This seems like surprising friction. Is this requirement critical?"
```

### 🚩 Red Flag 6: Data Collection
```
Spec: "Log all ethnicity changes to analytics"
Ask: "What's the purpose? Do users know? Do we have consent?"
```

---

## ✅ Green Lights (Proceed Confidently)

These are safe to implement without asking:

### ✅ Green Light 1: Helpful Suggestions
```
Feature: Pre-fill form fields from analysis
Proceed: Yes - helpful and non-restrictive
```

### ✅ Green Light 2: Opt-In Features
```
Feature: "Save Analysis" checkbox (OFF by default)
Proceed: Yes - optional, user choice
```

### ✅ Green Light 3: Neutral Feedback
```
Feature: "Analysis complete" toast notification
Proceed: Yes - informative, non-restrictive
```

### ✅ Green Light 4: User Control
```
Feature: "Reset to Analysis" button
Proceed: Yes - gives user options
```

### ✅ Green Light 5: Transparency
```
Feature: Show what Claude detected before user edits
Proceed: Yes - transparent and helpful
```

### ✅ Green Light 6: Standard UX
```
Feature: Loading spinner during analysis
Proceed: Yes - expected behavior
```

---

## 📝 Decision Log Template

When you make a significant decision, log it:

```markdown
# Decision Log Entry [YYYY-MM-DD]

## Decision: [Brief title]

### Context
- What needed to be decided
- Why it wasn't obvious
- What documentation was involved

### Options Considered
1. Option A: [describe]
   - Pros: [list]
   - Cons: [list]
2. Option B: [describe]
   - Pros: [list]
   - Cons: [list]

### Decision Made
Chose: [Option X]

### Reasoning
- [Why this option was chosen]
- [How it aligns with mission]
- [What it preserves/enables]

### Approval
- [ ] Self-approved (clear green light)
- [ ] Asked Christopher (pending)
- [X] Christopher approved (date)

### Implementation
- Files changed: [list]
- Commit: [hash/link]
- Deployed: [yes/no/date]
```

---

## 🎓 Case Studies

### Case Study 1: The Identity Lock Mistake (v3.2)

**What Happened:**
AI read old docs mentioning "Identity Locks" and implemented:
- `[IDENTITY LOCKED: ...]` prefix in prompts
- MidJourney preservation notes
- "DNA Extracted: [traits]" toast messages

**What Went Wrong:**
- Didn't check document versions
- Didn't question restrictive language
- Didn't ask Christopher first
- Implemented restrictions without confirmation

**What Should Have Happened:**
1. Notice "Identity Locks" in spec
2. Question: "This restricts user freedom - is this current?"
3. Check for newer documentation
4. Find NO_IDENTITY_LOCKS_POLICY.md
5. Default to freedom
6. Ask Christopher to confirm policy

**Lesson:** Always question restrictions, check doc versions, default to freedom.

### Case Study 2: Optional Feature Done Right

**Scenario:**
AI wants to add "Pin Analysis" button that preserves detected values while user experiments.

**What AI Did:**
1. ✅ Recognized this could be helpful
2. ✅ Proposed it as opt-in (not forced)
3. ✅ Asked Christopher first: "Should I add an optional 'Pin Analysis' button (OFF by default) so users can experiment and easily return to detected values?"
4. ✅ Waited for approval
5. ✅ Implemented as optional after approval

**Lesson:** Optional features that add capability (not restriction) are usually good, but still ask first.

---

## 🔄 Version Management

### How to Handle Version Conflicts

**Scenario:** Two files with different versions give conflicting info.

**Step 1: Identify Versions**
```
File A: CLAUDE_BUILD_BRIEF.md (v2.1, no date)
File B: CLAUDE_BUILD_BRIEF_v3_3.md (v3.3, Oct 31, 2025)
```

**Step 2: Apply Rules**
- v3.3 > v2.1 (higher version wins)
- Oct 31, 2025 > no date (dated wins)
- "v3_3" in filename suggests intent

**Step 3: Choose & Log**
```
DECISION: Using CLAUDE_BUILD_BRIEF_v3_3.md
REASON: Higher version (v3.3 > v2.1), has date, clear filename
LOGGED: In this decision guide, decision log entry
```

**Step 4: Ask for Confirmation**
```
"I found two versions of BUILD_BRIEF (v2.1 and v3.3). 
I'm using v3.3 since it's newer and dated. Confirm this is current?"
```

---

## 🎯 Summary Checklist

Before making any decision:

- [ ] Does it align with mission? ("AI suggests, never dictates")
- [ ] Does it give users freedom, not restrictions?
- [ ] Have I checked for document conflicts/versions?
- [ ] If restrictive, have I asked Christopher?
- [ ] If ambiguous, have I proposed options?
- [ ] Have I logged my decision?
- [ ] Am I defaulting to freedom when unsure?

---

## 📞 When in Doubt

**Remember these principles:**
1. **Freedom > Restrictions** - Always
2. **Ask > Assume** - Clarify when unsure
3. **Suggest > Dictate** - That's the mission
4. **Optional > Forced** - Give users choice
5. **Transparent > Hidden** - Show, don't hide

**Contact Christopher when:**
- Documentation conflicts
- Restrictions are proposed
- Specification is ambiguous
- You're unsure about intent
- Decision affects core philosophy

---

**The decision framework is simple: When in doubt, choose freedom and ask Christopher.** 🎨✨
