import { createHighlighterCore, createOnigurumaEngine } from 'shiki'
import githubDark from 'shiki/themes/github-dark.mjs'
import githubLight from 'shiki/themes/github-light.mjs'
import javascriptLang from 'shiki/langs/javascript.mjs'
import typescriptLang from 'shiki/langs/typescript.mjs'

import htmlLang from 'shiki/langs/html.mjs'
import cssLang from 'shiki/langs/css.mjs'
import goLang from 'shiki/langs/go.mjs'
import shellLang from 'shiki/langs/shellscript.mjs'
import vueLang from 'shiki/langs/vue.mjs'
import tsxLang from 'shiki/langs/tsx.mjs'

import wasm from 'shiki/wasm'

/**
 * Create a Shiki core highlighter instance, with no languages or themes
 * bundled. Wasm and each language and theme must be loaded manually.
 */
const highlighter = createHighlighterCore({
  // Specify the themes you want to use. You can include as many as you want.
  // See https://shiki.style/themes for a list of available themes.
  themes: [githubDark, githubLight],

  // Specify the languages you want to use. You can include as many
  // as you want.
  langs: [javascriptLang, typescriptLang, cssLang, tsxLang, htmlLang, shellLang, vueLang, goLang],

  // Default grammar parser. This is recommended for most use cases. You can
  // also use your own custom engine.
  // See https://shiki.style/guide/regex-engines#oniguruma-engine
  engine: createOnigurumaEngine(wasm),
})

export default highlighter
