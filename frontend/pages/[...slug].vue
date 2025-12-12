<script setup>
import { graphQL } from '@/composables/graphQL';
import { preview } from '@/composables/preview';
import { pages as query } from '@/queries/pages';

const Section = defineAsyncComponent(() => import('@/components/section'));
const Static = defineAsyncComponent(() => import('@/components/static'));
const Modal = defineAsyncComponent(() => import('@/components/modal'));

const components = {
    'section': Section,
    'static': Static,
    'modal': Modal
};

const route = useRoute();
const { isPreview, previewToken } = preview();

// Disable SSR for preview mode
if (isPreview.value)
    definePageMeta({ ssr: false });

// Redirect '/home' to '/'
if (route.params.slug[0] === 'home')
    await navigateTo('/');

// Get the current slug from the route
const slug = computed(() => {
    const slugParam = route.params.slug;
    if (!slugParam)
        return '';

    return Array.isArray(slugParam) ? slugParam.join('/') : slugParam;
});

// Fetch data function
const { data: entry, error } = await useAsyncData(`page-${slug.value}`, async () => {
    try {
        const result = await graphQL(query, {
            uri: slug.value
        }, {
            previewToken: previewToken.value
        });
        if (!result || !result?.entry)
            throw createError({
                statusCode: 404,
                statusMessage: 'Page Not Found',
                fatal: true
            });
        // console.log(result.entry);
        return result.entry;
    } catch (err) {
        // console.error(err);
        throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found',
            fatal: true,
            data: err
        });
    }
});

// Set page title/css/js
useHead(() => ({
    title: entry.value?.title || '',
    script: [{
        children: entry.value?.js?.value,
        tagPosition: 'bodyClose'
    }],
    style: [{
        children: entry.value?.css?.value
    }]
}));

// Handle async errors
if (error.value)
    throw createError({
        statusCode: error.value.statusCode || 500,
        statusMessage: error.value.statusMessage || 'Internal Server Error',
        fatal: error.value.fatal || true
    });
</script>

<template>
    <template v-for="comp in entry?.comps || []" :key="comp.uid">
        <component :is="components[comp.type]" :data="comp"></component>
    </template>
</template>
