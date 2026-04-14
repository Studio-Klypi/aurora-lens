// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
  ],
  devtools: { enabled: true },
  css: ["./tailwind.css"],
  colorMode: {
    classPrefix: "",
    classSuffix: "",
    preference: "system",
    fallback: "dark",
    storageKey: "aurora-lens-scheme",
  },
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
    locales: [
      {
        name: "Français",
        code: "fr",
        iso: "fr-FR",
        file: "fr.json",
      },
    ],
    strategy: "no_prefix",
  },
  shadcn: {
    prefix: "ui",
    componentDir: "./app/components/ui",
  },
});
