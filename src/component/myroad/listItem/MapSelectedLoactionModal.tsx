import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Modal from "@/component/common/Modal";

interface Location {
  id: number;
  lat: number;
  lng: number;
  title: string;
  description: string;
  image: string;
}

export default function MapSelectedLoactionModal({
  selectedLocation,
  setSelectedLocation,
}: {
  selectedLocation: Location;
  setSelectedLocation: (location: Location | null) => void;
}) {
  return (
    <Modal
      isOpen={!!selectedLocation}
      onClose={() => setSelectedLocation(null)}
      title={selectedLocation.title}
      width="90%"
      height="auto"
      maxWidth="500px"
    >
      <DetailWrapper>
        <Image
          src={selectedLocation.image}
          alt={selectedLocation.title}
          width={500}
          height={300}
          style={{ width: "100%", height: "auto" }}
        />
        <h3>{selectedLocation.title}</h3>
        <p>{selectedLocation.description}</p>
      </DetailWrapper>
    </Modal>
  );
}

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  img {
    width: 100%;
    border-radius: 8px;
  }
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  p {
    white-space: pre-line;
    color: #555;
  }
`;
