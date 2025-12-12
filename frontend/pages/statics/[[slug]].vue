<script setup>
import { graphQL } from '@/composables/graphQL';
import { preview } from '@/composables/preview';
import { statics as query } from '@/queries/statics';

const Section = defineAsyncComponent(() => import('@/components/section'));

const components = {
    'section': Section
};

const route = useRoute();
const { isPreview, previewToken } = preview();

// Only visible in preview
if (!isPreview.value)
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
        fatal: true
    });

// Disable SSR for preview mode
if (isPreview.value)
    definePageMeta({ ssr: false });

// Get the current slug from the route
const slug = computed(() => {
    const slugParam = route.params.slug;
    if (!slugParam)
        return '';

    return Array.isArray(slugParam) ? slugParam.join('/') : slugParam;
});

// Fetch data function
const { data: entry, error } = await useAsyncData(`static-${slug.value}`, async () => {
    try {
        const result = await graphQL(query, {
            slug: slug.value
        }, {
            previewToken: previewToken.value
        });
        if (!result?.entry)
            throw createError({
                statusCode: 404,
                statusMessage: 'Page Not Found',
                fatal: true
            });
        // console.log(result.entry);
        return result.entry;
    } catch (err) {
        // console.error('Error fetching static:', err);
        throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found',
            fatal: true,
            data: err
        });
    }
});

// Set static css/js
useHead(() => ({
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

<style scoped>
/**
 * Hidden from preview
 */
header, footer {
    display: none !important;
}
</style>
