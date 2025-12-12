<script setup>
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators';

import InputText from '@/components/inputs/text';
import InputTextarea from '@/components/inputs/textarea';

const { public: { NUXT_ENV, NUXT_CRAFT_URL } } = useRuntimeConfig();
const prod = (NUXT_ENV === 'prod');

defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});

const formData = reactive({
    name: '',
    phone: '',
    email: '',
    message: ''
    // agree: ref(false)
});

const formStatus = ref({
    disabled: false,
    success: false,
    error: false,
    message: ''
});

/**
 * Vuelidate
 * https://vuelidate-next.netlify.app/validators.html
 */

const phoneUS = helpers.regex(/^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/);

const rules = computed(() => ({
    name: {
        required,
        minLength: minLength(3)
    },
    phone: {
        required,
        phoneUS: helpers.withMessage('Value must be a valid US phone', phoneUS)
    },
    email: {
        required,
        email
    },
    message: {
        required,
        minLength: minLength(12),
        maxLength: maxLength(200)
    }
    // agree: { required, sameAs: sameAs(() => true) }
}));

const v$ = useVuelidate(rules, formData);
const formSubmitted = ref(false);
const token = ref(null);

const submitForm = async () => {
    formStatus.value.success = false;
    formStatus.value.error = false;
    formStatus.value.message = '';
    formSubmitted.value = true;
    const validate = await v$.value.$validate();

    if (!validate)
        return;

    if (!token?.value)
        return;

    await fetch(`${NUXT_CRAFT_URL}/mail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...formData,
            token: token.value
        })
    })
        .then(result => result.json())
        .then((result) => {
            if (!result.success) {
                formStatus.value.disabled = true;
                formStatus.value.error = true;
                formStatus.value.message = 'Sorry. Somthing went wrong.';
                console.error(result.error);
            }
            formStatus.value.disabled = true;
            formStatus.value.success = true;
            formStatus.value.message = 'Form has been sent.';
            // console.log(result);
        })
        .catch((err) => {
            formStatus.value.disabled = true;
            formStatus.value.error = true;
            formStatus.value.message = 'Sorry. Somthing went wrong.';
            throw new Error(err);
            // console.error(err);
        });
};
</script>

<template>
    <form :class="{ 'was-validated': formSubmitted && !v$.$invalid }" novalidate @submit.prevent="submitForm">
        <div class="row row-cols-1 row-cols-md-3 g-3">
            <div class="col">
                <InputText
                    v-model="formData.name"
                    :v$="v$.name"
                    label="Name"
                    name="name"
                    type="text"
                    @blur="v$.name.$touch()"
                />
            </div>
            <div class="col">
                <InputText
                    v-model="formData.phone"
                    :v$="v$.phone"
                    label="Phone"
                    name="phone"
                    type="phone"
                    @blur="v$.phone.$touch()"
                />
            </div>
            <div class="col">
                <InputText
                    v-model="formData.email"
                    :v$="v$.email"
                    label="Email"
                    name="email"
                    type="email"
                    @blur="v$.email.$touch()"
                />
            </div>
        </div>
        <InputTextarea
            v-model="formData.message"
            :v$="v$.message"
            label="Message"
            name="message"
            @blur="v$.message.$touch()"
        />
        <!-- <InputCheckbox
            label="Agree to be contacted"
            name="agree"
            v-model="formData.agree"
            :v$="v$.agree"
            @change="v$.agree.$touch()"
        /> -->
        <div v-if="formStatus.success" class="alert alert-success">{{ formStatus.message }}</div>
        <div v-if="formStatus.error" class="alert alert-warning">{{ formStatus.message }}</div>
        <div class="d-flex flex-row justify-content-start">
            <button :disabled="formStatus.disabled" class="btn btn-primary me-3" type="submit">Submit</button>
            <NuxtTurnstile v-if="prod" v-model="token"/>
        </div>
    </form>
</template>
