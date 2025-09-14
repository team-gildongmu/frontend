// Day 배지 & 원 마커
export const buildMarkerEl = (
  orderText: string,
  color: string,
  day: number
) => {
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.width = "40px";
  wrapper.style.height = "40px";
  wrapper.style.cursor = "pointer";

  // 본체 원
  const circle = document.createElement("div");
  circle.style.position = "absolute";
  circle.style.left = "5px";
  circle.style.bottom = "-5px";
  circle.style.width = "25px";
  circle.style.height = "25px";
  circle.style.borderRadius = "50%";
  circle.style.display = "flex";
  circle.style.justifyContent = "center";
  circle.style.alignItems = "center";
  circle.style.fontSize = "13px";
  circle.style.fontWeight = "bold";
  circle.style.color = "#fff";
  circle.style.background = color;
  circle.style.border = `2px solid ${color}`;
  circle.style.boxShadow = "0 2px 6px rgba(0,0,0,0.25)";
  circle.textContent = orderText;

  // Day 배지
  const badge = document.createElement("div");
  badge.style.position = "absolute";
  badge.style.right = "-10px";
  badge.style.top = "-5px";
  badge.style.padding = "2px 6px";
  badge.style.borderRadius = "8px";
  badge.style.fontSize = "10px";
  badge.style.fontWeight = "700";
  badge.style.background = "#fff";
  badge.style.border = `1px solid ${color}`;
  badge.style.color = color;
  badge.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  badge.textContent = `D${day}`;

  wrapper.appendChild(circle);
  wrapper.appendChild(badge);
  return wrapper;
};
