<template>
    <div class="w-full h-full flex flex-col justify-center overflow-auto">   
        <div class="opacity-90 w-full text-center mt-6 mb-12 lg:text-xl bg-white">
            <div>{{ ix < 0 ? `Driver Standings` : `Race ${index}` }}</div>
        </div>
        <div class="flex flex-wrap px-4">
            <div 
                v-for="driver, index in sortedRaces"
                :key="index"
                class="w-full sm:w-1/2 md:w-1/3 mb-4 opacity-90 bg-gray-300 even:bg-gray-100"
            >
                <div class="flex flex-col">
                    <div class="flex items-center justify-between px-5 py-2">
                        <span class="text-green-600">{{index+1}}.</span>
                        <img class="w-10 h-10 rounded-full" :src="driver.picture"/>
                    </div>
                    <div class="flex items-center justify-between px-5 py-2">
                        <span class="text-gray-600">{{driver.name}}</span>
                        <span class="text-gray-600">{{driver.team}}</span>
                    </div>
                    <div class="text-center mb-2">{{ ix < 0 ? formattedHours(driver.total) : driver.races[ix].time }}</div>
                </div>
            </div>            
        </div>
        
    </div>   
</template>

<script>
    import { computed, ref } from "vue";
    import drivers_kart from "@/data/drivers_karts_Front.json";
    import { toTimestamp, stampToHours, sumOfTimes } from "@/utils/time";

    export default {
        name:'TableChart',
        props: {
            index: {
                type: Number,
                default: -1
            }
        },
        setup(props){
            const ix = ref(props.index);
            const drivers = ref(drivers_kart);
            const half_length = ref(Math.ceil(drivers_kart.length/2));
            const sortedRaces = ref([])

            const formattedHours = datestamp => {
                return stampToHours(datestamp);
            }           
           
            const formattedRaces = computed(() => drivers.value.map(driver => {
                    const timestamp = sumOfTimes(driver.races);
                    driver.total = timestamp;
                    return driver;                    
                }) 
            );
                
            if(ix.value < 0) {
                sortedRaces.value = formattedRaces.value.sort(function (a, b){return a.total-b.total})
            } else {
                sortedRaces.value = formattedRaces.value.sort(function (a, b){return toTimestamp(a.races[ix.value].time)-toTimestamp(b.races[ix.value].time)});
                sortedRaces.value.map((sortDriver, i) => {
                    sortDriver.races[ix.value].position = i+1;
                    return sortDriver;
                })
            }

            return {
                ix,
                drivers,
                formattedHours,
                sortedRaces
            }
        }
    }
</script>
