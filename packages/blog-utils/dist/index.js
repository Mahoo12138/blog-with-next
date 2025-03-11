// src/index.ts
function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function matchingTextColor(color) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1e3;
  return yiq >= 128 ? "#000" : "#fff";
}
export {
  matchingTextColor,
  randomColor
};
