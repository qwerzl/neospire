export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', "@nuxt/image", 'nuxt-icon', 'dayjs-nuxt'],
  // routeRules: {
  //   '/': { ssr: false },
  //   '/post/*': { ssr: false },
  // },
  runtimeConfig: {
    // Private keys are only available on the server
    public: {
      baseUrl: process.env.VERCEL ? `https://${process.env.BASE_DOMAIN}` : "http://localhost:3000"
    },
    ghostUrl: process.env.GHOST_URL,
    ghostContentKey: process.env.GHOST_CONTENT_KEY
  },
  dayjs: {
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en',
    defaultTimezone: 'Asia/Shanghai',
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
