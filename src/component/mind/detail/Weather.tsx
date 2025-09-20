import Icon from "@/component/common/IconifyIcon";
import { styled } from "styled-components";

interface Props {
  weather: string;
}

export default function Weather({ weather }: Props) {
  const renderIcon = () => {
    switch (weather) {
      case "맑음":
        return <Icon icon="tdesign:sun" width={20} height={20} color="#f9d71c" />;
      case "흐림":
        return <Icon icon="tdesign:cloud" width={20} height={20} color="#808080" />;
      case "비":
        return <Icon icon="tdesign:rain" width={20} height={20} color="#0077be" />;
      case "눈":
        return <Icon icon="tdesign:snowflake" width={20} height={20} color="#00aaff" />;
      default:
        return null;
    }
  };

  return (
    <WeatherWrap>
      {renderIcon()}
      <WeatherText>{weather}</WeatherText>
    </WeatherWrap>
  );
}

const WeatherWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
`;

const WeatherText = styled.span`
  font-size: 14px;
`;