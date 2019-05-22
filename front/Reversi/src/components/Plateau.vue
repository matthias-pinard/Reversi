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
import Jeton from './Jeton'

export default {
    components: {
        Jeton
    }
}
</script>


<style src="@/style/plateau.css"></style>