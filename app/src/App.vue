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
</style>
