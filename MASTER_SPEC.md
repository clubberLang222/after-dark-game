# After Dark — Master Spec (Swingers Party)

**Product framing:** After Dark is a premium **swingers party** board experience for consenting adults. The table is a house of couples and singles who opt into shared play; intensity is gated by **Frisky level**, **Heat**, and explicit **named participants** on every challenge.

## Core pillars

1. **Consent & naming** — Every challenge lists the exact players involved (chips on the card). No anonymous “someone at the table” when partners are required.
2. **House modes**
   - **Private Night** — small local group
   - **Couple Focus** — chemistry / couple cards preferred
   - **Swingers Party** — multi-couple / group-friendly deck bias
   - **House Network** — host + phone controllers + TV display on LAN (or optional WS relay)
3. **Intensity ladder** — Flirty → Spicy → Explicit → Filthy. Heat and After Dark spaces push preferred card level; frisky ceiling hard-filters the deck.
4. **Private-room camera/video** — Challenges that require camera or video leave the main table. Named participants step into a **separate room / private space**, clear the privacy gate, then complete the capture.
5. **Temple boards** — Play surfaces are finely detailed **3D temples** (columns, pediment, steps, stone frieze), not abstract lounges. Dice tumble as true **3D cubes** across the ring.
6. **Compact play UI** — Board, roster, and controls share a denser layout so the living-room display and phones stay readable without dominating the screen.

## Challenge flow

```
Land on CARD / AFTER_DARK
  → Engine draws card (frisky + mode + heat filters)
  → Engine selects participantIds (current + partners)
  → If privacyGate or separateRoom (camera/video): phase = privacy_gate
  → Participants confirmed on UI
  → Separate-room challenges: leave main table first
  → card_pending / voting → accept | pass | downgrade | switch
```

## Roles (network)

| Role | Device | Authority |
|------|--------|-----------|
| Host | TV / laptop | Owns GameEngine, broadcasts state |
| Controller | Phone | Acts only on own turn / own votes |
| Display | Smart TV browser | Read-only mirror (`?display=CODE`) |

## Non-goals

- No minors, no non-consensual framing, no hidden recording without the in-app camera consent path.
- Engine remains single source of truth; UI never invents dice or card outcomes.

## Build notes

- Board themes map to temple labels (Golden Sanctum, Crimson Pillars, Obsidian Moon Temple, …).
- `Card.separateRoom` + `requiresCamera` drive private-room UX; video-tagged camera cards are treated as separate-room by the engine.
- `CardState.participantIds` is set on every draw and switch.

*Last updated: 2026-08-19 — swingers party Master Spec*
