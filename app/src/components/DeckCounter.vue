<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game.js'

const store = useGameStore()
const stackLayers = computed(() => Math.min(Math.ceil(store.deck.length / 5), 6))
</script>

<template>
  <div class="deck-counter">
    <div class="deck-stack">
      <div
        v-for="i in stackLayers"
        :key="i"
        class="deck-layer"
        :style="{ bottom: `${(i - 1) * 3}px`, right: `${(i - 1) * -1}px` }"
      >
        <div class="card-back-design" v-if="i === stackLayers"></div>
      </div>
    </div>
    <div class="deck-info">
      <span class="deck-label">DRAW PILE</span>
      <span class="deck-count">{{ store.deck.length }}</span>
      <span class="deck-sub">cards left</span>
    </div>
  </div>
</template>

<style scoped>
.deck-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.deck-stack {
  position: relative;
  width: var(--card-w);
  height: var(--card-h);
}

.deck-layer {
  position: absolute;
  width: var(--card-w);
  height: var(--card-h);
  border-radius: 10px;
  background: var(--card-back);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-back-design {
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

.deck-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
}

.deck-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--gold);
  text-transform: uppercase;
}

.deck-count {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.deck-sub {
  font-size: 0.7rem;
  color: var(--text-muted);
}
</style>
