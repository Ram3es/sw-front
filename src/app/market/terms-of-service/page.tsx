'use client'
import Bar from "@/components/Bar/Bar";
import Script from "next/script";
import { useEffect } from "react";

export default function TermsOfService() {
    // useEffect(() => {
    //     return () => {
    //      const script = document.getElementById('termly')
    //      if(script?.parentNode){
    //         console.log(script)
    //         script.parentNode.removeChild(script)
    //      }
    //     }
    // }, [] )
    return(
      <>
        <Bar>
          <div className="flex justify-between items-center h-full px-6">
            <h1 className='text-white font-Barlow text-[21px] font-medium uppercase'>
              terms of service
            </h1>
          </div>
        </Bar>
        <div className=" px-6 pt-16 pb-32">
          <div className="max-w-[810px] mx-auto">
            <form name="termly-embed" data-id="d038d6a3-bbc6-458e-8070-f466cbf56142"></form>
          </div>
        </div>
        <Script 
          type="text/javascript"
        >{`(function(d, s, id) {
        var js, tjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://app.termly.io/embed-policy.min.js";
        tjs.parentNode.insertBefore(js, tjs);
        }(document, 'script', 'termly-jssdk'));`}</Script>
      </>
    )
}