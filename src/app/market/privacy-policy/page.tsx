"use client"
import Bar from "@/components/Bar/Bar";
import CustomDiv from "@/components/Content/CustomDiv";
import Footer from "@/components/footer/Footer";
import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.termly.io/embed-policy.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, [])
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
            <CustomDiv
              name="termly-embed"
              data-id="2b67a76c-6e31-4cf1-a83f-f22cd5b7099a"
              data-type="iframe"
            />
        </div>
        <Footer />
      </>
    )
}