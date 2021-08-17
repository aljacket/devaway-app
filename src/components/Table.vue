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
                                    {{stampToHours(driver.races)}}
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
                                    {{stampToHours(driver.races)}}
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
    import drivers_kart from "@/data/drivers_karts_Front.json";
    import { stampToHours } from "@/utils/time";

    export default {
        name: 'Table',
        data() {
            return {
                drivers: drivers_kart,
                races: drivers_kart[0].races,
                half_length: Math.ceil(drivers_kart.length/2)
            }
        },
        computed: {
            formattedRaces() {
                return this.drivers.map(driver => {
                    const timestamp = this.totalRaces(driver.races);
                    driver.races = timestamp;
                    return driver;
                }).sort(function (a, b){return a.races-b.races});
            },
            leftSide() {
                return this.formattedRaces.splice(0, this.half_length);
            },
            rightSide() {
                return this.formattedRaces.splice(-this.half_length);
            }
        },
        methods: {
            totalRaces(races){
                let datestamp = 0;
                races.forEach(race => {
                    const time = race.time.split(':');
                    const milliseconds = race.time.split('.');
                    
                    const date = new Date(0,0,0, time[0], time[1], time[2]).setMilliseconds(milliseconds[1]);

                    datestamp += date;
                })                

                return datestamp;
            },
            stampToHours(datestamp) {
                return stampToHours(datestamp);
            }
        }
        // setup() {
        //     const drivers = drivers_kart;

        //     const half_length = Math.ceil(drivers.length/2);
        //     const leftSide = drivers.splice(0, half_length);
        //     const rightSide = drivers.splice(-half_length);

        //     // console.log('leftSide', races.value);
            
        //     return {
        //         leftSide,
        //         rightSide
        //     }
        // }
    }
</script>