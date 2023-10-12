import Bar from "@/components/Bar/Bar";
import Dropbox from "@/components/Content/Dropbox";
import Footer from "@/components/footer/Footer";
import { FAQ_DATA } from "@/constants/service-pages";
import { classNames } from "@/helpers/className";




export default function FAQ (){

  return(
      <>
        <Bar>
          <div className="flex justify-between items-center h-full px-6">
            <h1 className='text-white font-Barlow text-[21px] font-medium uppercase'>
                Faq
            </h1>
          </div>
        </Bar>
        <div className=" w-full mt-[68px] mb-40">
          <div className=" max-w-[1160px] mx-auto px-6 flex flex-col gap-[120px] ">
            {FAQ_DATA.map(block =>(
              <div key={block.topic} className="w-full flex">
                <div className="w-1/3 text-white uppercase tracking-[1.28px]">{block.topic}</div>
                <div className="w-2/3">
                  {block.paragrafs.map((paragraf, idx) => (
                    <div key={paragraf.hash} className={classNames("py-4 border-white/10",
                      block.paragrafs.length - 1 === idx ? 'border-y' : ' border-t')} >
                      <Dropbox 
                        label={paragraf.title}
                        additionalClasses='text-lg text-white flex justify-between items-center [&_.label-wrap]:text-left'
                      >
                        <div className="mt-6 text-graySecondary ">
                          {paragraf.content.map((item , idx) => (
                            <p key={idx} className="leading-6 font-normal">{item.text}</p>
                          ))}
                        </div>
                      </Dropbox>
                    </div>
                  ))}
                  
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer/>
      </>
  )  
}