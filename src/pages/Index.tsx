import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import Differentiation from "@/components/Differentiation";
import Calculator from "@/components/Calculator";
import HowItWorks from "@/components/HowItWorks";
import InPractice from "@/components/InPractice";
import DigitalPortal from "@/components/DigitalPortal";
import LocalTrust from "@/components/LocalTrust";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Problem />
      <Services />
      <Differentiation />
      <Calculator />
      <HowItWorks />
      <InPractice />
      <DigitalPortal />
      <LocalTrust />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
