<template>
    <div class="contour-plateau">
        <div class="plateau">
            <div 
                class="cell"
                v-for="cell in cells"
                :key="cell.key"
                :class="{ playable: cell.isPlayable }"
                @click="play(cell)"
            >
                <jeton
                    v-if="cell.value !== 0"
                    :color="cell.value"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Jeton from './Jeton'

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
    methods: {
        play (cell) {
            if (cell.isPlayable) {
                this.$store.dispatch('play', cell.position);
            }
        }
    },

    components: {
        Jeton
    }
}
</script>


<style src="@/style/plateau.css"></style>