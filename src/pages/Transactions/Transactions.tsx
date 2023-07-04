import Bar from "../../components/Bar/Bar";
import { useHideOnScroll } from "../../helpers/useHideOnScroll";
import { classNames } from "../../helpers/className";
import TransactionsSidebar from "./TransactionsSidebar";

export default function TransactionsPage() {
  const shouldHide = useHideOnScroll();

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
        <div className="h-[200vh]">test</div>
      </div>
    </>
  );
}
