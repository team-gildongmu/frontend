import { useCallback, useMemo, useRef } from "react";
import styled from "styled-components";
import colors from "@/styles/Colors";
import { Font } from "@/styles/Typography";
import ImgSwiper from "@/component/myroad/list/ImgSwiper";
import { Grid } from "@/styles/BaseComponents";
import { Span } from "@/styles/BaseStyledTags";
import { useTranslation } from "react-i18next";

interface LocationItem {
  title: string;
  location_type?: string;
  description?: string;
  image_link?: string;
}

interface TimelinePoint {
  x: number;
  y: number;
}

interface DayRouteTimelineProps {
  locations: LocationItem[];
}

export default function DayRouteTimeline({ locations }: DayRouteTimelineProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const points = useMemo((): TimelinePoint[] => {
    const parent = containerRef.current;
    if (!parent) return [];

    const parentRect = parent.getBoundingClientRect();
    return anchorsRef.current.filter(Boolean).map((el) => {
      const rect = el!.getBoundingClientRect();
      return {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2,
      };
    });
  }, []);

  const pathD = useMemo(() => {
    if (points.length === 0) return "";

    const pathCommands = ["M", points[0].x, points[0].y];
    for (let i = 1; i < points.length; i++) {
      pathCommands.push("L", points[i].x, points[i].y);
    }

    return pathCommands.join(" ");
  }, [points]);

  const renderLocationItem = useCallback(
    (location: LocationItem, index: number) => {
      return (
        <Card
          key={`location-${index}`}
          role="article"
          aria-labelledby={`location-title-${index}`}
        >
          <Span
            ref={(el) => {
              anchorsRef.current[index] = el;
            }}
            aria-hidden="true"
            position="absolute"
            top="10px"
            left="10px"
            width="0"
            height="0"
          >
            <StationDot />
          </Span>

          <Grid
            gridTemplateColumns="auto 1fr"
            alignItems="start"
            gridGap="2px"
            pl="10px"
          >
            <Badge
              aria-label={`${index + 1}${t("myroad.timeline.locationOrder")}`}
            >
              {index + 1}
            </Badge>
            <TitleWrap>
              <Font
                id={`location-title-${index}`}
                typo="l01_bold_m"
                color="black"
                textAlign="left"
              >
                {location.title}
              </Font>
            </TitleWrap>
          </Grid>

          {location.description && (
            <Desc>
              <Font typo="c04_m" color="black" textAlign="left">
                {location.description}
              </Font>
            </Desc>
          )}

          {location.image_link && (
            <Media>
              <ImgSwiper img={[location.image_link]} />
            </Media>
          )}
        </Card>
      );
    },
    [t]
  );

  return (
    <Wrap
      ref={containerRef}
      role="main"
      aria-label={t("myroad.timeline.title")}
    >
      <SvgOverlay xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d={pathD}
          stroke={colors.blue_500}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </SvgOverlay>

      <Grid
        role="list"
        aria-label={t("myroad.timeline.locationList")}
        gridTemplateColumns="repeat(auto-fit, minmax(260px, 1fr))"
        gridGap="10px"
        alignItems="stretch"
      >
        {locations?.map(renderLocationItem)}
      </Grid>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  background: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const SvgOverlay = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.9;
`;

const Card = styled.div`
  position: relative;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 10px 10px 10px 10px;
  transition: box-shadow 0.18s ease, background-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: #fff;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`;

const StationDot = styled(Span)`
  position: absolute;
  transform: translate(-2px, -2px);
  width: 10px;
  height: 10px;
  border: 2px solid ${colors.blue_500};
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #fff;
`;

const Badge = styled(Span)`
  display: inline-grid;
  place-items: center;
  min-width: 26px;
  height: 22px;
  padding: 0 2px;
  border-radius: 10px;
  background: ${colors.blue_500};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;
`;

const TitleWrap = styled.div`
  display: inline-flex;
  gap: 2px;
  align-items: center;
  flex-wrap: wrap;
`;

const Desc = styled.div`
  margin: 2px 0 0 10px;
  color: ${colors.gray_500};
  line-height: 1.6;
`;

const Media = styled.div`
  margin-top: 2px;
  margin-left: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
