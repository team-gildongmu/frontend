import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Icon from "@/component/common/IconifyIcon";
import { Font } from "@/styles/Typography";
import { CenterRow, Column } from "@/styles/BaseComponents";
import { StampDetectLocation } from "@/types/stamp";

interface StampDetectModalProps {
  stampLocations: StampDetectLocation[];
}

export default function StampDetectResult({
  stampLocations,
}: StampDetectModalProps) {
  const { t } = useTranslation();

  const handleStamp = (locationId: string) => {
    console.log("스탬프 찍기:", locationId);
    // TODO: 실제 스탬프 찍기 API 호출
  };

  return (
    <>
      {stampLocations.length > 0 ? (
        <StampLocationList>
          {stampLocations.map((location) => (
            <StampLocationItem key={location.id}>
              <LocationHeader>
                <LocationName typo="c04_bold_m" color="#333">
                  {location.title}
                </LocationName>
                <Distance typo="c05_m" color="#666">
                  {location.distance_km}
                  {t("stamp.detect.distance")}
                </Distance>
              </LocationHeader>
              <LocationAddress typo="c05_m" color="#666">
                위도: {location.latitude.toFixed(6)}, 경도:{" "}
                {location.longitude.toFixed(6)}
              </LocationAddress>
              <StampButton
                $isStamped={false}
                onClick={() => handleStamp(location.id.toString())}
              >
                <Icon icon="mdi:stamp" width={16} height={16} />
                {t("stamp.detect.stampButton")}
              </StampButton>
            </StampLocationItem>
          ))}
        </StampLocationList>
      ) : (
        <EmptyState>
          <Icon icon="mdi:map-marker-off" width={48} height={48} color="#ccc" />
          <Font typo="c04_m" color="#666">
            {t("stamp.detect.noLocations")}
          </Font>
          <Font typo="c05_m" color="#999">
            {t("stamp.detect.noLocationsDescription")}
          </Font>
        </EmptyState>
      )}
    </>
  );
}

const StampLocationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StampLocationItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  background: #fafafa;
  transition: all 0.2s ease;

  &:hover {
    border-color: #0047ab;
    background: #f0f7ff;
  }
`;

const LocationHeader = styled(CenterRow)`
  justify-content: space-between;
  margin-bottom: 8px;
`;

const LocationName = styled(Font)`
  font-weight: 600;
  color: #333;
`;

const Distance = styled(Font)`
  color: #666;
  font-size: 14px;
`;

const LocationAddress = styled(Font)`
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
`;

const StampButton = styled.button<{ $isStamped: boolean }>`
  background: ${({ $isStamped }) => ($isStamped ? "#4caf50" : "#0047ab")};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $isStamped }) => ($isStamped ? "#45a049" : "#003d9a")};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const EmptyState = styled(Column)`
  align-items: center;
  gap: 16px;
  padding: 40px 20px;
  text-align: center;
`;
