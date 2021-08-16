<template>
    <!-- <h1 class="w-full py-4 text-center font-bold">Kart Table</h1> -->
    <swiper
        :slides-per-view="1"
        :space-between="50"
        :autoplay='{
            "delay": 3500,
            "disableOnInteraction": true
        }'
        @swiper="onSwiper"
    >
        <swiper-slide><Table /></swiper-slide>
        <!-- <swiper-slide><Table /></swiper-slide>
        <swiper-slide><Pilot /></swiper-slide> -->
       
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
    import Pilot from '@/components/Pilot.vue';
    import { openFullscreen }  from '@/utils/fullscreen';

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/swiper.min.css';
    import SwiperCore, { Autoplay } from 'swiper/core';
    SwiperCore.use([Autoplay]);

    import drivers_kart from "@/data/drivers_karts_Front.json";

    export default {
        name: 'Home',
        components: {
            Table,
            Pilot,
            Swiper,
            SwiperSlide,
        },
        setup() {
            const isFull = ref(false);                       
            const allDriversKart = drivers_kart;

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

            /**Disable / enable ability move slider by grabbing it with mouse or by touching 
             * it with finger (on touch screens) by assigning false / true to this property */
            const onSwiper = swiper => {
                swiper.allowTouchMove = false;
            }
            

            return {
                allDriversKart,
                isFull, 
                full,
                onSwiper
            }
        }
    }
</script>