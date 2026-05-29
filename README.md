# 🃏 Beat the Deck

Welcome to **Beat the Deck**, a singleplayer card guessing game designed to test your intuition, luck, and card-counting skills.

👉 **[Play the Live Game Here!](https://eduardofreitasf.github.io/beat_the_deck/)**

---

## 🎮 The Game & Rules

Beat the Deck is simple to learn but challenging to master:

1. **The Setup**: A standard 52-card deck is shuffled. 9 cards are dealt face-up into a 3x3 grid (forming 9 active piles). The remaining 43 cards sit in the draw pile.
2. **The Turn**: Hover over any active pile on the grid and guess whether the next card drawn from the deck will be **Higher** or **Lower** than that pile's top card.
3. **The Result**:
   - If your guess is **correct**, the new card is stacked on top of that pile.
   - If your guess is **wrong** (or the card value is **equal**), that pile is eliminated and will flip face-down.
4. **Winning and Losing**:
   - **Win**: Exhaust the entire draw pile with at least one active pile remaining.
   - **Lose**: All 9 piles are eliminated before the draw pile runs out. Your score is the number of cards remaining in the deck (lower is better!).

_Note: Aces are always high (value 14)._

---

## 📁 Repository Structure

This repository is organized as follows:

- **`.github/`**: GitHub actions workflows, including automated deployment configuration to GitHub Pages.
- **`/app`**: The frontend codebase. Built with Vue 3, Vite, and Pinia, featuring responsive layouts, micro-animations, and a classic felt-table theme.
- **`CHANGELOG.md`**: Chronological log of all notable updates, fixes, and features added to the game.
- **`LICENSE`**: MIT license terms for open-source distribution.
- **`README.md`**: Main project guide and instructions.

---

## 🛠️ Running Locally

If you'd like to run the game on your own machine:

1. Navigate to the frontend directory:
   ```bash
   cd app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the link provided in your terminal (usually `http://localhost:5173/`) in your browser.
