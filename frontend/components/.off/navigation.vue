<script setup>
const route = useRoute();

defineProps({
    pages: {
        type: Array,
        default: () => []
    }
});

const isCurrentPage = (path) => route.path === path;
</script>

<template>
    <nav aria-label="Primary" class="sm:tw-basis-2/3 grow-1">
        <ul class="sm:flex">
            <li v-for="page in pages" :key="page.id">
                <NuxtLink
                    :aria-current="isCurrentPage(`/${page.uri}`) ? 'page' : null"
                    :to="`/${page.uri}`"
                    active-class="text-red-600"
                    class="block p-2 hover:underline text-red-600 hover:text-red-600"
                >
                    {{ page.title }}
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>
