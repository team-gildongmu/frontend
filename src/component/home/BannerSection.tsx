"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import styled from "styled-components";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Div } from "@/styles/BaseStyledTags";
import colors from "@/styles/Colors";

export default function BannerSection() {
  const img = [
    "/home/mainBanner1.png",
    "/home/mainBanner2.png",
    "/home/mainBanner3.png",
    "/home/mainBanner4.png",
    "/home/mainBanner5.png",
    "/home/mainBanner6.png",
  ];

  return (
    <StyledSwiperContainer width="100%" position="relative" pt="15px">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView="auto"
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        style={{
          width: "100%",
          overflow: "visible",
        }}
      >
        {img.map((item, index) => (
          <SwiperSlide key={index}>
            <Image
              src={item}
              alt={`이미지 ${index + 1}`}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSwiperContainer>
  );
}

const StyledSwiperContainer = styled(Div)`
  .swiper {
    overflow: visible;
    border-radius: 12px;
  }

  .swiper-wrapper {
    overflow: visible;
  }

  .swiper-slide {
    overflow: hidden;
    height: auto !important;
    display: block;
    width: 80% !important;
    transition: transform 0.3s ease, opacity 0.3s ease;

    &:not(.swiper-slide-active) {
      opacity: 0.7;
      transform: scale(0.9);
    }

    &.swiper-slide-active {
      opacity: 1;
      transform: scale(1);
    }
  }

  .swiper-pagination {
    bottom: 12px;

    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      background: rgba(255, 255, 255, 0.5);
      opacity: 1;
      transition: all 0.2s ease;

      &.swiper-pagination-bullet-active {
        background: ${colors.white};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
