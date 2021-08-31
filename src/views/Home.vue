<template>
    <swiper
        :slides-per-view="1"
        :space-between="50"
        :autoplay='{
            "delay": 5000,
            "disableOnInteraction": false
        }'
        @swiper="onSwiper"
    >
        <!-- general chart -->
        <swiper-slide><TableChart /></swiper-slide>

        <!-- races chart -->
        <swiper-slide v-for="race, index in races" :key="index">
            <TableChart :index="index" />
        </swiper-slide>

        <!-- pilots chart -->
        <swiper-slide v-for="driver in allDriversKart" :key="driver._id">
            <DriverInfo :driver="driver"/>
        </swiper-slide>
       
    </swiper>
    
    <full-screen-button :show="isFull">
        <template #icon>
            <arrow-expand class="w-10 h-10 text-gray-600"></arrow-expand>
        </template>
    </full-screen-button>
</template>

<script>
    import { ref } from 'vue';
    import TableChart from '@/components/TableChart.vue';
    import DriverInfo from '@/components/DriverInfo.vue';

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/swiper.min.css';
    import SwiperCore, { Autoplay } from 'swiper/core';
    SwiperCore.use([Autoplay]);

    import drivers_kart from "@/data/drivers_karts_Front.json";
    import FullScreenButton from '@/components/FullScreenButton.vue';
import ArrowExpand from '@/assets/icon/arrowExpand.vue';

    export default {
        name: 'Home',
        components: {
            DriverInfo,
            TableChart,
            Swiper,
            SwiperSlide,
            FullScreenButton,
                ArrowExpand,
        },
        setup() {
            const isFull = ref(false);                       
            const allDriversKart = ref(drivers_kart);
            const races = ref(drivers_kart[0].races);            
            
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
                onSwiper
            }
        }
    }
</script>