import { useState, MouseEvent } from "react";
import Bar from "../../components/Bar/Bar";
import { useHideOnScroll } from "../../helpers/useHideOnScroll";
import { classNames } from "../../helpers/className";
import TransactionCard from "../../components/Content/TransactionCard";
import { TRANSACTIONS } from "../../mock/invoices";
import DownloadFileIcon from "../../components/icons/DownloadFileIcon";
import TransactionsSidebar from "./TransactionsSidebar";
import Dropbox from "../../components/Content/Dropbox";

export default function TransactionsPage() {
  const shouldHide = useHideOnScroll();

  const download = (e: MouseEvent) => {
    e.stopPropagation()
    console.log('click');
  }


  return (
    <>
      <Bar>
        <div className="flex justify-between items-center h-full px-6">
          <h1 className='text-white font-["Barlow"] text-[21px] font-medium uppercase'>
            Transactions
          </h1>
        </div>
      </Bar>
      <div className="flex text-white pt-5">
        <div className={classNames('flex flex-col flex-grow max-w-[256px] max-h-screen sticky overflow-auto bottom-0', shouldHide ? "h-[calc(100vh-60px)] top-[60px]" : "h-[calc(100vh-120px)] top-[120px]")}>
          <TransactionsSidebar />
        </div>
        <div className="h-[200vh] w-full flex flex-col">
          <div className=" w-full max-w-[672px] mx-auto ">
            <Dropbox 
              label="AUGUST 2020"
              renderSubHeader={
                  <div 
                    className="flex items-center gap-2 text-graySecondary ml-2 hover button"
                    onClick={download}
                  >
                    <DownloadFileIcon />
                    <span className="text-sm tracking-[1.12px] uppercase">invoice</span>
                  </div>
                }
              >
              <div className="flex flex-col gap-3 mt-4"> 
                {TRANSACTIONS.map((trx) =>  <TransactionCard key={trx.hash} {...trx} />)}
              </div>
            </Dropbox>
            <div className=" border border-b border-darkGrey my-8" />
          </div>
        </div>
      </div>
    </>
  );
}
