import Image from "next/image"
import Link from "next/link"
import * as C from "./MindCard.styles"
export function MindCard(){
    return(
        <Link href={`/mind/${2}`}>
            <C.Wrap>
                <Image
                    src="/mind-test-image/mind-test-image.png"
                    width={500}
                    height={300}
                    alt="일기 사진"
                    />
                <C.Title>📖 강릉에서의 멈춤</C.Title>
                <C.Date>
                    <span>2025년 6월 5일, 맑음 ☀️</span>
                </C.Date>
            </C.Wrap>
        </Link>
    )
}
