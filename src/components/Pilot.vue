<template>
    <!-- component -->
    <div class="w-screen h-screen flex items-center justify-center">        
        <div class="mx-auto flex items-center justify-center rounded-lg overflow-hidden shadow-lg my-2 bg-white">
            <div class="relative">
                <img class="w-full" src="https://unsplash.com/photos/PElJMFWV3kk/download?force=true&w=640"
                    alt="Profile picture" />
                <div class="text-center absolute w-full" style="bottom: -30px">
                    <div class="mb-10">
                    <p class="text-white tracking-wide uppercase text-lg font-bold">{{driver.name}}</p>
                    <p class="text-gray-400 text-sm">{{ driver.age }}</p>
                    <p class="text-white tracking-wide uppercase text-lg font-bold">{{driver.team}}</p>
                    </div>
                    <button class="p-4 rounded-full transition ease-in duration-200 focus:outline-none">
                    <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6">
                        <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                            C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                            C15.952,9,16,9.447,16,10z" />
                    </svg>
                    </button>
                </div>
            </div>
            <div class="w-full h-full text-center">
               <table class="min-w-max w-full table-auto">
                   <thead>
                        <tr class="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
                            <th class="py-3 px-3 text-left">Race</th>
                            <th class="py-3 px-3 text-left">Time</th>
                        </tr>
                    </thead>
                   <tbody class="text-gray-600 text-xs font-light">
                        <tr v-for="race, index in races" :key="index" class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-3 px-3 text-left">{{ race.name }}</td>                            
                            <td class="py-3 px-3 text-left">
                                <div class="flex items-center">
                                    <span>{{race.time}}</span>
                                </div>
                            </td> 
                        </tr>
                    </tbody>
               </table>
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