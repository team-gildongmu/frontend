import React from "react";
import Image from "next/image";
import Modal from "@/component/common/Modal";
import { Font } from "@/styles/Typography";
import { Column } from "@/styles/BaseComponents";

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
      title={selectedLocation?.title}
      width="90%"
      height="auto"
      maxWidth="500px"
    >
      <Column gridGap="12px" width="100%">
        {selectedLocation?.image && (
          <Image
            src={selectedLocation.image}
            alt={selectedLocation?.title}
            width={500}
            height={300}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        )}

        <Font typo="l01_m" color="grey_500">
          {selectedLocation?.description}
        </Font>
      </Column>
    </Modal>
  );
}
