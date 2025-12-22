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
        <nav class="navbar navbar-dark navbar-expand-lg bg-dark py-3">
            <div class="container">
                <a class="navbar-brand" href="/">
                    <template v-if="globals?.logo[0]">
                        <img
                            :alt="globals?.logo[0]?.alt"
                            :src="globals?.logo[0]?.url"
                            class="img-fluid"
                            style="max-width: 120px;"
                        />
                    </template>
                    <template v-else>
                        <div class="fs-3 fw-bold">{{ siteName }}</div>
                    </template>
                </a>
                <button class="navbar-toggler justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="mainNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Pricing</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<!--    <div class="container-fluid bg-dark py-3">
            <div class="container">
                <nav class="navbar">
                    <a class="navbar-brand" href="/">
                        <template v-if="globals?.logo[0]">
                            <img
                                :alt="globals?.logo[0]?.alt"
                                :src="globals?.logo[0]?.url"
                                class="img-fluid"
                                style="max-width: 120px;"
                            />
                        </template>
                        <template v-else>
                            <div class="fs-3 fw-bold">{{ siteName }}</div>
                        </template>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="mainNav">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                            <a class="nav-link" href="#">Features</a>
                            <a class="nav-link" href="#">Pricing</a>
                            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

        https://codepen.io/vipulrai/pen/qBQEdrK
        https://codepen.io/typo3-freelancer/pen/poEvyGj

<li class="nav-item position-relative d-none d-sm-block lh-lg">
                            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false"
                                    aria-label="{{ 'Toggle navigation'|t }}">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                        </li>

    <div class="offcanvas offcanvas-end" tabindex="-1" data-bs-backdrop="false" id="mainNav"
                     aria-labelledby="mainNav">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close"
                                data-bs-dismiss="offcanvas" aria-label="Close"><i class="bi bi-x-lg"></i>
                        </button>
</div>
<div class="offcanvas-body">
<ul class="navbar-nav d-flex justify-content-lg-center align-items-lg-center">
    <li class="nav-item">
        <a class="nav-link">Link 1</a>
    </li>
    <li class="nav-item">
        <a class="nav-link">Link 1</a>
    </li>
    <li class="nav-item">
        <a class="nav-link">Link 1</a>
    </li>
    <li class="nav-item">
        <a class="nav-link">Link 1</a>
    </li>
    <li class="nav-item">
        <a class="nav-link">Link 1</a>
    </li>
</ul>
</div>
</div> -->
