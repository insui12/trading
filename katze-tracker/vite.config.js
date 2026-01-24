import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isNetlify = Boolean(process.env.NETLIFY)

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : (isNetlify ? '/' : '/trading/'),
  plugins: [react()],
}))
