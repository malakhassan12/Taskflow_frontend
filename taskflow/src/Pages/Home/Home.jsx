import React from "react";
import Footer from "../../Components/Home/Footer/Footer";
import Header from "../../Components/Home/Header/Header";
import FeaturesSection from "../../Components/Home/FeaturesSection/FeaturesSection";
import TechStack from "../../Components/Home/TechStack/TechStack";
import CTASection from "../../Components/Home/CTASection/CTASection";
import Accounts from "../../Components/Home/Accounts/Accounts";

const Home = () => {
  return (
    <div>
      <Header />
      <FeaturesSection />
      <Accounts />
      <TechStack />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
