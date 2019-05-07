<template>
    <div class="board-container">
        <div class="board">
            <!--
            <div 
                class="cell"
                v-for="cell in cells"
                :class="{ playable: cell.isPlayable }"
                :key="cell.key"
                @click="play(cell)"
            >
                <piece
                    v-if="cell.value !== 0"
                    :color="cell.value"
                />
            </div>
            -->
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapState([
            'board'
        ]),
        ...mapGetters([
            'playableCells'
        ]),
        cells () {
            const { playableCells } = this;
            return this.board.map((cell, index) => ({
                key: 'cell-${index}',
                value: cell,
                position: index,
                isPlayable: playableCells.indexOf(index) > -1
            }));
        }
    },

   /*methods: {
        play (cell) {
            if (cell.isPlayable) {
                this.$store.dispatch('play', cell.position);
            }
        }
   }*/
}
</script>


<style src="@/style/board.css"></style>