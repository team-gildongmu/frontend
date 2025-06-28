import { Noto_Sans_KR } from 'next/font/google'
import { Nunito } from 'next/font/google'

// 폰트는 반드시 const 로 직접 선언부가 있어야 에러 안남.
const noto_100 = Noto_Sans_KR({weight: "100"});
const noto_300 = Noto_Sans_KR({weight: "300"});
const noto_500 = Noto_Sans_KR({weight: "500"});

const nunito_500 = Nunito({weight: "800"})

export const fonts = {
    noto_100,
    noto_300,
    noto_500,
    nunito_500
}

