<script setup>
import gsap from 'gsap'; // https://gsap.com/docs/v3/Installation/
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    // gsap.set('.slider-1', { yPercent: 100 });
    // gsap.to('.slider-1', {
    //     // rotation: 25,
    //     yPercent: 0,
    //     stagger: 0.5,
    //     scrollTrigger: {
    //         trigger: '.gsap_hero',
    //         markers: true,
    //         start: 'top top',
    //         end: '+=2000px',
    //         scrub: true,
    //         pin: true
    //     }
    // });
    // gsap.to('.pencil', { rotation: 25, y: 60, duration: 1 });
    // gsap.to('.pencil', { rotation: 25, y: 60, duration: 1 });
});
</script>

<template>
    <section id="hero">
        <div class="gsap_hero">
            <div class="gsap_slider_wrap">
                <div class="gsap_slider-1">
                    <div class="holder">
                        <div class="transparent"></div>
                    </div>
                    <div class="slider-1 caption">
                        A NEW<br>CONCEPT
                    </div>
                    <div class="slider-1 pencil">
                        <img class="img-fluid" src="https://lwg-assets.s3.us-east-1.amazonaws.com/gaunte/img/hero/wood_pencil2.png" alt="pencil">
                    </div>
                    <div class="slider-1 eraser">
                        <img class="img-fluid" src="https://lwg-assets.s3.us-east-1.amazonaws.com/gaunte/img/hero/eraser_pink.png" alt="eraser pink">
                    </div>
                    <div class="slider-1 cup">
                        <img class="img-fluid" src="https://lwg-assets.s3.us-east-1.amazonaws.com/gaunte/img/hero/coffee_cup.png" alt="coffee cup">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.gsap_hero {
    display: block;
    margin: 0;
    padding: 0;
    height: 728px;
    max-height: 728px;
}

.gsap_slider_wrap {
    display: block;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

.gsap_slider_wrap div.gsap_slider-1 {
    display: block;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

.gsap_slider_wrap div.holder {
    position: relative;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

.gsap_slider_wrap div.transparent {
    background-attachment: scroll;
    background-image: url('https://lwg-assets.s3.us-east-1.amazonaws.com/gaunte/img/hero/transparent.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    z-index: 4;
}

/* Sliders */

.gsap_slider-1 div.transparent {
    background-color: rgb(34, 34, 34);
    z-index: 4;
}

.gsap_slider-1 div.caption {
    position: absolute;
    color: rgba(244, 244, 244, 0.1);
    font-family: Poppins, Verdana, sans-serif;
    left: 65px;
    top: 142px;
    font-size: 150px;
    font-weight: 600;
    line-height: 132px;
    z-index: 5;
    /* data-transform_in="y:bottom;s:1500;e:Power4.easeOut;"
       data-transform_out="y:top;s:500;e:Power2.easeIn;s:500;e:Power2.easeIn;"
       data-start="600" */
}

.gsap_slider-1 div.pencil {
    position: absolute;
    left: 65px;
    top: 142px;
    //width: 590px;
    height: auto;
    z-index: 6;
}

.gsap_slider-1 div.eraser {
    position: absolute;
    left: 65px;
    top: 480px;
    //width: 590px;
    height: auto;
    z-index: 6;
}

.gsap_slider-1 div.cup {
    position: absolute;
    right: 65px;
    top: -144px;
    //width: 590px;
    height: auto;
    z-index: 6;
}

@media screen and (max-width: 1200px) {
    .gsap_slider-1 div.caption {
        left: 40px;
        top: 135px;
        font-size: 130px;
        line-height: 114px;
    }

    .gsap_slider-1 div.pencil {
        left: -140px;
        top: 135px;
        width: 90%;
    }
}

@media screen and (max-width: 960px) {
    .gsap_slider-1 div.caption {
        font-size: 117px;
        line-height: 102px;
    }

    .gsap_slider-1 div.pencil {
        width: 80%;
    }
}

@media screen and (max-width: 768px) {
    .gsap_slider-1 div.caption {
        left: 20px;
        top: 110px;
        font-size: 88px;
        line-height: 77px;
    }

    .gsap_slider-1 div.pencil {
        left: -200px;
        top: -40px;
        width: 60%;
    }
}

@media screen and (max-width: 480px) {
    .gsap_slider-1 div.caption {
        font-size: 63px;
        line-height: 55px;
    }

    .gsap_slider-1 div.pencil {
        width: 45%;
    }
}
</style>

<!-- // https://gsap.com/docs/v3/Installation/
     // https://codepen.io/isladjan/pen/abdyPBw -->
