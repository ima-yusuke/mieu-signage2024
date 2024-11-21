import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/css/content.css',
                'resources/css/category.css',
                'resources/js/app.js',
                'resources/js/main.js',
                'resources/js/screen-size.js',
                `resources/js/particle.js`,
                'node_modules/swiper/swiper-bundle.min.css', // SwiperのCSSを追加
            ],
            refresh: true,
        }),
    ],
});
