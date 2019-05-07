<template>
    <div class="jeton" :class="{ white, black }">
    </div>
</template>

<script>
export default {
    props: {
        color: {
            required: true,
            type: Number
        }
    },
}
</script>


<style src="@/style/jeton.css"></style>
