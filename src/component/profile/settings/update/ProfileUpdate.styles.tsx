import { Config } from "@/styles/FontVariants";
import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 20px 24px;
`;

export const AvatarButton = styled.button`
  width: 88px;
  height: 88px;
  border-radius: 14px;
  background: #e5e7eb;
  border: none;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const CameraOverlay = styled.div`
  position: absolute;
  right: 4px;
  bottom: 4px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 10px;
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SmallLabel = styled.div`
  font: ${Config.variants.t02_m}
  color: #666;
  margin-bottom: 5px;
`;

export const CommentInput = styled.input`
  width: 100%;
  border-radius: 10px;
  background: #f0fff4;
  padding: 10px 12px;
  border: none;
  font-size: 14px;
  color: #333;
`;