"use client"
import Image from "next/image"
import * as C from "./MindCard.styles"
import { useState } from "react";
import { useRouter } from "next/navigation";

type MindCardProps = {
  id: number;
  title: string;
  date: string;
  weather: string;
  image: string;
};


export function MindCard({ id, title, date, weather, image }: MindCardProps){
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return(
            <C.Wrap>
                <C.TitleWrap>
                    <C.Title__l onClick={() => (router.push(`/mind/${id}`))}>
                        <C.Title>{title}</C.Title>
                        <C.Date>
                            <span>{date}, {weather}</span>
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
                    src={image} width={500} height={300} alt="일기 사진" 
                    onClick={() => (router.push(`/mind/${id}`))}
                    />
            </C.Wrap>
    )
}
