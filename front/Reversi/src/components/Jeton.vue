<template>
    <div class="jeton" :class="{ white, black, last }">
    </div>
</template>

<script>
import { WHITE, BLACK } from '@/store/commons'

export default {
    props: {
        color: {
            required: true,
            type: Number
        },
        last: {
            type: Boolean
        }
    },
    computed: {
        white () {
            return this.color === WHITE;
        },
        black () {
            return this.color === BLACK;
        },

    }
}
</script>


<style src="@/style/jeton.css"></style>
