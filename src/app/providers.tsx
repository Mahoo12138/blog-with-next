'use client'

import { ThemeProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux'
import siteMetadata from '#/data/siteMetadata.mjs'

import store from '#/store'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      {/* Redux Store Provider */}
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  )
}
