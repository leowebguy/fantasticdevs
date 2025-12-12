<script setup>
defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div :class="'clearfix' + [data.class?.length ? ' ' + data.class : '']"></div>
</template>
