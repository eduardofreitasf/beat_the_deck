<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game.js'

const props = defineProps({
  pile: { type: Object, required: true },
  isSelected: { type: Boolean, default: false },
  isSelectable: { type: Boolean, default: false },
})

const store = useGameStore()

const topCard = computed(() => props.pile.cards.at(-1))

const suitSymbol = (suit) => ({ hearts: '♥', diamonds: '♦', spades: '♠', clubs: '♣' }[suit])
const isRed = (suit) => suit === 'hearts' || suit === 'diamonds'

function handleCardTap() {
  if (!props.pile.active || props.pile.eliminatedPending) return
  if (!props.isSelectable) return

  if (props.isSelected) {
    // Tapping the already-selected pile deselects it
    store.deselectPile()
  } else {
    store.selectPile(props.pile.id)
  }
}

function handleGuess(direction) {
  if (!props.pile.active || props.pile.eliminatedPending) return
  // Select the pile first
  store.selectPile(props.pile.id)
  // Submit the guess
  store.guess(direction)
}
</script>

<template>
  <div
    class="pile-wrapper"
    :class="{
      'pile--selected': isSelected,
      'pile--selectable': isSelectable && pile.active && !pile.eliminatedPending,
      'pile--eliminated': !pile.active,
      'pile--eliminated-pending': pile.eliminatedPending,
    }"
    @click="handleCardTap"
  >
    <div
      class="card"
      :class="{
        'card--facedown': !pile.active,
        'card--red': pile.active && topCard && isRed(topCard.suit),
        'card--dark': pile.active && topCard && !isRed(topCard.suit)
      }"
    >
      <template v-if="pile.active && topCard">
        <!-- Card Rank & Suits -->
        <span class="card__rank card__rank--top">{{ topCard.rank }}</span>
        <span class="card__suit-center">{{ suitSymbol(topCard.suit) }}</span>
        <span class="card__rank card__rank--bottom">{{ topCard.rank }}</span>

        <!-- Guessing overlay inside the card -->
        <div class="card__guess-overlay" v-if="isSelectable && !pile.eliminatedPending">
          <button
            class="guess-btn guess-btn--higher"
            @click.stop="handleGuess('higher')"
            title="Guess Higher"
          >
            <span class="guess-icon">▲</span>
            <span class="guess-text">Higher</span>
          </button>
          <div class="guess-divider"></div>
          <button
            class="guess-btn guess-btn--lower"
            @click.stop="handleGuess('lower')"
            title="Guess Lower"
          >
            <span class="guess-icon">▼</span>
            <span class="guess-text">Lower</span>
          </button>
        </div>
      </template>
      <template v-else>
        <div class="card__back-pattern"></div>
      </template>
    </div>
    <span class="pile__badge" v-if="pile.active">{{ pile.cards.length }}</span>
  </div>
</template>

<style scoped>
.pile-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;
}

/* Hover effects — desktop only */
@media (hover: hover) {
  .pile--selectable:hover .card {
    transform: translateY(-6px) scale(1.04);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55), 0 0 0 2px var(--gold);
  }

  .pile--selectable:hover .card__guess-overlay {
    opacity: 1;
    pointer-events: auto;
  }
}

.pile--selected .card {
  transform: translateY(-8px) scale(1.06);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65), 0 0 0 3px var(--gold);
}

/* On touch devices, show overlay when pile is selected */
.pile--selected .card__guess-overlay {
  opacity: 1;
  pointer-events: auto;
}

.pile--eliminated {
  opacity: 0.45;
  pointer-events: none;
}

.pile--eliminated-pending .card {
  animation: shake 0.5s ease-in-out;
  box-shadow: 0 0 0 3px var(--red), 0 12px 32px rgba(239, 68, 68, 0.4);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px) rotate(-2deg); }
  40%, 80% { transform: translateX(6px) rotate(2deg); }
}

.card {
  width: var(--card-w);
  height: var(--card-h);
  border-radius: 10px;
  background: var(--card-bg);
  border: 1.5px solid var(--card-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  user-select: none;
  overflow: hidden;
}

/* Colors based on suits */
.card--red {
  color: var(--red);
}

.card--dark {
  color: #121212; /* Darker, near black suits (Spades/Clubs) */
}

.card--facedown {
  background: var(--card-back);
}

.card__back-pattern {
  width: 80%;
  height: 80%;
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.04) 0px,
    rgba(255, 255, 255, 0.04) 4px,
    transparent 4px,
    transparent 8px
  );
}

.card__rank {
  position: absolute;
  font-size: clamp(0.7rem, 2vw, 1rem);
  font-weight: 700;
  line-height: 1;
  padding: 6px;
}

.card__rank--top {
  top: 0;
  left: 4px;
}

.card__rank--bottom {
  bottom: 0;
  right: 4px;
}

.card__suit-center {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  line-height: 1;
}

.pile__badge {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: var(--gold);
  color: #1a1000;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  z-index: 2;
}

/* Guessing Overlay */
.card__guess-overlay {
  position: absolute;
  inset: 0;
  background: rgba(13, 31, 16, 0.9);
  backdrop-filter: blur(3px);
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 5;
}

.guess-btn {
  flex: 1;
  background: transparent;
  border: none;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  font-family: inherit;
  gap: 2px;
}

.guess-btn--higher {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.guess-btn--higher:hover {
  background: rgba(34, 197, 94, 0.3);
  color: #4ade80;
}

.guess-btn--lower {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.guess-btn--lower:hover {
  background: rgba(239, 68, 68, 0.3);
  color: #f87171;
}

.guess-icon {
  font-size: 0.9rem;
}

.guess-text {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.guess-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  width: 80%;
  margin: 0 auto;
}

/* ── Mobile: touch targets & smaller badge ───────────────── */
@media (max-width: 600px) {
  .pile--selectable {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .pile--selected .card {
    transform: translateY(-4px) scale(1.03);
  }

  .card {
    border-radius: 8px;
  }

  .card__rank {
    padding: 4px;
  }

  .pile__badge {
    width: 18px;
    height: 18px;
    font-size: 0.55rem;
    bottom: -6px;
    right: -6px;
  }

  .guess-btn {
    min-height: 44px; /* minimum touch target */
  }

  /* On mobile, pre-color the buttons so user knows what to tap */
  .guess-btn--higher {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
  }

  .guess-btn--lower {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
  }
}
</style>
