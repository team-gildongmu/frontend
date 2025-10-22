"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import * as C from "./MindCreateModal.styles"
import Icon from "@/component/common/IconifyIcon";
import colors from "@/styles/Colors";
import { REVIEW_TAG_LABELS, TravelReviewPost, WEATHER_LABELS } from "@/types/travel";
import { postReview } from "@/api/travel";

type CreateModalProps = {
  travel_log_id: number;
};

export default function CreateModal({ travel_log_id }: CreateModalProps) {
  // TODO: 나중에 작업
  console.log("travel_log_id === 나중에 작업", travel_log_id)
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = 8;
  const progress = ((step + 1) / totalSteps) * 100;

  const { register, handleSubmit, control, watch } = useForm<TravelReviewPost>({
    defaultValues: {
      tag: [],
    },
  });

  // 시작일자 선택 값
  const startDate = watch("started_at");
  const onSubmit = async (data: TravelReviewPost) => {
    setLoading(true);
    try {
      await postReview({
        ...data,
        travel_log_id: 1,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("❌ 리뷰 등록 실패:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <C.Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <C.StepBody>
          {/* Step 0 */}
          {step === 0 && (
            <>
              <C.Title>이번 여행의 제목을 작성해주세요!</C.Title>
              <C.Input {...register("title", { required: true })} placeholder="예: 제주도 힐링 여행기" />
            </>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <>
              <C.Title>AI 추천 경로는 만족하셨나요 ?</C.Title>
              <C.Description>별점을 선택해주세요</C.Description>
              <Controller
                name="ai_rating"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <C.Stars>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <C.StarButton
                        type="button"
                        key={star}
                        selected={field.value >= star}
                        onClick={() => field.onChange(star)}
                      >
                        ★
                      </C.StarButton>
                    ))}
                  </C.Stars>
                )}
              />
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <C.Title>여행 동안 날씨는 어땠나요?</C.Title>
              <C.Description>날씨와 여행일정을 입력해주세요</C.Description>
              <C.WeatherWrap>
                {Object.entries(WEATHER_LABELS).map(([key, label]) => (
                  <C.WeatherLabel key={key}>
                    <input type="radio" value={key} {...register("weather", { required: true })} />
                    <span>{label}</span>
                  </C.WeatherLabel>
                ))}
              </C.WeatherWrap>
              <C.DateWrap>
                <C.Flex>
                  <C.DateText>여행 시작일자 </C.DateText>
                  <C.Input type="date" {...register("started_at", { required: true })} />
                </C.Flex>
                <C.Flex>
                  <C.DateText>여행 종료일자 </C.DateText>
                  <C.Input
                    type="date"
                    {...register("finished_at", {
                      required: true,
                      validate: (value) =>
                        !startDate || value >= startDate || "종료일은 시작일 이후여야 합니다.",
                    })}
                    min={startDate || undefined}
                  />
                </C.Flex>
              </C.DateWrap>
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              <C.Title>여행 기분 지수는 몇 점인가요?</C.Title>
              <C.Description>기분 좋은 일이 있었나요?</C.Description>
              <Controller
                name="mood"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={field.value || 1}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
              <p> / 10</p>
            </>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <>
              <C.Title>여행은 어떠셨나요?</C.Title>
              <C.Description>태그를 선택해주세요</C.Description>
              <Controller
                name="tag"
                control={control}
                render={({ field }) => (
                  <C.TagGrid>
                    {Object.entries(REVIEW_TAG_LABELS).map(([key, label]) => (
                      <C.TagLabel key={key}>
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
                      </C.TagLabel>
                    ))}
                  </C.TagGrid>
                )}
              />
            </>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <>
              <C.Title>여행을 사진으로 추억하세요!</C.Title>
              <Controller // 리액트 훅 폼 컨트롤러로 마이그레이션
                name="picture"
                control={control}
                render={({field}) => (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          const arr = Array.from(files);
                          field.onChange(arr);      // 훅 폼으로 파일 저장
                          setPreview(arr.map((f) => URL.createObjectURL(f))); // 미리보기 처리
                        }
                      }}
                    />
                    {preview.length > 0 && (
                      <C.PreviewGrid>
                        {preview.map((src, idx) => (
                          <Image key={idx} src={src} alt={`preview-${idx}`} width={200} height={150} />
                        ))}
                      </C.PreviewGrid>
                    )}
                  </>
                )}
              />
            </>
          )}

          {/* Step 6 */}
          {step === 6 && (
            <>
              <C.Title>여행 동안 느낀점을 작성해주세요!</C.Title>
              <C.Textarea {...register("note", { required: true })} placeholder="후기를 작성해주세요" />
            </>
          )}

          {/* Step 7 */}
          {step === 7 && (
            <>
              <C.Title>노래를 선택해 주세요!</C.Title>
              <C.Description>이번 여행의 무드를 선정해보세요!</C.Description>
              <C.Input {...register("song", { required: true })} placeholder="노래 제목을 입력하거나 추천받기" />
            </>
          )}

          {/* Step 8 */}
          {step === 8 && (
            <C.Complete>
              {submitted ? (
                <C.Submit>🎉 후기가 성공적으로 제출되었습니다!</C.Submit>
              ) : (
                <C.Submit>제출 버튼을 눌러주세요.</C.Submit>
              )}
            </C.Complete>
          )}
        </C.StepBody>

        {/* Navigation */}
        <C.Nav>
          {step > 0 && (
            <C.LButton type="button" onClick={prevStep}>
              <Icon icon="tdesign:chevron-left" width="16" height="16" color={colors.blue_500} />
            </C.LButton>
          )}
          {step < 8 ? (
            <C.Button type="button" onClick={() => setStep((s) => Math.min(s + 1, 8))}>
              다음
            </C.Button>
          ) : (
            <C.Button type="submit" disabled={loading}>
              {loading ? "제출중..." : "제출하기"}
            </C.Button>
          )}
        </C.Nav>
      </form>

      {/* Progress Bar */}
      <C.ProgressBarWrap>
        <C.ProgressFill percent={progress} />
      </C.ProgressBarWrap>
    </C.Container>
  );
}