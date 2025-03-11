"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  matchingTextColor: () => matchingTextColor,
  randomColor: () => randomColor
});
module.exports = __toCommonJS(src_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  matchingTextColor,
  randomColor
});
