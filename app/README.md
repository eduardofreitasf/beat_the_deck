# Beat the Deck - Frontend Application (Technical Overview)

This directory contains the Vue 3 + Vite implementation of **Beat the Deck**, a singleplayer card guessing game.

## Tech Stack & Architecture

- **Core**: Vue 3 (Composition API with `<script setup>`)
- **Build Tool**: Vite
- **State Management**: Pinia (centralized state and actions)
- **Styling**: Vanilla CSS with custom properties for themed variables. No external CSS/UI framework.

---

## State Management (`stores/game.js`)

All game state and business logic resides in the Pinia store. Components do not mutate state directly; they read reactive properties and dispatch actions.

### State Structure

- `deck`: Array of Card objects `({ suit, rank, value })` representing the draw pile. Value ranges from 2 to 14 (Ace = 14).
- `piles`: Array of 9 pile objects:
  ```javascript
  {
    id: Number,
    cards: Array,              // stack of cards played on this pile
    active: Boolean,           // false if the pile has been eliminated
    eliminatedPending: Boolean // true during the result phase of a wrong guess
  }
  ```
- `selectedPileId`: ID of the currently selected/hovered pile being played.
- `phase`: Current phase of the game loop: `'idle' | 'select' | 'guess' | 'result' | 'gameover'`.
- `lastResult`: `'correct' | 'wrong' | null`.
- `gameResult`: `'win' | 'lose' | null`.
- `score`: Cards remaining in the draw pile (only relevant on loss; lower is better).

### Core Actions

- `initGame()`: Generates a standard 52-card deck, shuffles it, deals 9 cards to initial piles, sets remaining 43 to the draw pile, and sets the phase to `'select'`.
- `selectPile(id)`: Selects a pile and advances phase to `'guess'`.
- `guess(direction)`: Draws the top card from the deck, compares it with the selected pile's top card, pushes it to the pile, handles win/loss checks, and advances to the `'result'` phase.
- `nextTurn()`: Commits any `eliminatedPending` piles to `active: false` (causing them to flip face-down) and resets active selections back to the `'select'` phase.

---

## Component Architecture

### `App.vue`

- Root shell. Renders the main board view, manages game initialization on mount, and coordinates layout frames.

### `GameBoard.vue`

- Renders a 3×3 grid utilizing CSS Grid. Iterates over piles and feeds data to `<Pile>` components.

### `Pile.vue`

- Displays the top card of a pile or a card back design if inactive.
- **On-Card Controls**: When the game is in the `'select'` phase, hovering over a card overlays interactive `▲ Higher` and `▼ Lower` buttons, enabling instant gameplay without a bottom controls panel.
- **Micro-Animations**: Shakes and glows red on wrong guess feedback (`eliminatedPending`), and floats upward on hover/selection.
- Uses CSS classes `.card--red` and `.card--dark` to style suits appropriately (spades and clubs styled near-black `#121212` for realism).

### `DeckCounter.vue`

- Represents the draw pile visually on the right side of the board.
- Renders a 3D-stacked card effect with dynamic layers computed from the remaining deck size (`Math.min(Math.ceil(deck.length / 5), 6)`).

### `ResultOverlay.vue`

- Full-screen modal that slides in when `phase === 'gameover'`. Displays final score and win/loss states, and hooks up the restart action.

---

## Technical Edge Cases & Design Rules

1. **Delayed Card Flips**: When a user makes a wrong guess, the card is placed face-up, and `eliminatedPending` is set to `true`. This lets the player see the drawn card that eliminated their pile. After an 800ms auto-advance delay, `nextTurn()` is called, and the card is flipped face-down (`active = false`).
2. **Equal Cards**: If the drawn card value equals the pile top card value, it is treated as a wrong guess, and the pile is marked for elimination.
3. **Auto-Advance**: The transition from `result` phase back to `select` phase is handled via a `setTimeout` inside the Pinia store's `guess()` action, decoupling timers from component templates.
