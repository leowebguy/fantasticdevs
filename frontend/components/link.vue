<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            link: {}
        })
    }
});

const type = ref(props.data.link?.type);
const url = ref(props.data.link?.url);

onMounted(() => {
    if (type.value === 'entry')
        try {
            const urlObject = new URL(url.value);
            const path = urlObject.pathname;
            // console.log(path);

            // Modal entry type
            if (/^\/modals\//.test(path)) {
                type.value = 'm';
                url.value = path.replace('/modals/', '');
                return;
            }

            // Home slug fix
            if (/^\/home$/.test(path)) {
                type.value = 'r';
                url.value = path.replace('/home', '/');
                return;
            }

            // Page entry type
            type.value = 'r';
            url.value = path;
        } catch (err) {
        }
});
</script>

<template>
    <template v-if="type === 'r'">
        <NuxtLink
            :class="data.link?.class?.length ? data.link.class : 'btn btn-theme'"
            :to="url">
            {{ data.link?.label || 'Click here' }}
        </NuxtLink>
    </template>
    <template v-else-if="type === 'm'">
        <button :class="data.link?.class?.length ? data.link.class : 'btn btn-theme'"
                :data-bs-target="'#' + url"
                data-bs-toggle="modal"
                type="button">
            {{ data.link?.label || 'Click here' }}
        </button>
    </template>
    <template v-else>
        <a :class="data.link?.class?.length ? data.link.class : 'btn btn-theme'"
           :href="url"
           :target="data.link?.target">
            {{ data.link?.label || 'Click here' }}
        </a>
    </template>
</template>
