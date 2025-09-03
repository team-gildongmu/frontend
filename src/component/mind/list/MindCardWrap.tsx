import { MindCard } from "./MindCard";
import styled from "styled-components";

const MindScreenWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export default function MindCardWrap () {
    const data = [
        {
            "id": 1,
            "title": "📖 강릉에서의 멈춤",
            "date": "2025-06-05",
            "weather": "맑음 ☀️",
            "image": "/mind-test-image/mind-test-image.png"
        },
        {
            "id": 2,
            "title": "📖 제주 바닷가 산책",
            "date": "2025-06-06",
            "weather": "흐림 ☁️",
            "image": "/mind-test-image/mind-test-image.png"
        },
        {
            "id": 3,
            "title": "📖 서울 카페 탐방",
            "date": "2025-06-07",
            "weather": "비 🌧️",
            "image": "/mind-test-image/mind-test-image.png"
        },
        {
            "id": 4,
            "title": "📖 산책 중의 깨달음",
            "date": "2025-06-08",
            "weather": "맑음 ☀️",
            "image": "/mind-test-image/mind-test-image.png"
        },
        {
            "id": 5,
            "title": "📖 도서관에서의 집중",
            "date": "2025-06-09",
            "weather": "흐림 ☁️",
            "image": "/mind-test-image/mind-test-image.png"
        },
        {
            "id": 6,
            "title": "📖 친구와의 만남",
            "date": "2025-06-10",
            "weather": "맑음 ☀️",
            "image": "/mind-test-image/mind-test-image.png"
        }]

    return (
        <MindScreenWrap>
            {data.map(({ id, title, date, weather, image }) => (
                <MindCard
                    key={id}
                    id={id}
                    title={title}
                    date={date}
                    weather={weather}
                    image={image}
                />
            ))}
        </MindScreenWrap>
    )
}
