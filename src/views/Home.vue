<template>
    <!-- <h1 class="w-full py-4 text-center font-bold">Kart Table</h1> -->
    <swiper
        :slides-per-view="1"
        :space-between="50"
        :autoplay='{
            "delay": 2500,
            "disableOnInteraction": false
        }'
    >
        <swiper-slide><Table /></swiper-slide>
        <swiper-slide><Table /></swiper-slide>
        <swiper-slide><Table /></swiper-slide>
       
    </swiper>
    
    <button 
        v-if="!isFull"
        class="absolute bottom-0 right-0 m-4 rounded-full h-20 w-20 shadow-lg z-10"
        @click="full"    
    >
        FULL
    </button>
</template>

<script>
    import { ref } from 'vue';
    import Table from '@/components/Table.vue';
    import { openFullscreen }  from '@/utils/fullscreen';

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/swiper.min.css';
    import SwiperCore, { Autoplay } from 'swiper/core';
    SwiperCore.use([Autoplay]);

    export default {
        name: 'Home',
        components: {
            Table,
            Swiper,
            SwiperSlide,
        },
        setup() {
            const isFull = ref(false);

            const full = () => {
                openFullscreen();
            }
            
            document.addEventListener("fullscreenchange", function(){
                // FULLSCREEN DISENGAGED
                if (document.fullscreenElement===null) {
                    isFull.value = false;
                }
                // FULLSCREEN ENGAGED
                else {
                    isFull.value = true;
                }
            });
            

            return {
                isFull, 
                full,
            }
        }
    }
</script>