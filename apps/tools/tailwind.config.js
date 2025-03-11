module.exports = {
  presets: [
    require('@vercel/examples-ui/tailwind'),
    require('../../packages/blog-design-system/dist/tailwind.d.cts'),
  ],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    // Add the external packages that are using Tailwind CSS
    '../../packages/blog-components/src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@blog/design-system/dist/**/*.js',
    './node_modules/@vercel/examples-ui/**/*.js',
  ],
}
