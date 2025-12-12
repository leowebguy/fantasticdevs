<script setup>
defineProps({
    siteName: {
        type: String,
        required: true,
        default: 'Site Name'
    },
    logo: {
        type: Object,
        required: false,
        default: () => ({
            url: '',
            alt: ''
        })
    }
});
</script>

<template>
    <NuxtLink class="text-red-600 block" to="/">
        <template v-if="logo?.length > 0">
            <span class="sr-only">{{ siteName }}</span>
            <img
                :alt="logo[0].alt"
                :src="logo[0].url"
                class="w-10 h-10"
            />
        </template>
        <template v-else>
            {{ siteName }}
        </template>
    </NuxtLink>
</template>
