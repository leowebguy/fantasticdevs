<script setup>
defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <component :is="data.tag" :class="data.class">{{ data.text || 'Lorem ipsum dolor sit amet' }}</component>
</template>
