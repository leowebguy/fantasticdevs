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
        <nav class="navbar fixed-top navbar-dark navbar-expand-lg bg-dark py-3">
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
                <button class="navbar-toggler justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="mainNav"><!-- https://codepen.io/typo3-freelancer/pen/poEvyGj -->
                    <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="javascript:void(0)">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="javascript:void(0)" data-bs-toggle="dropdown" data-bs-auto-close="outside">Multilevel</a>
                            <ul class="dropdown-menu shadow">
                                <li><a class="dropdown-item" href="javascript:void(0)">Gallery</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0)">Blog</a></li>
                                <li class="dropend">
                                    <a href="javascript:void(0)" class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside">Submenu Right</a>
                                    <ul class="dropdown-menu shadow">
                                        <li><a class="dropdown-item" href=""> Second level 1</a></li>
                                        <li><a class="dropdown-item" href=""> Second level 2</a></li>
                                        <li><a class="dropdown-item" href=""> Second level 3</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="javascript:void(0)">Something else here</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="javascript:void(0)">Link</a>
                        </li>
                        <li class="nav-item dropdown dropdown-mega position-static">
                            <a class="nav-link dropdown-toggle" href="javascript:void(0)" data-bs-toggle="dropdown" data-bs-auto-close="outside">Megamenu</a>
                            <div class="dropdown-menu shadow">
                                <div class="mega-content px-4">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-12 col-sm-4 col-md-3 py-4">
                                                <h5>Pages</h5>
                                                <div class="list-group">
                                                    <a class="list-group-item" href="javascript:void(0)">Accomodations</a>
                                                    <a class="list-group-item" href="javascript:void(0)">Terms & Conditions</a>
                                                    <a class="list-group-item" href="javascript:void(0)">Privacy</a>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-4 col-md-3 py-4">
                                                <h5>Card</h5>
                                                <div class="card">
                                                    <img src="https://via.placeholder.com/320x180" class="img-fluid" alt="image">
                                                    <div class="card-body">
                                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                                                            content.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-4 col-md-3 py-4">
                                                <h5>Lot of Pages</h5>
                                                <p>Lorem ipsum dolo sit achmet muhamed borlan de irtka.</p>
                                            </div>
                                            <div class="col-12 col-sm-12 col-md-3 py-4">
                                                <h5>Damn, so many</h5>
                                                <div class="list-group">
                                                    <a class="list-group-item" href="javascript:void(0)">Accomodations</a>
                                                    <a class="list-group-item" href="javascript:void(0)">Terms & Conditions</a>
                                                    <a class="list-group-item" href="javascript:void(0)">Privacy</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.dropdown-menu {
    &.show {
        animation: fadeIn 0.3s alternate;
    }
}

.nav-item.dropdown.dropdown-mega {
    position: static;

    .dropdown-menu {
        width: 90%;
        top: auto;
        left: 5%;
    }
}

.navbar-toggler {
    border: none;
    padding: 0;
    outline: none;

    &:focus {
        box-shadow: none;
    }
}
</style>
