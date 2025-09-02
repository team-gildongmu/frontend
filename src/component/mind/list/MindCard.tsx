"use client"
import Image from "next/image"
import * as C from "./MindCard.styles"
import { useState } from "react";
import { useRouter } from "next/navigation";

export function MindCard(){
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return(
            <C.Wrap>
                <C.TitleWrap>
                    <C.Title__l onClick={() => (router.push(`/mind/${2}`))}>
                        <C.Title>📖 강릉에서의 멈춤</C.Title>
                        <C.Date>
                            <span>2025년 6월 5일, 맑음 ☀️</span>
                        </C.Date>
                    </C.Title__l>
                    <C.Title__r>
                        <C.Setting_btn onClick={() => setOpen((prev) => !prev)}>
                            ⚙ 설정
                        </C.Setting_btn>

                        <C.Setting_conform $open={open}>
                            <C.Update onClick={() => alert("수정 클릭됨!")}>수정</C.Update>
                            <C.Delete onClick={() => alert("삭제 클릭됨!")}>삭제</C.Delete>
                        </C.Setting_conform>
                    </C.Title__r>
                </C.TitleWrap>
                <Image
                    src="/mind-test-image/mind-test-image.png"
                    width={500}
                    height={300}
                    alt="일기 사진"
                    onClick={() => (router.push(`/mind/${2}`))}
                    />
            </C.Wrap>
    )
}
