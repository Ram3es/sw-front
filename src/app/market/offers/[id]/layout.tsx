import Footer from '@/components/footer/Footer';


const LayoutOffer = ({ children }: { children: React.ReactNode}) => {
    return (
        <>
          {children}
          <Footer/>
        </>
    );
};

export default LayoutOffer;