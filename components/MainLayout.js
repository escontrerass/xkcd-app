import { Header } from './Header'
import { Footer } from './Footer'

export function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className='w-full mx-auto my-4'>{children}</main>
      <Footer />
    </>
  )
}
