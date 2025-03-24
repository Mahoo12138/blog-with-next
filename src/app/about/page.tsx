import { genPageMetadata } from 'src/app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return (
    <>
      <div>About Page</div>
    </>
  )
}
