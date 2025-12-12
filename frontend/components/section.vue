<script setup>
const Div = defineAsyncComponent(() => import('@/components/div'));

const components = {
    'div': Div
};

defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <section :id="data.id?.length ? data.id : data.uid?.slice(-6)" :class="data.class?.length ? data.class : 'py-5 py-lg-6'">
        <template v-for="child in data.children" :key="child.uid">
            <component :is="components[child.type]" :data="child"></component>
        </template>
    </section>
</template>
