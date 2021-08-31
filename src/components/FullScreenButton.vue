<template>
    <button 
        v-if="!show"
        class="fixed bottom-0 right-0 m-4 rounded-full h-20 w-20 shadow-lg z-10 flex items-center justify-center bg-white"
        @click="full"    
    >
        <slot name="icon"/>
    </button>
</template>

<script>    
    import { openFullscreen }  from '@/utils/fullscreen';

    export default {
        name:'FullScreenButton',
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        setup() {
            const full = () => {
                openFullscreen();
            }

            return {
                full
            }
        }
    }
</script>
