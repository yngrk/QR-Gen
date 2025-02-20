// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/google-fonts'],

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