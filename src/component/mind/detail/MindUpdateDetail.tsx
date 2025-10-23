"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as S from "./MindUpdateDetail.styles";
import Icon from "@/component/common/IconifyIcon";
import colors from "@/styles/Colors";
import {
  REVIEW_TAG_LABELS,
  WEATHER_LABELS,
  TravelReviewPut,
} from "@/types/travel";
import { putReview } from "@/api/travel";
import useGetReviewDetailQuery from "@/queries/travel/useGetReviewDetail";

type UpdateModalProps = {
  review_id: number;
};

export default function MindUpdateModal({ review_id }: UpdateModalProps) {
  const router = useRouter();
  const { data: detail, isLoading } = useGetReviewDetailQuery(review_id);

  const [preview, setPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, reset, watch } = useForm<TravelReviewPut>({
    defaultValues: {
      tag: [],
    },
  });
  const startDate = watch("started_at");

  // 기존 데이터 세팅
  useEffect(() => {
    if (detail) {
      reset({
        title: detail.title,
        ai_rating: detail.ai_rating,
        started_at: detail.start_date,
        finished_at: detail.end_date,
        weather: detail.weather,
        mood: detail.mood,
        note: detail.note,
        tag: detail.tags,
        song: "", 
      });
      setPreview(detail.images || []);
    }
  }, [detail, reset]);

  // 제출
  const onSubmit = async (data: TravelReviewPut) => {
    setLoading(true);
    try {
      await putReview({
        ...data,
        review_id: review_id
      });
      alert("리뷰가 수정되었습니다!");
      router.push(`/mind`);
    } catch (error) {
      console.error("❌ 리뷰 수정 실패:", error);
      alert("수정 실패");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || !detail) return <p>Loading...</p>;

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => router.back()}>
          <Icon
            icon="tdesign:chevron-left"
            width={30}
            height={30}
            color={colors.gray_500}
          />
        </S.BackButton>
        <S.Title>리뷰 수정</S.Title>
      </S.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <S.FormGroup>
          <S.Label>제목</S.Label>
          <S.Input {...register("title", { required: true })} />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>AI 추천경로 별점</S.Label>
          <S.Input
            type="number"
            {...register("ai_rating", { required: true, valueAsNumber: true })}
            min={0}
            max={5}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>날씨</S.Label>
           <S.WeatherWrap>
              {Object.entries(WEATHER_LABELS).map(([key, label]) => (
                <S.WeatherLabel key={key}>
                  <input type="radio" value={key} {...register("weather", { required: true })} />
                  <span>{label}</span>
                </S.WeatherLabel>
              ))}
            </S.WeatherWrap>
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>시작일</S.Label>
          <S.Input type="date" {...register("started_at", { required: true })} />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>종료일</S.Label>
          <S.Input   
           type="date"
            {...register("finished_at", {
              required: true,
              validate: (value) =>
              !startDate || value >= startDate || "종료일은 시작일 이후여야 합니다.",
            })}
            min={startDate || undefined}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>기분 점수</S.Label>
          <S.Input
            type="number"
            min={1}
            max={10}
            {...register("mood", { required: true, valueAsNumber: true })}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>태그</S.Label>
          <Controller
            name="tag"
            control={control}
            render={({ field }) => (
              <S.TagGrid>
                {Object.entries(REVIEW_TAG_LABELS).map(([key, label]) => (
                  <S.TagLabel key={key}>
                    <input
                      type="checkbox"
                      value={key}
                      checked={field.value.includes(key)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange([...field.value, key]);
                        } else {
                          field.onChange(field.value.filter((v) => v !== key));
                        }
                      }}
                    />
                    <span>{label}</span>
                  </S.TagLabel>
                ))}
              </S.TagGrid>
            )}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>사진 업로드</S.Label>
          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      const arr = Array.from(files);
                      field.onChange(arr);
                      setPreview(arr.map((f) => URL.createObjectURL(f)));
                    }
                  }}
                />
                {preview.length > 0 && (
                  <S.PreviewGrid>
                    {preview.map((src, idx) => (
                      <Image
                        key={idx}
                        src={src}
                        alt={`preview-${idx}`}
                        width={200}
                        height={150}
                      />
                    ))}
                  </S.PreviewGrid>
                )}
              </>
            )}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>소감</S.Label>
          <S.Textarea {...register("note", { required: true })} />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>노래</S.Label>
          <S.Input {...register("song")} />
        </S.FormGroup>

        <S.Button type="submit" disabled={loading}>
          {loading ? "수정중..." : "수정하기"}
        </S.Button>
      </form>
    </S.Container>
  );
}