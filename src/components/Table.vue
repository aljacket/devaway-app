<template>
<div class="overflow-x-auto">
        <div class="bg-gray-100 flex items-center justify-center font-sans">
            <div class="w-full lg:w-full">
                <div class="bg-white shadow-md rounded my-6">
                    <table class="min-w-max w-full table-auto">
                        <thead>
                            <tr class="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
                                <th class="py-3 px-3 text-left">Name</th>
                                <th class="py-3 px-3 text-left">Team</th>
                                <th v-for="(race, index) in races" :key="index" class="py-3 px-2 text-left">{{race.name}}</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 text-xs font-light">
                            <tr v-for="driver in drivers" :key="driver._id" class="border-b border-gray-200 hover:bg-gray-100">
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
                                <td  v-for="(race, index) in races" :key="index" class="py-3 px-2 text-left">
                                    {{race.time}}
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
    import { ref, onMounted } from 'vue';
    import drivers_kart from "@/data/drivers_karts_Front.json";

    export default {
        name: 'Table',
        setup() {
            const drivers = ref([]);
            const races = ref([]);

            onMounted(() => {
                drivers.value = drivers_kart;
                races.value = drivers_kart[0].races;
            });
            
            
            return {
                drivers,
                races
            }
        }
    }
</script>