<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game.js'
import Pile from './Pile.vue'

const store = useGameStore()

const isSelectable = computed(() => store.phase === 'select' || store.phase === 'guess')
</script>

<template>
  <div class="game-board">
    <Pile
      v-for="pile in store.piles"
      :key="pile.id"
      :pile="pile"
      :isSelected="store.selectedPileId === pile.id"
      :isSelectable="isSelectable"
    />
  </div>
</template>

<style scoped>
.game-board {
  display: grid;
  grid-template-columns: repeat(3, var(--card-w));
  grid-template-rows: repeat(3, var(--card-h));
  gap: 18px;
}

@media (max-width: 600px) {
  .game-board {
    gap: 10px;
  }
}
</style>
