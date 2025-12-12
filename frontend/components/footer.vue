<script setup>
const props = defineProps({
    globals: {
        type: Object,
        required: true,
        default: () => ({})
    },
    siteName: String
});

// Set footer js (global)
useHead(() => ({
    script: [{
        children: props.globals?.js?.value,
        tagPosition: 'bodyClose'
    }]
}));
</script>

<template>
    <footer>
        <div class="container-fluid bg-dark-subtle py-2">
            <div class="container">
                <div class="d-flex justify-content-center align-items-center">
                    <small>{{ siteName }} © 2016 - 2025.</small>
                </div>
            </div>
        </div>
    </footer>
</template>
