"use client";

import styled from "styled-components";
import colors from "@/styles/Colors";
import { Config } from "@/styles/FontVariants";

export const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  font: ${Config.variants.t01_m};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  label {
    font-size: 14px;
    margin-bottom: 6px;
    color: ${colors.gray_500};
  }
`;

export const Label = styled.label`
    font: ${Config.variants.t01_bold_m};
    color: ${colors.black};
`

export const Input = styled.input`
  border: 1px solid ${colors.gray_300};
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
`;

export const Textarea = styled.textarea`
  border: 1px solid ${colors.gray_300};
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  background-color: ${({ disabled }) =>
    disabled ? colors.gray_300 : colors.blue_500};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

export const Tag = styled.span`
  background: ${colors.blue_300};
  color: ${colors.blue_500};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

export const FilePreview = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: ${colors.gray_500};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
`;

export const TagLabel = styled.label`
  display: block;
  width: 100%;
  cursor: pointer;
  user-select: none;

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  span {
    display: block;
    width: 100%;
    padding: 0.5rem .5rem;
    border-radius: 10px;
    border: 1px solid ${colors.gray_200 ?? "#e6e6e6"};
    background: ${colors.white ?? "#fff"};
    text-align: center;
    font-size: 14px;
    color: ${colors.gray_500 ?? "#222"};
  }

  input[type="checkbox"]:checked + span {
    background: ${colors.blue_500 ?? "#007bff"};
    color: ${colors.white ?? "#fff"};
    border-color: ${colors.blue_500 ?? "#007bff"};
    transform: translateY(-1px);
  }
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const WeatherWrap = styled.div`
  display: flex;
  gap: .5rem;
  margin: 1rem 0;
`;

export const WeatherLabel = styled.label`
  display: block;
  cursor: pointer;
  user-select: none;

  input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  span {
    display: block;
    padding: .5rem .5rem;
    border-radius: 10px;
    border: 1px solid ${colors.gray_200 ?? "#e6e6e6"};
    background: ${colors.white ?? "#fff"};
    font-size: 14px;
    text-align: center;
    color: ${colors.gray_500 ?? "#222"};
    transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease, transform 120ms ease;
  }

  input[type="radio"]:checked + span {
    background: ${colors.blue_500 ?? "#007bff"};
    color: ${colors.white ?? "#fff"};
    border-color: ${colors.blue_500 ?? "#007bff"};
    transform: translateY(-1px);
  }

  input[type="radio"]:focus + span {
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.12);
  }
`;