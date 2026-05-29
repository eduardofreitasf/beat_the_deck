<script setup>
import { useGameStore } from "../stores/game.js";

const store = useGameStore();
</script>

<template>
  <Transition name="overlay">
    <div class="overlay" v-if="store.phase === 'gameover'">
      <div class="overlay__card">
        <div class="overlay__icon">
          {{ store.gameResult === "win" ? "🏆" : "💀" }}
        </div>
        <h1 class="overlay__title">
          {{
            store.gameResult === "win"
              ? "You Beat the Deck!"
              : "All Piles Eliminated"
          }}
        </h1>
        <p class="overlay__subtitle" v-if="store.gameResult === 'win'">
          You survived until the draw pile was exhausted.
        </p>
        <p class="overlay__subtitle" v-else>
          All 9 piles were eliminated.
          <span v-if="store.score !== null">
            {{ store.score }} card{{ store.score !== 1 ? "s" : "" }} remained in
            the deck.
          </span>
        </p>
        <div
          class="overlay__score"
          v-if="store.gameResult === 'lose' && store.score !== null"
        >
          <span class="score-label">Score</span>
          <span class="score-value">{{ store.score }}</span>
          <span class="score-note">lower is better</span>
        </div>
        <button class="btn-restart" @click="store.initGame()">
          🃏 Play Again
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 12, 4, 0.88);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.overlay__card {
  background: linear-gradient(160deg, #1a2e1a, #0d1f0d);
  border: 1px solid rgba(212, 175, 55, 0.35);
  border-radius: 20px;
  padding: 48px 56px;
  max-width: 440px;
  width: 90%;
  text-align: center;
  box-shadow:
    0 32px 80px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(212, 175, 55, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.overlay__icon {
  font-size: 4rem;
  line-height: 1;
  animation: bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes bounceIn {
  from {
    transform: scale(0.3);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.overlay__title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--gold);
  margin: 0;
  letter-spacing: -0.01em;
}

.overlay__subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.6;
}

.overlay__score {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(212, 175, 55, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 12px;
  padding: 16px 32px;
  gap: 4px;
}

.score-label {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 700;
}

.score-value {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.score-note {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.btn-restart {
  margin-top: 8px;
  background: linear-gradient(135deg, var(--gold), #b8860b);
  color: #1a1000;
  border: none;
  border-radius: 12px;
  padding: 14px 36px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  letter-spacing: 0.04em;
  transition:
    transform 0.12s ease,
    filter 0.12s ease,
    box-shadow 0.12s ease;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
}

.btn-restart:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(212, 175, 55, 0.55);
}
.btn-restart:active {
  transform: scale(0.96);
}

/* Transition */
.overlay-enter-active {
  animation: fadeIn 0.3s ease;
}
.overlay-leave-active {
  animation: fadeIn 0.2s ease reverse;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.overlay-enter-active .overlay__card {
  animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideUp {
  from {
    transform: translateY(40px) scale(0.92);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* ── Mobile ──────────────────────────────────────────────── */
@media (max-width: 600px) {
  .overlay__card {
    padding: 32px 24px;
    border-radius: 16px;
    gap: 12px;
  }

  .overlay__icon {
    font-size: 3rem;
  }

  .overlay__title {
    font-size: 1.3rem;
  }

  .overlay__subtitle {
    font-size: 0.85rem;
  }

  .score-value {
    font-size: 2.2rem;
  }

  .overlay__score {
    padding: 12px 24px;
  }

  .btn-restart {
    width: 100%;
    padding: 14px 24px;
    font-size: 0.95rem;
  }
}
</style>
