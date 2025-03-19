'use client'

import { ThemeProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux'

import store from '#/store'

export function Providers({ children, theme }: { children: React.ReactNode; theme?: string }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
      {/* Redux Store Provider */}
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  )
}
