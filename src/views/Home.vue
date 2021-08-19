<template>
    <swiper
        :slides-per-view="1"
        :space-between="50"
        :autoplay='{
            "delay": 3500,
            "disableOnInteraction": false
        }'
        @swiper="onSwiper"
    >
        <!-- general chart -->
        <swiper-slide><Race /></swiper-slide>

        <!-- races chart -->
        <swiper-slide v-for="race, index in races" :key="index">
            <Race :index="index" />
        </swiper-slide>

        <!-- pilots chart -->
        <swiper-slide v-for="driver in allDriversKart" :key="driver._id">
            <Pilot :driver="driver"/>
        </swiper-slide>
       
    </swiper>
    
    <button 
        v-if="!isFull"
        class="absolute bottom-0 right-0 m-4 rounded-full h-20 w-20 shadow-lg z-10 flex items-center justify-center bg-white"
        @click="full"    
    >
        <arrow-expand class="w-10 h-10 text-gray-600" />
    </button>
</template>

<script>
    import { ref } from 'vue';
    import Race from '@/components/Race.vue';
    import Pilot from '@/components/Pilot.vue';
    import { openFullscreen }  from '@/utils/fullscreen';

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/swiper.min.css';
    import SwiperCore, { Autoplay } from 'swiper/core';
    SwiperCore.use([Autoplay]);

    import drivers_kart from "@/data/drivers_karts_Front.json";
import ArrowExpand from '@/assets/icon/arrowExpand.vue';

    export default {
        name: 'Home',
        components: {
            Pilot,
            Race,
            Swiper,
            SwiperSlide,
            ArrowExpand,
        },
        setup() {
            const isFull = ref(false);                       
            const allDriversKart = ref(drivers_kart);
            const races = ref(drivers_kart[0].races);

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
                races,
                isFull, 
                full,
                onSwiper
            }
        }
    }
</script>