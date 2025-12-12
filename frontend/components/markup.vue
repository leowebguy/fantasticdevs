<script setup>
defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div v-if="data?.markup?.value" :id="data.uid?.slice(-6)" class="markup" v-html="data?.markup?.value"></div>
</template>
