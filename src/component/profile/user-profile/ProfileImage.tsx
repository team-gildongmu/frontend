import Icon from "../../common/IconifyIcon";
import * as P from "./ProfileImage.styles"
import Image from "next/image"

type Props = {
    // user 정보를 상태관리 하는 게 있으면 그걸로 하고, 
    // 없으면 userInfo 를 받아오긴 해야함
    //해당 유저의 고유 id 나 뭔가를 받아온 후 이미지를 꺼내서 사용하던가. 해야함.
    userInfo: number;
    image: string;
}

export default function ProfileImage({userInfo, image}: Props){
    console.log("userInfo", userInfo)
    return (
        <P.ImageWrap >
            {image ? 
            <Image src={image}
              width={0}
              height={0}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "97px",
                objectFit: "cover",
              }} alt="유저 프로필 이미지" />
              :
            <P.IconWrap>
                <Icon
                    icon="tdesign:user-1-filled"
                    width={60}
                    height={60}
                    color={"#000"} 
                    />
            </P.IconWrap>
            }
        </P.ImageWrap>
    )
}