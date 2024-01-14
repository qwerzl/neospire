export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', "@nuxt/image"],
  runtimeConfig: {
    // Private keys are only available on the server
    ghostUrl: process.env.GHOST_URL,
    ghostContentKey: process.env.GHOST_CONTENT_KEY
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})
