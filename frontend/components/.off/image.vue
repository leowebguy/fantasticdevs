<script setup>
defineProps({
    image: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <nuxt-img
        :alt="image.alt"
        :src="image.url"
        loading="lazy"
        sizes="sm:100vw md:50vw lg:400px"
    />
</template>
