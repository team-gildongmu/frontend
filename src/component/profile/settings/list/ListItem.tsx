import Icon from "@/component/common/IconifyIcon";
import colors from "@/styles/Colors";
import { useRouter } from "next/navigation";
import styled from "styled-components";

type Props = {
  label: string;
  index: string;
}

export default function ListItem({ label, index }: Props) {
    const router = useRouter();
  return (
    <Item onClick={() => router.push(index)}>
      <p>{label}</p>
      <span>
      <Icon  
        icon="tdesign:chevron-right"
        width={30}
        height={30}
        color={colors.gray_500}
        />
      </span>
    </Item>
  );
}


const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  cursor: pointer;

  p {
    font-size: 16px;
    margin: 0;
  }

  span {
    display: flex;
    align-items: center;
  }
`;