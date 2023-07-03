import { useState } from "react";
import Bar from "../../components/Bar/Bar";
import Dropbox from "../../components/Content/Dropbox";
import Checkbox from "../../components/Content/Checkbox";
import Datepicker from "../../components/Content/Datepicker";
import { SIDEBAR_LINKS } from "../../constants/sidebar-links";
import { useHideOnScroll } from "../../helpers/useHideOnScroll";
import { classNames } from "../../helpers/className";

export default function TransactionsPage() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [search, setSearch] = useState("");
  const [type, setType] = useState([
    {
      name: "Instant Sell",
      selected: false,
      numberOfItems: 0,
    },
    {
      name: "Purchase",
      selected: false,
      numberOfItems: 7,
    },
    {
      name: "Withdraw",
      selected: false,
      numberOfItems: 2,
    },
    {
      name: "Deposit",
      selected: false,
      numberOfItems: 1,
    },
    {
      name: "Prize",
      selected: false,
      numberOfItems: 12,
    },
  ]);
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
        <div className={classNames('flex flex-col flex-grow max-w-[256px] max-h-screen sticky bottom-0', shouldHide ? "h-[calc(100vh-60px)] top-[60px]" : "h-[calc(100vh-120px)] top-[120px]")}>
          <div className="p-6 w-full flex flex-col gap-8">
            <Dropbox label="type">
              <div className="flex flex-col w-full gap-3 mt-6">
                {type.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setType((prev) =>
                        prev.map((item, i) => {
                          if (i === index) {
                            return {
                              ...item,
                              selected: !item.selected,
                            };
                          } else {
                            return item;
                          }
                        })
                      );
                    }}
                    className="w-full cursor-pointer flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Checkbox checked={item.selected} />
                      </div>
                      <h1 className="font-['Barlow'] text-sm">
                        {item.name}
                      </h1>
                    </div>
                    <span className="font-['Barlow'] text-xs text-graySecondary font-medium uppercase">
                      {item.numberOfItems}
                    </span>
                  </div>
                ))}
              </div>
            </Dropbox>
            <div className="w-full border-t border-darkGrey" />
            <div className="bg-darkGrey p-3">
              <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search items" className="w-full bg-transparent border-none outline-none text-graySecondary font-['Barlow'] text-sm" />
            </div>
            <div className="w-full border-t border-darkGrey" />
            <Dropbox label="date range">
              <div className="flex gap-2 mt-6">
                <Datepicker label="From" selectedDate={startDate} onChange={(date) => setStartDate(date)} />
                <Datepicker label="To" selectedDate={endDate} onChange={(date) => setEndDate(date)} />
              </div>
            </Dropbox>
          </div>
          <div className="w-full border-t border-darkGrey" />
          <div className="p-6 w-full flex flex-col gap-8">
            <div className="flex gap-4 items-center flex-wrap">
              {SIDEBAR_LINKS.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <h1 className="font-['Barlow'] text-xs uppercase text-graySecondary">{item.title}</h1>
                  {index !== SIDEBAR_LINKS.length - 1 && (<div className="w-[3px] h-[3px] rounded-full bg-graySecondary" />)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[200vh]">test</div>
      </div>
    </>
  );
}
