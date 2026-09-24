import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    base: '/emsi-o-g3/',
    plugins: [react()],
});
