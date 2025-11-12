import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PartnersSection from "@/components/PartnersSection";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <Layout showFooter>
      <HeroSection />
      <HowItWorks />
      <PartnersSection />
      <FAQ />
    </Layout>
  );
};

export default Index;
