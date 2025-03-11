module.exports = {
  presets: [
    require('@vercel/examples-ui/tailwind'),
    require('@blog/design-system/tailwind'),
  ],
  content: [
    // All the packages that might include stories
    './node_modules/@vercel/examples-ui/**/*.js',
    './node_modules/@blog/design-system/**/*.js',
    './node_modules/@blog/pages/**/*.js',
  ],
}
