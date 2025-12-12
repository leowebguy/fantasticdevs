<script setup>
import { graphQL } from '@/composables/graphQL';
import { globals as query } from '@/queries/globals';
import { hmr } from '@/utils/hmr';

import Header from '@/components/header';
import Footer from '@/components/footer';

const { public: { NUXT_ENV, NUXT_SITE_NAME } } = useRuntimeConfig();
const siteName = computed(() => NUXT_SITE_NAME || 'Fantastic Devs');

// HMR CMS
if (NUXT_ENV === 'local')
    hmr();

// Fetch data function
const { data: globals } = await useAsyncData('globals', async () => {
    try {
        return await graphQL(query);
    } catch (err) {
        console.error('Error fetching globals:', err);
        throw err;
    }
});

// Set head css/js (global)
useHead(() => ({
    script: [{
        children: `window.json = ${globals?.value?.json?.json?.value}`
    }]
}));
</script>

<template>
    <Header
        :globals="globals?.header"
        :siteName="siteName"
    />
    <NuxtPage/>
    <Footer
        :siteName="siteName"
        :globals="globals?.footer"
    />
</template>
