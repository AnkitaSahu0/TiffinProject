import AboutPage from "@/my-app/components/landing/About";
import Hero from "@/my-app/components/landing/Hero";
import Services from "@/my-app/components/landing/Services";
import Plans from "@/my-app/components/landing/Plans";
import Contact from "@/my-app/components/landing/Contact";

import Navbar from "@/my-app/components/common/Navbar";
import Footer from "@/my-app/components/common/Footer";


const Page = () => {
  return (

    <>
    <Navbar/>


      <main>

        {/* 🔥 FULL WIDTH HERO */}
        <section
          id="home"
          className="w-screen min-h-screen overflow-x-hidden"
        >
          <Hero />
        </section>

        {/* BOXED CONTENT BELOW */}
        <section id="about" className="pt-20">
          <AboutPage />
        </section>

        <section id="services" className="pt-20">
          <Services />
        </section>

        <section id="plans" className="pt-20">
          <Plans />
        </section>

        <section id="contact" className="pt-20">
          <Contact />
        </section>

      </main>

      <Footer/>
    </>
    
  );
};

export default Page;
