import { HeaderHome } from "@/components/ui/HeaderHome"
import {HeroSection} from "../components/ui/HeroSection"
import { HowItWorks } from "@/components/HowItWorks"
import { Testimonials } from "@/components/Testimonials"
import { Footer } from "@/components/Footers"
import { FeaturesGrid } from "@/components/Features"


export  const  Home = ()=>{

    return(
        <div>
           <HeaderHome/>
           <HeroSection/>
           <FeaturesGrid/>
           <HowItWorks/>
           <Testimonials/>
           <Footer/>
        </div>
    )
}