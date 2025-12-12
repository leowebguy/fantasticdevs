<script setup>
import { graphQL } from '@/composables/graphQL';
import { statics as query } from '@/queries/statics';

const Section = defineAsyncComponent(() => import('@/components/section'));

const components = {
    'section': Section
};

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});

// Get current slug
const slug = props.data.static[0]?.slug || null;

// Fetch data function
const { data: entry } = await useAsyncData(`static-${slug}`,
    async () => {
        try {
            const result = await graphQL(query, {
                slug: slug
            });

            if (!result?.entry)
                return;

            // console.log(result.entry);
            return result.entry;
        } catch (err) {
            console.error('Error fetching static:', err);
        }
    }
);

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
</script>

<template>
    <template v-for="comp in entry?.comps || []" :key="comp.uid">
        <component :is="components[comp.type]" :data="comp"></component>
    </template>
</template>
