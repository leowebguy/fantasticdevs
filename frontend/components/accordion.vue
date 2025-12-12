<script setup>
const Copy = defineAsyncComponent(() => import('@/components/copy'));

const components = {
    'copy': Copy
};

defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
    parent: {
        type: String
    }
});
</script>

<template>
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button
                :aria-controls="data.uid?.slice(-6)"
                :aria-expanded="data.active ? 'true' : 'false'"
                :data-bs-target="'#acc-' + data.uid?.slice(-6)"
                :class="['accordion-button', {
                  'collapsed': !data.active
                }]"
                data-bs-toggle="collapse"
                type="button">
                {{ data.title || 'Lorem ipsum dolor sit, consectetur elit.' }}
            </button>
        </h2>
        <div :id="'acc-' + data.uid?.slice(-6)"
             :class="'accordion-collapse collapse' + [data.active ? ' show' : '']"
             :data-bs-parent="data.parent?.length ? '#' + parent : null">
            <div class="accordion-body">
                <template v-for="child in data.children" :key="child.uid">
                    <component :is="components[child.type]" :data="child"></component>
                </template>
            </div>
        </div>
    </div>
</template>
