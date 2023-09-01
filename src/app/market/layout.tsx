import TopBar from "@/components/TopBar/TopBar";
import { Providers } from "@/providers/providers";

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        <TopBar isHidableOnScroll={true} />
      </Providers>
      {children}
    </>
  );
}
