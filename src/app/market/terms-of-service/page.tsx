'use client'
import Bar from "@/components/Bar/Bar";
import CustomDiv from "@/components/Content/CustomDiv";
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
              terms of service
            </h1>
          </div>
        </Bar>
        <div className=" px-6 pt-16 pb-32">
            <div ></div>
            <CustomDiv name="termly-embed" data-id="d038d6a3-bbc6-458e-8070-f466cbf56142" data-type="iframe"/>
        </div>
      </>
    )
}