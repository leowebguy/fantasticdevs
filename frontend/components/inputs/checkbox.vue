<script setup>
/**
 * todo: fix validation
 */
defineProps({
    id: String,
    label: String,
    name: String,
    modelValue: [String, Boolean],
    v$: {
        type: Object,
        default: () => ({}),
        required: true
    }
});

defineEmits(['change']);
</script>

<template>
    <fieldset class="form-check">
        <input
            :id="id || name + '_'"
            :aria-label="label"
            :class="{ 'is-invalid': v$?.$error, 'is-valid': !v$?.$error && v$?.$dirty }"
            :name="name"
            :value="modelValue"
            class="form-check-input"
            tabindex="0"
            type="checkbox"
            @change="$emit('change')"/>
        <label :for="id || name + '_'" class="form-check-label">{{ label }}</label>
        <!-- <span v-if="v$?.$error" class="invalid-feedback">
            {{ v$?.$errors[0].$message }}
        </span> -->
    </fieldset>
</template>
