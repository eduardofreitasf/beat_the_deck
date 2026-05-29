<script setup>
import { onMounted } from "vue";
import { useGameStore } from "./stores/game.js";
import GameBoard from "./components/GameBoard.vue";
import DeckCounter from "./components/DeckCounter.vue";
import ResultOverlay from "./components/ResultOverlay.vue";

const store = useGameStore();
onMounted(() => store.initGame());
</script>

<template>
  <div class="app">
    <header class="app-header">
      <div class="header-brand">
        <span class="brand-icon">🃏</span>
        <h1 class="brand-title">Beat the Deck</h1>
      </div>
      <div class="header-actions">
        <button class="btn-new-game" @click="store.initGame()">New Game</button>
      </div>
    </header>

    <main class="app-main">
      <div class="game-container">
        <div class="table-surface">
          <GameBoard />
        </div>

        <DeckCounter />

        <!-- Mobile guess action bar -->
        <Transition name="guess-bar">
          <div
            class="mobile-guess-bar"
            v-if="store.selectedPileId !== null && store.phase === 'guess'"
          >
            <button class="mobile-guess-btn mobile-guess-btn--higher" @click="store.guess('higher')">
              <span class="mobile-guess-icon">▲</span>
              <span>Higher</span>
            </button>
            <button class="mobile-guess-btn mobile-guess-btn--lower" @click="store.guess('lower')">
              <span class="mobile-guess-icon">▼</span>
              <span>Lower</span>
            </button>
          </div>
        </Transition>
      </div>
    </main>

    <ResultOverlay />
  </div>
</template>

<style scoped>
.app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--felt);
}

/* ── Header ─────────────────────────────────────────────── */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  backdrop-filter: blur(4px);
  flex-shrink: 0;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  font-size: 1.6rem;
}

.brand-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--gold);
  text-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.btn-new-game {
  background: transparent;
  border: 1.5px solid rgba(212, 175, 55, 0.5);
  color: var(--gold);
  border-radius: 8px;
  padding: 8px 18px;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

.btn-new-game:hover {
  background: rgba(212, 175, 55, 0.12);
  border-color: var(--gold);
}

/* ── Main ───────────────────────────────────────────────── */
.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 40px 24px;
}

.game-container {
  display: flex;
  align-items: center;
  gap: 48px;
}

.table-surface {
  background: radial-gradient(
    ellipse 80% 60% at 50% 50%,
    rgba(255, 255, 255, 0.03) 0%,
    transparent 70%
  );
  border-radius: 24px;
  padding: 32px;
  box-shadow:
    inset 0 0 60px rgba(0, 0, 0, 0.3),
    0 0 0 2px rgba(255, 255, 255, 0.04);
}

/* ── Mobile Guess Bar (hidden on desktop) ────────────────── */
.mobile-guess-bar {
  display: none;
}

/* ── Mobile ──────────────────────────────────────────────── */
@media (max-width: 600px) {
  .app-header {
    padding: 12px 16px;
  }

  .brand-icon {
    font-size: 1.3rem;
  }

  .brand-title {
    font-size: 1.05rem;
  }

  .btn-new-game {
    padding: 6px 14px;
    font-size: 0.75rem;
  }

  .app-main {
    padding: 20px 12px;
    gap: 24px;
    justify-content: flex-start;
  }

  .game-container {
    flex-direction: column;
    gap: 24px;
  }

  .table-surface {
    padding: 16px;
    border-radius: 16px;
  }

  /* ── Mobile Guess Bar ────────────────────────────────── */
  .mobile-guess-bar {
    display: flex;
    gap: 12px;
    width: 100%;
    max-width: 320px;
  }

  .mobile-guess-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 16px;
    border: none;
    border-radius: 12px;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.1s ease, filter 0.1s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .mobile-guess-btn:active {
    transform: scale(0.95);
  }

  .mobile-guess-btn--higher {
    background: linear-gradient(135deg, #16a34a, #15803d);
    color: #ffffff;
    box-shadow: 0 4px 16px rgba(22, 163, 74, 0.4);
  }

  .mobile-guess-btn--lower {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    color: #ffffff;
    box-shadow: 0 4px 16px rgba(220, 38, 38, 0.4);
  }

  .mobile-guess-icon {
    font-size: 0.8rem;
  }

  /* Guess bar transition */
  .guess-bar-enter-active {
    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .guess-bar-leave-active {
    transition: all 0.15s ease;
  }
  .guess-bar-enter-from,
  .guess-bar-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
}
</style>
