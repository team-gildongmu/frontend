"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import * as C from "./MindCreateModal.styles"

type FormValues = {
  title: string;
  satisfaction: number;
  weather: string;
  startDate: string;
  endDate: string;
  mood: number;
  tags: string[];
  photo: FileList | null;
  review: string;
  song: string;
};

const weatherOptions = [
  { label: "☀️ 맑음", value: "sunny" },
  { label: "☁️ 흐림", value: "cloudy" },
  { label: "🌧 비", value: "rainy" },
  { label: "❄️ 눈", value: "snow" },
];

const tags = [
  "힐링", "맛집", "액티비티", "문화", "바다",
  "산", "도시", "쇼핑", "역사", "휴양"
];

export default function CreateModal() {
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      satisfaction: 3,
      mood: 5,
      tags: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "photo" && value instanceof FileList) {
          formData.append("photo", value[0]);
        } else if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, v));
        } else {
          formData.append(key, value as any);
        }
      });

      const res = await fetch("/api/travel", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("서버 에러");
      setSubmitted(true);
    } catch (err) {
      alert("제출에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 8));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <C.Container>
      <C.Stepper>
        {[
          "시작","만족도","날씨/일정","기분지수",
          "태그","사진","느낀점","노래","완료"
        ].map((label, idx) => (
          <C.Step key={idx} active={idx === step}>
            {label}
          </C.Step>
        ))}
      </C.Stepper>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <C.StepBody>
          {/* Step 0 */}
          {step === 0 && (
            <>
              <C.Title>여행 제목</C.Title>
              <C.Input {...register("title", { required: true })} placeholder="예: 제주도 힐링 여행기" />
            </>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <>
              <C.Title>AI 추천 경로 만족도</C.Title>
              <Controller
                name="satisfaction"
                control={control}
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
              <C.Title>여행 날씨와 일정</C.Title>
              <C.WeatherWrap>
                {weatherOptions.map((opt) => (
                  <label key={opt.value}>
                    <input
                      type="radio"
                      value={opt.value}
                      {...register("weather", { required: true })}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </C.WeatherWrap>
              <C.Flex>
                <C.Input type="date" {...register("startDate")} />
                <C.Input type="date" {...register("endDate")} />
              </C.Flex>
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              <C.Title>여행 기분 지수</C.Title>
              <Controller
                name="mood"
                control={control}
                render={({ field }) => (
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
              <p>{watch("mood")} / 10</p>
            </>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <>
              <C.Title>여행 태그 선택</C.Title>
              <C.TagGrid>
                {tags.map((tag) => (
                  <label key={tag}>
                    <input type="checkbox" value={tag} {...register("tags")} />
                    <span>{tag}</span>
                  </label>
                ))}
              </C.TagGrid>
            </>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <>
              <C.Title>여행 사진 업로드</C.Title>
              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                    setValue("photo", e.target.files);
                  }
                }}
              />
              {preview && (
                <Image src={preview} alt="preview" width={300} height={200} />
              )}
            </>
          )}

          {/* Step 6 */}
          {step === 6 && (
            <>
              <C.Title>여행 동안 느낀점</C.Title>
              <C.Textarea {...register("review", { required: true })} placeholder="후기를 작성해주세요" />
            </>
          )}

          {/* Step 7 */}
          {step === 7 && (
            <>
              <C.Title>여행 무드 노래</C.Title>
              <C.Input {...register("song")} placeholder="노래 제목을 입력하거나 추천받기" />
            </>
          )}

          {/* Step 8 */}
          {step === 8 && (
            <C.Complete>
              {submitted ? (
                <p>🎉 후기가 성공적으로 제출되었습니다!</p>
              ) : (
                <p>제출 버튼을 눌러주세요.</p>
              )}
            </C.Complete>
          )}
        </C.StepBody>

        {/* Navigation */}
        <C.Nav>
          {step > 0 && <C.Button type="button" onClick={prevStep}>이전</C.Button>}
          {step < 8 ? (
            <C.Button type="button" onClick={nextStep}>다음</C.Button>
          ) : (
            <C.Button type="submit" disabled={loading}>
              {loading ? "제출중..." : "제출하기"}
            </C.Button>
          )}
        </C.Nav>
      </form>
    </C.Container>
  );
}
