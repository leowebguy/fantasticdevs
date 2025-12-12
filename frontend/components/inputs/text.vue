<script setup>
defineProps({
    id: String,
    label: String,
    type: {
        type: String,
        default: 'text'
    },
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
        <input
            :id="id || name + '_'"
            :aria-label="label"
            :class="{ 'is-invalid': v$?.$error, 'is-valid': !v$?.$error && v$?.$dirty }"
            :name="name"
            :placeholder="label"
            :type="type"
            :value="modelValue"
            class="form-control"
            tabindex="0"
            @blur="$emit('blur')"
            @input="$emit('update:modelValue', $event.target.value)"/>
        <span v-if="v$?.$error" class="invalid-feedback">
            {{ v$?.$errors[0].$message }}
        </span>
    </fieldset>
</template>
