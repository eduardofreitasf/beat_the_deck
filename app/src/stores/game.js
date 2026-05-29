import { defineStore } from 'pinia'

const SUITS = ['hearts', 'diamonds', 'spades', 'clubs']
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

function buildDeck() {
  const deck = []
  for (const suit of SUITS) {
    for (let i = 0; i < RANKS.length; i++) {
      deck.push({ suit, rank: RANKS[i], value: i + 2 })
    }
  }
  return deck
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const useGameStore = defineStore('game', {
  state: () => ({
    deck: [],
    piles: [],
    selectedPileId: null,
    phase: 'idle', // 'idle' | 'select' | 'guess' | 'result' | 'gameover'
    lastResult: null, // 'correct' | 'wrong' | null
    gameResult: null, // 'win' | 'lose' | null
    score: null,
  }),

  getters: {
    activePiles: (state) => state.piles.filter((p) => p.active && !p.eliminatedPending),
    topCard: (state) => {
      if (state.selectedPileId === null) return null
      const pile = state.piles.find((p) => p.id === state.selectedPileId)
      return pile ? pile.cards.at(-1) : null
    },
  },

  actions: {
    initGame() {
      const shuffled = shuffle(buildDeck())
      const dealt = shuffled.slice(0, 9)
      const remaining = shuffled.slice(9)

      this.piles = dealt.map((card, i) => ({
        id: i,
        cards: [card],
        active: true,
        eliminatedPending: false,
      }))

      this.deck = remaining
      this.selectedPileId = null
      this.phase = 'select'
      this.lastResult = null
      this.gameResult = null
      this.score = null
    },

    selectPile(id) {
      if (this.phase !== 'select') return
      const pile = this.piles.find((p) => p.id === id)
      if (!pile || !pile.active || pile.eliminatedPending) return
      this.selectedPileId = id
      this.phase = 'guess'
    },

    guess(direction) {
      if (this.phase !== 'guess' && this.phase !== 'select') return
      if (this.selectedPileId === null) return

      const pile = this.piles.find((p) => p.id === this.selectedPileId)
      if (!pile || !pile.active || pile.eliminatedPending) return

      const topCard = pile.cards.at(-1)
      const drawnCard = this.deck.shift()

      const isHigher = drawnCard.value > topCard.value
      const isLower = drawnCard.value < topCard.value

      pile.cards.push(drawnCard)

      const correct = (direction === 'higher' && isHigher) || (direction === 'lower' && isLower)

      if (correct) {
        this.lastResult = 'correct'
      } else {
        pile.eliminatedPending = true
        this.lastResult = 'wrong'
      }

      this.phase = 'result'

      // Check win/lose conditions
      const anyActive = this.piles.some((p) => p.active && !p.eliminatedPending)
      const deckEmpty = this.deck.length === 0

      if (deckEmpty && anyActive) {
        this.gameResult = 'win'
        this.score = 0
        this.phase = 'gameover'
      } else if (!anyActive) {
        this.gameResult = 'lose'
        this.score = this.deck.length
        this.phase = 'gameover'
      } else {
        // Auto-advance to next turn after 800ms
        setTimeout(() => {
          this.nextTurn()
        }, 800)
      }
    },

    nextTurn() {
      if (this.phase !== 'result') return

      // Commit pending eliminations
      this.piles.forEach((p) => {
        if (p.eliminatedPending) {
          p.active = false
          p.eliminatedPending = false
        }
      })

      this.lastResult = null
      this.selectedPileId = null
      this.phase = 'select'
    },
  },
})
