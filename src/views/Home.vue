<template>
    <!-- <h1 class="w-full py-4 text-center font-bold">Kart Table</h1> -->
    <Table />
    <button 
        v-if="!isFull"
        class="absolute bottom-0 right-0 m-4 rounded-full h-20 w-20 shadow-lg"
        @click="full"    
    >
        FULL
    </button>
</template>

<script>
    import { ref } from 'vue';
    import Table from '@/components/Table.vue';
    import { openFullscreen }  from '@/utils/fullscreen';

    export default {
        name: 'Home',
        components: {
            Table
        },
        setup() {
            const isFull = ref(false);

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

            return {
                isFull, 
                full
            }
        }
    }
</script>