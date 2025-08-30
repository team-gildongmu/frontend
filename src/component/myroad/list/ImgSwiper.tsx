"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import styled from "styled-components";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Div } from "@/styles/BaseStyledTags";
import colors from "@/styles/Colors";

interface ImgSwiperProps {
  img: string[];
}

export default function ImgSwiper({ img }: ImgSwiperProps) {
  return (
    <StyledSwiperContainer width="100%" position="relative">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        style={{
          width: "100%",
          overflow: "hidden",
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
                maxHeight: "270px",
                objectFit: "contain",
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
    overflow: hidden;
    border-radius: 12px;
  }

  .swiper-wrapper {
    overflow: visible;
  }

  .swiper-slide {
    overflow: hidden;
    width: 100% !important;
    max-width: 100%;
    height: auto !important;
    display: block;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 32px;
    height: 32px;
    background: ${colors.white};
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    color: ${colors.gray_500};
    font-size: 14px;
    font-weight: bold;
    border: 1px solid rgba(0, 0, 0, 0.1);

    &:after {
      font-size: 12px;
      font-weight: 900;
    }

    &:hover {
      background: ${colors.blue_500};
      color: ${colors.white};
      transform: scale(1.1);
      transition: all 0.2s ease;
    }

    &.swiper-button-disabled {
      opacity: 0.3;
      cursor: not-allowed;
      &:hover {
        background: ${colors.white};
        color: ${colors.gray_500};
        transform: none;
      }
    }
  }

  .swiper-button-next {
    right: 8px;
  }

  .swiper-button-prev {
    left: 8px;
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
