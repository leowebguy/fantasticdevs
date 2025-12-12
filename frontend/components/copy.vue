<script setup>
defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <p :class="data.class">
        {{ data.copy || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin hendrerit, nunc quis gravida pretium, nibh lorem tincidunt quam, sit amet.' }}
    </p>
</template>
