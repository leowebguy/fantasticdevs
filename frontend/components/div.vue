<script setup>
const Div = defineAsyncComponent(() => import('@/components/div'));
const Clearfix = defineAsyncComponent(() => import('@/components/clearfix'));
const Heading = defineAsyncComponent(() => import('@/components/heading'));
const Copy = defineAsyncComponent(() => import('@/components/copy'));
const Link = defineAsyncComponent(() => import('@/components/link'));
const Img = defineAsyncComponent(() => import('@/components/img'));
const Svg = defineAsyncComponent(() => import('@/components/svg'));
const Markup = defineAsyncComponent(() => import('@/components/markup'));
const Form = defineAsyncComponent(() => import('@/components/form'));
const Accordion = defineAsyncComponent(() => import('@/components/accordion'));

const components = {
    'div': Div,
    'clearfix': Clearfix,
    'heading': Heading,
    'copy': Copy,
    'link': Link,
    'img': Img,
    'svg': Svg,
    'markup': Markup,
    'form': Form,
    'accordion': Accordion
};

defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <div :id="data.id?.length ? data.id : data.uid?.slice(-6)" :class="[data.div, {
          'row-cols-1 row-cols-lg-2 gap-4 gap-lg-0 justify-content-center align-items-center': data.div === 'row',
          'shadow-sm': data.div === 'card'
        }]">
        <template v-for="child in data.children" :key="child.uid">
            <component :is="components[child.type]" :data="child" :parent="child.type === 'accordion' ? data.uid?.slice(-6) : null"></component>
        </template>
    </div>
</template>
