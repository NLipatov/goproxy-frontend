import {Header} from "~/landing/header/header";
import {Introduction} from "~/landing/introduction/introduction";
import {Pricing} from "~/landing/pricing/pricing";
import {FAQ} from "~/landing/faq/faq";

export function Landing(){
    return (
        <div>
            <Header />
            <Introduction />
            <Pricing />
            <FAQ />
        </div>
    )
}