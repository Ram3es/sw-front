import TopBar from "@/components/TopBar/TopBar";
import { Providers } from "@/providers/providers";

export default function RedeemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <>
        <TopBar isHidableOnScroll={true} />
        {children}
      </>
    </Providers>
  );
}
