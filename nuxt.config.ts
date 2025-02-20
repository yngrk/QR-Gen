// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/google-fonts', '@nuxt/ui'],

  googleFonts: {
    families: {
      Barrio: {
        wght: [400,600],
      },
      "Noto Sans": {
        wght: [400,600],
      }
    }
  }
})