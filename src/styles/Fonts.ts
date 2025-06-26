import { Noto_Sans_KR } from 'next/font/google'
import { Nunito } from 'next/font/google'

const fonts = {
 noto_100: Noto_Sans_KR({weight: "100"}),
 noto_300: Noto_Sans_KR({weight: "300"}),
 noto_500: Noto_Sans_KR({weight: "500"}),

 nunito_500: Nunito({weight: "800"})

};
export default fonts;
