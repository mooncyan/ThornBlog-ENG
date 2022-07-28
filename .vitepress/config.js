import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'THORN Blog',
  description: 'The official blog for the THORN app',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.svg'
      }
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'IJDEYXQY',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],
  vite: {
    build: {
      minify: 'terser'
    }
  },
  locales: {
    '/': {
      lang: 'en-US',
      label: 'English',
      selectText: 'Languages'
    }
  }
})
