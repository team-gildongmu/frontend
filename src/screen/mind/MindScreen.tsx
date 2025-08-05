import CarouselTabs from "@/component/mind/CarouselTabs";
import { MindCard } from "@/component/mind/MindCard";

export default function MindScreen () {
// screen 단위에서 어떻게 보일지 만들어 주면 됨
    return(
        <>
            <CarouselTabs />
            <MindCard/>
        </>
    )   
}