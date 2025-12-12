<script setup>
defineProps({
    data: {
        type: Object,
        default: () => ({
            img: []
        })
    }
});
</script>

<template>
    <NuxtImg
        :alt="data.img[0]?.alt"
        :height="data.height"
        :src="data.img[0]?.url ?? `https://picsum.photos/seed/6/${data.width}/${data.height}`"
        :srcset="`${data.img[0]?.medium} 1x, ${data.img[0]?.large} 2x`"
        :width="data.width"
        class="img-fluid"
        densities="x1 x2"
        format="webp"
        loading="lazy"
        quality="80"
    />
</template>
