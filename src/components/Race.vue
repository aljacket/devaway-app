<template>
    <div class="bg-gray-100 w-screen h-screen flex justify-center font-sans">
        <div class="w-full lg:w-full flex items-center justify-center">
            <div class="bg-white shadow-md rounded my-6">
                <table class="min-w-max w-full table-auto">
                    <thead>
                        <tr class="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
                            <th class="py-3 px-3 text-left">#</th>
                            <th class="py-3 px-3 text-left">Name</th>
                            <th class="py-3 px-3 text-left">Team</th>
                            <th class="py-3 px-3 text-left">{{ix < 0 ? 'Total' : 'Time'}}</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600 text-xs font-light">
                        <tr v-for="driver, index in leftSide" :key="driver._id" class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-3 px-3 text-left">{{ index+1 }}</td>
                            <td class="py-3 px-3 text-left">
                                <div class="flex items-center">
                                    <div class="mr-2">
                                        <img class="w-6 h-6 rounded-full" :src="driver.picture"/>
                                    </div>
                                    <span>{{driver.name}}</span>
                                </div>
                            </td>
                            <td class="py-3 px-3 text-left">
                                <div class="flex items-center">
                                    <span>{{driver.team}}</span>
                                </div>
                            </td>
                            <td class="py-3 px-2 text-left">
                                {{ ix < 0 ? formattedHours(driver.total) : driver.races[ix].time }}
                            </td> 
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="bg-white shadow-md rounded my-6">
                <table class="min-w-max w-full table-auto">
                    <thead>
                        <tr class="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
                            <th class="py-3 px-3 text-left">#</th>
                            <th class="py-3 px-3 text-left">Name</th>
                            <th class="py-3 px-3 text-left">Team</th>
                            <th class="py-3 px-3 text-left">{{ix < 0 ? 'Total' : 'Time'}}</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600 text-xs font-light">
                        <tr v-for="driver, index in rightSide" :key="driver._id" class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-3 px-3 text-left">{{ index+1+leftSide.length }}</td>
                            <td class="py-3 px-3 text-left">
                                <div class="flex items-center">
                                    <div class="mr-2">
                                        <img class="w-6 h-6 rounded-full" :src="driver.picture"/>
                                    </div>
                                    <span>{{driver.name}}</span>
                                </div>
                            </td>
                            <td class="py-3 px-3 text-left">
                                <div class="flex items-center">
                                    <span>{{driver.team}}</span>
                                </div>
                            </td>
                            <td class="py-3 px-2 text-left">
                                {{ ix < 0 ? formattedHours(driver.total) : driver.races[ix].time }}
                            </td> 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>   
</template>

<script>
    import { computed, ref } from "vue";
    import drivers_kart from "@/data/drivers_karts_Front.json";
    import { toTimestamp, stampToHours, sumOfTimes } from "@/utils/time";

    export default {
        name:'Race',
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
                    if(ix.value < 0) {
                        const timestamp = sumOfTimes(driver.races);
                        driver.total = timestamp;
                        return driver;
                    } else {
                        return driver;
                    }
                }) 
            );
                
            if(ix.value < 0) {
                sortedRaces.value = formattedRaces.value.sort(function (a, b){return a.total-b.total})
            } else {
                sortedRaces.value = formattedRaces.value.sort(function (a, b){return toTimestamp(a.races[ix.value].time)-toTimestamp(b.races[ix.value].time)})
            }    

            const leftSide = computed(() => {
                return sortedRaces.value.splice(0, half_length.value);
            });

            const rightSide = computed(() => {
                return sortedRaces.value.splice(-half_length.value);
            });
           

            return {
                ix,
                drivers,
                leftSide,
                rightSide,
                formattedHours
            }
        }
    }
</script>
