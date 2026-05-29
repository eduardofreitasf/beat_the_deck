# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-05-29

### Added
- **Interactive Card Piles**: Hovering over cards now displays `▲ Higher` and `▼ Lower` buttons, enabling direct on-card guessing.
- **Improved Card Colors**: Spades and Clubs suits are now rendered in a dark near-black (`#121212`) for better realism, while Hearts and Diamonds use the classic casino red.
- **Delayed Card Flipping**: Wrong guesses shake and glow red, remaining face-up for 800ms to show the drawn card before flipping face-down at the start of the next turn.
- **Pinia State Management**: Handled core game loop and rules (Ace value, win/loss checks, and auto-advance timers).
- **Draw Pile Side Panel**: Placed the draw pile next to the board as a vertical stacked-card column.
- **GitHub Actions Deployment**: Setup automatic build and deploy workflow to GitHub Pages on every push to the `main` branch.
- **MIT License**: Added repository licensing.
