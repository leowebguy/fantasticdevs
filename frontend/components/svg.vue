<script setup>
defineProps({
    data: {
        type: Object,
        default: () => ({
            svg: []
        })
    }
});
</script>

<template>
    <img :alt="data.svg[0]?.alt ?? ''"
         :src="data.svg[0]?.url ?? ''"
         :style="data.style"/>
</template>
