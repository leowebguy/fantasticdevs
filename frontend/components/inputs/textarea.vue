<script setup>
defineProps({
    id: String,
    label: String,
    name: String,
    modelValue: [String, Number],
    v$: {
        type: Object,
        default: () => ({}),
        required: true
    }
});

defineEmits(['update:modelValue', 'blur']);
</script>

<template>
    <fieldset>
        <!-- <label :for="id || name + '_'" class="form-label">{{ label }}</label> -->
        <textarea
            :id="id || name + '_'"
            :aria-label="label"
            :class="{ 'is-invalid': v$?.$error, 'is-valid': !v$?.$error && v$?.$dirty }"
            :name="name"
            :placeholder="label"
            :value="modelValue"
            class="form-control"
            rows="4"
            tabindex="0"
            @blur="$emit('blur')"
            @input="$emit('update:modelValue', $event.target.value)"/>
        <span v-if="v$?.$error" class="invalid-feedback">
            {{ v$?.$errors[0].$message }}
        </span>
    </fieldset>
</template>
