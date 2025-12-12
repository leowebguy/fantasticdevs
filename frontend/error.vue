<script setup>
const error = useError();
</script>

<template>
    <section>
        <div class="container-fluid">
            <div class="row row-cols-1 row-cols-md-2 d-flex justify-content-center align-items-center">
                <div class="col position-relative vh-100">
                    <div class="bg-image bg-cover" style="background-image: url('https://picsum.photos/seed/6/600/800/');"></div>
                </div>
                <div class="col">
                    <div class="d-flex flex-column bg-primary text-white mx-auto p-4 p-lg-6" style="max-width: 600px;">
                        <span class="fs-3">{{ error.statusCode }}</span>
                        <span>{{ error.statusMessage }}</span>
                        <div class="clearfix py-4"></div>
                        <h2>What on earth are you doing here?</h2>
                        <a href="javascript:void(0)" @click="clearError({ redirect: '/' })"
                           class="btn btn-light text-uppercase d-inline-flex align-self-start" title="Go back">Go back
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
