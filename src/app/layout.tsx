import TopBar from '@/components/TopBar/TopBar'
import './globals.css'
import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import { Providers } from '../providers/providers'
import Script from 'next/script'
import ToastManager from '@/containers/ToastManager'

const barlow = Barlow({ subsets: ['latin'], weight: ['500'] })

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Skinwalet'
  },
  icons:{
    icon: './icon.ico'
  }
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta data-react-helmet="true" name="robots" content="noindex, nofollow"/>
      <body className={barlow.className}>
        <Providers>
          <div className='bg-darkSecondary w-full min-h-screen relative'>
            <TopBar isHidableOnScroll={true} />
            <div className='fixed top-[132px] right-0 ssl:right-6 z-50'>
              <ToastManager />
            </div>
              {children}
          </div>
        </Providers>
        
        <script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>
        <Script>
          {`window.intercomSettings = {
              api_base: "https://api-iam.intercom.io",
              app_id: "cp3xwlag"};`
          }
        </Script>
        <Script>{
          `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/cp3xwlag';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`}
        </Script>

      </body>
    </html>
  )
}
