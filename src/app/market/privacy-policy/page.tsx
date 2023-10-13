import Bar from "@/components/Bar/Bar";
import Footer from "@/components/footer/Footer";
import Script from "next/script";

export default function TermsOfService() {
  
    return(
      <>
        <Bar>
          <div className="flex justify-between items-center h-full px-6">
            <h1 className='text-white font-Barlow text-[21px] font-medium uppercase'>
              privacy policy
            </h1>
          </div>
        </Bar>
        <div className=" min-h-[100vh] px-6 pt-16 pb-32">
          <div className="max-w-[810px] mx-auto">
            <form name="termly-embed" data-id="2b67a76c-6e31-4cf1-a83f-f22cd5b7099a"></form>
          </div>
        </div>
        <Footer />
        <Script 
          type="text/javascript"
        >{`(function(d, s, id) {
            var js, tjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://app.termly.io/embed-policy.min.js";
            tjs.parentNode.insertBefore(js, tjs);
          }(document, 'script', 'termly-jssdk'));
          `}</Script>
      </>
    )
}