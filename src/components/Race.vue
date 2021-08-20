<template>
    <div class="w-screen h-screen flex flex-col justify-center">
        <div class="w-full flex flex-col items-center justify-center">
            <div class="bg-white shadow-md rounded-lg my-6 opacity-90 text-sm lg:text-xl font-bold px-4">
                {{ ix < 0 ? `Driver Standings` : `Race ${index}` }}
            </div>
            <div class="w-full flex items-center justify-center">
                <div 
                    v-for="sideDirvers, index in sortedDrivers"
                    :key="index"
                    class="bg-white shadow-md  my-6 opacity-90"
                >
                    <table 
                        class="w-full table-auto"
                        :class="[index === 0 ? 'border-r-2': '']"
                    >
                        <thead>
                            <tr class="bg-gray-600 h-auto text-white uppercase text-xs lg:text-ms">
                                <th class="p-3 text-center"></th>
                                <th class="p-3 text-center">Name</th>
                                <th class="p-3 text-left">Team</th>
                                <th class="p-3 text-left">Time</th>
                            </tr>
                        </thead>
                        <tbody class="text-black text-xs lg:text-sm">
                            <tr v-for="driver, i in sideDirvers" :key="driver._id" class="h-auto border-b border-gray-200 even:bg-gray-100">
                                <td class="p-3 text-left text-green-600">{{ index === 0 ? i+1 : i+1+sortedDrivers[0].length }}</td>
                                <td class="p-3 w-auto text-left">
                                    <div class="flex items-center">
                                        <div class="mr-2">
                                            <img class="w-6 h-6 rounded-full" :src="driver.picture"/>
                                        </div>
                                        <span>{{driver.name}}</span>
                                    </div>
                                </td>
                                <td class="p-3 w-auto text-left">
                                    <div class="flex items-center">
                                        <span>{{driver.team}}</span>
                                    </div>
                                </td>
                                <td class="p-3 w-auto text-left">
                                    {{ ix < 0 ? formattedHours(driver.total) : driver.races[ix].time }}
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

            const leftSide = computed(() => {
                return sortedRaces.value.splice(0, half_length.value);
            });

            const rightSide = computed(() => {
                return sortedRaces.value.splice(-half_length.value);
            });
            
            const sortedDrivers = [leftSide.value, rightSide.value];

            return {
                ix,
                drivers,
                formattedHours,
                sortedDrivers
            }
        }
    }
</script>
