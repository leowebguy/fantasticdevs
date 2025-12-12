<script setup>
import { graphQL } from '@/composables/graphQL';
import { modals as query } from '@/queries/modals';

const Div = defineAsyncComponent(() => import('@/components/div'));

const components = {
    'div': Div
};

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});

// Get current slug
const slug = props.data.modal[0]?.slug || null;

// Fetch data function
const { data: entry } = await useAsyncData(`modal-${slug}`,
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
            console.error('Error fetching modal:', err);
        }
    }
);
</script>

<template>
    <div :id="slug?.length ? slug : data.uid?.slice(-6)"
         aria-hidden="true"
         class="modal fade"
         tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <button aria-label="Close" class="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal" type="button"></button>
                    <template v-for="comp in entry?.comps || []" :key="comp.uid">
                        <component :is="components[comp.type]" :data="comp"></component>
                    </template>
                </div>
                <!--<div class="modal-footer">
                    <button class="btn btn-outline-primary" data-bs-dismiss="modal" type="button">Close</button>
                </div>-->
            </div>
        </div>
    </div>
</template>
