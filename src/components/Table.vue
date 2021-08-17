<template>
<div class="overflow-x-auto">
        <div class="bg-gray-100 h-screen flex items-center justify-center font-sans">
            <div class="w-full lg:w-full flex items-center justify-center">
                <div class="bg-white shadow-md rounded my-6">
                    <table class="min-w-max w-full table-auto">
                        <thead>
                            <tr class="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
                                <th class="py-3 px-3 text-left">#</th>
                                <th class="py-3 px-3 text-left">Name</th>
                                <th class="py-3 px-3 text-left">Team</th>
                                <th class="py-3 px-3 text-left">Total</th>
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
                                    {{formattedHours(driver.total)}}
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
                                <th class="py-3 px-3 text-left">Total</th>
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
                                    {{formattedHours(driver.total)}}
                                </td> 
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
    import { computed, ref } from "vue";
    import drivers_kart from "@/data/drivers_karts_Front.json";
    import { stampToHours } from "@/utils/time";

    export default {
        name: 'Table',        
        setup() {
            const drivers = ref(drivers_kart);
            const half_length = ref(Math.ceil(drivers_kart.length/2));

            const totalRaces = races => {
                let datestamp = 0;
                if(races.length){
                    races.forEach(race => {
                        const time = race.time.split(':');
                        const milliseconds = race.time.split('.');
                        
                        const date = new Date(0,0,0, time[0], time[1], time[2]).setMilliseconds(milliseconds[1]);
    
                        datestamp += date;
                    })
                }

                return datestamp;
            }

            const formattedHours = datestamp => {
                return stampToHours(datestamp);
            }

            const formattedRaces = computed(() => drivers.value.map(driver => {
                    const timestamp = totalRaces(driver.races);
                    driver.total = timestamp;
                    return driver;
                }).sort(function (a, b){return a.races-b.races}));
                    
            const leftSide = computed(() => {
                return formattedRaces.value.splice(0, half_length.value);
            });

            const rightSide = computed(() => {
                return formattedRaces.value.splice(-half_length.value);
            });    
                        
            return {
                leftSide,
                rightSide,
                formattedHours
            }
        }
    }
</script>