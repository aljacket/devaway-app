<template>
    <!-- component -->
    <div class="w-screen h-screen flex items-center justify-center">
        <div class="w-full flex flex-col items-center justify-center">
            <div class="bg-white shadow-md rounded-lg my-6 opacity-90 text-xl font-bold px-4"> {{driver.name}} </div>
            <div class="w-full flex items-center justify-center">
                <div class="rounded-xl shadow-md overflow-hidden">
                    <div class="md:flex">
                        <div class="md:flex-shrink-0 relative">
                            <img 
                                class="h-56 w-full object-cover md:h-full md:w-96" 
                                src="https://cdn-5.motorsport.com/images/mgl/0rG4r9d2/s500/max-verstappen-red-bull-racing-1.jpg" 
                                alt="Man looking at item at a store"
                            >
                            <div class="text-center absolute w-full bg-gray-600 opacity-90" style="bottom: -30px">
                                <div class="mb-10 mt-2">
                                    <p class="text-gray-300 text-sm">{{ driver.age }} years old</p>
                                    <p class="text-white tracking-wide uppercase text-lg font-bold">{{driver.team}}</p>
                                </div>                    
                            </div>
                        </div>
                        <div class="bg-white opacity-90">
                        <table class="w-96 table-auto">
                                <thead>
                                        <tr class="bg-gray-600 text-gray-200 uppercase text-xs leading-normal">
                                            <th class="py-3 px-3 text-center">Race</th>
                                            <th class="py-3 px-3 text-center">Time</th>
                                            <th class="py-3 px-3 text-center">Position</th>
                                        </tr>
                                    </thead>
                                <tbody class="text-gray-600 text-xs font-light">
                                        <tr v-for="race, index in races" :key="index" class="border-b border-gray-200 hover:bg-gray-100">
                                            <td class="py-3 px-3 text-center">{{ race.name }}</td>                            
                                            <td class="py-3 px-3 text-center">{{race.time}}</td> 
                                            <td class="py-3 px-3 text-center text-green-500">{{race.position}}</td> 
                                        </tr>
                                    </tbody>
                            </table> 
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
    export default {
        props: {
            driver: {
                type: Object,
                default: () => ({})
            }
        },
        setup(props){
            const races = props.driver.races;
            const driver = props.driver;

            return{
                driver,
                races
            }
        }
    }
</script>