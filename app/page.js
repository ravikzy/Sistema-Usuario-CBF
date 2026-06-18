import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot, faMessage } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faFlickr, faInstagram, faLinkedin, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Footer from "@/components/sections/Footer";
import Contato from "@/components/sections/Contato";
import ThemeButton from "@/components/ui/ThemeButton";
export default function Home() {
  return (
    <main className="">


      <Header />
      <Hero />
      <About />
      <Contato />
      <Footer />
        <a href="/mensagens" className=" fixed bottom-6 right-6 rounded-full flex h-16 w-16 items-center justify-center text-white shadow-lg transition-all hover:bg-amber-300  bg-green-500/50" >
          <FontAwesomeIcon icon={faMessage} className="w-2 h-2" />
        </a>
      
    </main>
  )
} 