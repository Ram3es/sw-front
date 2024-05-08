
import Footer from '@/components/footer/Footer'
import Script from 'next/script'
 
export default function TOSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Footer/>
    </>
  )
}