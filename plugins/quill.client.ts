// plugins/quill.js
import { defineNuxtPlugin } from '#app';
import Quill from 'vue3-quill';

import 'quill/dist/quill.snow.css'; // You can change this to another theme, e.g., 'bubble'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Quill);
});
