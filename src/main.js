import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import icons from './assets/icon'

const app =createApp(App);
for (let icon in icons) {
    app.component(icon, icons[icon]);
}
app.mount("#app");

