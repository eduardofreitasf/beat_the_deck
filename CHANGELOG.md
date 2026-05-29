# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-05-29

### Added
- **Mobile Responsiveness**: Full mobile support — the game now adapts to any screen size.
- **Fluid Card Sizing**: Cards scale fluidly between 60–90px using `clamp()` based on viewport width.
- **Mobile Guess Action Bar**: Two large Higher/Lower buttons appear below the deck counter when a card is selected on mobile, replacing the hover-only card overlay.
- **Pile Switching**: Players can now tap a different card to change their selection before committing a guess.
- **Deselect Action**: Tapping an already-selected card deselects it on mobile.

### Changed
- **Game Layout**: Board and deck counter stack vertically on screens under 600px.
- **Deck Counter**: Switches to a compact horizontal layout on mobile.
- **Header**: Reduced padding and font sizes on small viewports.
- **Table Surface**: Smaller padding and border-radius on mobile.
- **Card Grid**: Grid gap reduces from 18px to 10px on mobile.
- **Result Overlay**: Compact padding, smaller fonts, and full-width restart button on mobile.

### Fixed
- **Touch Interaction**: Card guess overlay is hidden on mobile (no hover); replaced with external tap-friendly buttons.
- **Horizontal Overflow**: Prevented with `overflow-x: hidden` and `touch-action: manipulation`.

## [1.0.0] - 2026-05-29

### Added
- **Interactive Card Piles**: Hovering over cards now displays `▲ Higher` and `▼ Lower` buttons, enabling direct on-card guessing.
- **Improved Card Colors**: Spades and Clubs suits are now rendered in a dark near-black (`#121212`) for better realism, while Hearts and Diamonds use the classic casino red.
- **Delayed Card Flipping**: Wrong guesses shake and glow red, remaining face-up for 800ms to show the drawn card before flipping face-down at the start of the next turn.
- **Pinia State Management**: Handled core game loop and rules (Ace value, win/loss checks, and auto-advance timers).
- **Draw Pile Side Panel**: Placed the draw pile next to the board as a vertical stacked-card column.
- **GitHub Actions Deployment**: Setup automatic build and deploy workflow to GitHub Pages on every push to the `main` branch.
- **MIT License**: Added repository licensing.
