"use client";

import colors from "@/styles/Colors";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function PlusButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/mind/create"); // 이동할 페이지 경로
  };

  return <FloatingButton onClick={handleClick}>+</FloatingButton>;
}

const FloatingButton = styled.button`
  position: fixed;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${colors.blue_300};
  color: white;
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
 
  &:hover {
    background-color: ${colors.blue_500};
  }
`;