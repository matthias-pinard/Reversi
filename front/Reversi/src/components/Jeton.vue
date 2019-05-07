<template>
    <div class="jeton" :class="{ white, black }">
    </div>
</template>

<script>
import { WHITE, BLACK } from '@/store/commons'

export default {
    props: {
        color: {
            required: true,
            type: Number
        }
    },
    computed: {
        white () {
            return this.color === WHITE;
        },
        black () {
            return this.color === BLACK;
        }
    }
}
</script>


<style src="@/style/jeton.css"></style>
