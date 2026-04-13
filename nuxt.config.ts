// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "shadcn-nuxt",
  ],
  devtools: { enabled: true },
  css: ["./tailwind.css"],
  compatibilityDate: "2025-07-15",
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
    },
  },
  googleFonts: {
    families: {
      "DM Sans": "100..900",
      "Staatliches": 400,
    },
  },
  i18n: {
    defaultLocale: "fr",
    locales: [],
    strategy: "no_prefix",
  },
});
