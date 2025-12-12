<script setup>
const props = defineProps({
    globals: {
        type: Object,
        required: true,
        default: () => ({})
    },
    siteName: String
});

// Set head css/js (global)
useHead(() => ({
    script: [{
        children: props.globals?.js?.value
    }],
    style: [{
        children: props.globals?.css?.value
    }]
}));
</script>

<template>
    <header>
        <div class="container-fluid bg-light py-2">
            <div class="container">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <template v-if="globals?.logo[0]">
                        <img
                            :alt="globals?.logo[0]?.alt"
                            :src="globals?.logo[0]?.url"
                            class="img-fluid"
                        />
                    </template>
                    <template v-else>
                        <div class="fs-3 fw-bold">{{ siteName }}</div>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>
