'use client'

import { ThemeProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux'

import store from '#/store'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // TODO: Fix the theme provider
    // <ThemeProvider attribute="class" defaultTheme={'siteMetadata.theme'} enableSystem>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {/* Redux Store Provider */}
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  )
}
