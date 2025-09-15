import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Icon from "@/component/common/IconifyIcon";
import { Font } from "@/styles/Typography";
import { CenterRow, Column } from "@/styles/BaseComponents";
import LoadingSpinner from "@/component/common/LoadingSpinner";
import Modal from "@/component/common/Modal";
import useGetDetectedStampsMutation from "@/queries/stamps/useGetDetectedStampsMutation";
import useUserLocation from "@/hooks/useUserLocation";
import { StampDetectLocation } from "@/types/stamp";
import StampDetectResult from "./StampDetectResult";
import { Button } from "@/styles/BaseStyledTags";
import colors from "@/styles/Colors";

interface StampDetectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StampDetectModal({
  isOpen,
  onClose,
}: StampDetectModalProps) {
  const { t } = useTranslation();
  const { location } = useUserLocation();
  const [stampLocations, setStampLocations] = useState<StampDetectLocation[]>(
    []
  );
  const [hasSearched, setHasSearched] = useState(false);

  const { mutate: searchMutation, isPending: isSearching } =
    useGetDetectedStampsMutation();

  const handleClose = () => {
    setStampLocations([]);
    setHasSearched(false);
    onClose();
  };

  const handleSearch = () => {
    if (location?.lat && location?.lng) {
      searchMutation(
        { latitude: location.lat, longitude: location.lng },
        {
          onSuccess: (response) => {
            console.log("API 응답:", response);
            setStampLocations(response.stamps || response);
            setHasSearched(true);
          },
          onError: (error) => {
            console.error("스탬프 검색 실패:", error);
          },
        }
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t("stamp.detect.modalTitle")}
      maxWidth="500px"
      height="auto"
      maxHeight="80dvh"
    >
      <Column gridGap="25px" mb="24px">
        <Font typo="c04_m" color="gray_300">
          {t("stamp.detect.description")}
        </Font>
        <SearchButton onClick={handleSearch} disabled={isSearching}>
          {isSearching ? (
            <LoadingSpinner />
          ) : (
            <CenterRow gridGap="8px">
              <Icon
                icon="mdi:map-search"
                color="white"
                width={20}
                height={20}
              />
              <Font typo="l01_m" color="white">
                {t("stamp.detect.searchButton")}
              </Font>
            </CenterRow>
          )}
        </SearchButton>
      </Column>

      {hasSearched && <StampDetectResult stampLocations={stampLocations} />}
    </Modal>
  );
}

const SearchButton = styled(Button)`
  background: ${colors.blue_500};
  border-radius: 12px;
  padding: 16px 24px;

  &:disabled {
    background: ${colors.gray_200};
    cursor: not-allowed;
  }
`;
