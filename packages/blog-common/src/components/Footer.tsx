/* eslint-disable @typescript-eslint/no-unused-expressions */
// TODO: Fix the following errors

"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
//@ts-ignore
import smoothScroll from "smoothscroll-polyfill";
import { OffsetTransition } from "./Motion";
import Icon from "../components/Icon";
import { useDispatch, useSelector } from "../hooks";
import { deactivateKbar } from "../store/kbar/actions";
import { selectKbar } from "../store/kbar/selectors";

const themes = ["system", "dark", "light"];
const icons = [
  <Icon key="system" name="gear" />,
  <Icon key="dark" name="moon" />,
  <Icon key="light" name="sun" />,
];
const targetThemes = ["dark", "light", "system"];

export default function Footer() {
  const dispatch = useDispatch();
  const { visible } = useSelector(selectKbar);
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    smoothScroll.polyfill();
    setMounted(true);
  }, []);

  useEffect(() => {
    // Cursor glowing effect
    if (resolvedTheme === "dark") {
      const glowingArea = document.querySelector(".glowing-area");
      const glowingDivs = document.querySelectorAll(".glowing-div");

      if (glowingArea) {
        const handler = (ev: unknown) => {
          glowingDivs.forEach((featureEl: unknown) => {
            const rect = featureEl.getBoundingClientRect();
            featureEl.style.setProperty("--x", ev.clientX - rect.left);
            featureEl.style.setProperty("--y", ev.clientY - rect.top);
          });
        };
        glowingArea.addEventListener("pointermove", handler);

        return () => {
          glowingArea.removeEventListener("pointermove", handler);
        };
      }
    }
    // Hide kbar on route change
    visible && dispatch(deactivateKbar());
  }, [resolvedTheme]);

  if (!mounted) return null;

  return (
    <footer className="mt-20 border-b border-t border-gray-200 bg-white py-4 text-center dark:bg-gray-800">
      <div className="fixed bottom-8 left-8 text-gray-500 dark:text-gray-300">
        <button
          aria-label="change theme"
          onClick={() => {
            setTheme(targetThemes[themes.indexOf(theme)]);
          }}
          className="effect-pressing flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white !p-3 text-xl tracking-wider shadow-sm hover:shadow-inner focus:outline-none  dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <span className="h-7 w-7">{icons[themes.indexOf(theme)]}</span>
        </button>
      </div>
      <div className="fixed bottom-8 right-8 text-gray-500 dark:text-gray-300">
        <OffsetTransition componentRef={backToTopRef}>
          <button
            ref={backToTopRef}
            aria-label="change theme"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="effect-pressing flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white p-3 text-xl tracking-wider opacity-0 shadow-sm hover:shadow-inner focus:outline-none  dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <span className="h-7 w-7">
              <Icon name="arrowUp" />
            </span>
          </button>
        </OffsetTransition>
      </div>
      <p className="text-4 tracking-wide text-gray-500 dark:text-gray-400">
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noreferrer"
        >
          CC BY-NC-SA 4.0
        </a>{" "}
        <span>·</span>{" "}
        <a
          href="https://github.com/mahoo12138/blog-with-next"
          target="_blank"
          rel="noreferrer"
        >
          Open Source Software
        </a>{" "}
        <span>·</span>{" "}
        <a href="https://lipeng.ac/" target="_blank" rel="noreferrer">
          Fork from ttttonyhe
        </a>
      </p>
    </footer>
  );
}
