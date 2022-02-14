import React, { FC, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import caretDown from "@/components/FocusableSeparator/assets/caret-down-fill.svg";
import caretUp from "@/components/FocusableSeparator/assets/caret-up-fill.svg";
import { BREAKPOINTS, COLORS } from "@/styles/ui-styled";

const resizerSize = 20;

export const FocusableSeparator: FC = () => {
  const [valueNow, setValueNow] = useState(50);
  const refContainerEl = useRef<HTMLDivElement | null>(null);
  const pointerDx = useRef<number | null>(null);
  let parentY: number | null = null,
    parentH: number | null = null;

  const onPointerStart = (e: MouseEvent) => {
    const pointerY = e.clientY;

    if (!refContainerEl.current || pointerY === null) {
      return;
    }

    const resizerContainer = refContainerEl.current;
    const resizerRect = resizerContainer.getBoundingClientRect();

    pointerDx.current = pointerY - resizerRect.y;

    const parent = resizerContainer.parentElement;

    if (!parent) {
      return;
    }

    const { y, height } = parent.getBoundingClientRect();
    [parentY, parentH] = [y, height];

    parent.addEventListener("mousemove", onPointerMove);
  };

  const onPointerMove = (e: MouseEvent) => {
    e.preventDefault();
    const pointerY = e.clientY;

    if (
      parentY === null ||
      parentH === null ||
      pointerY === null ||
      !refContainerEl.current
    ) {
      return;
    }

    const resizerContainer = refContainerEl.current;
    const previousElement =
      resizerContainer.previousElementSibling as HTMLElement;
    const nextElement = resizerContainer.nextElementSibling as HTMLElement;

    if (!previousElement || !nextElement) {
      return;
    }

    const dx = pointerDx.current ? pointerDx.current : 0;
    let resizerTop: number;

    if (pointerY - dx <= parentY) {
      resizerTop = 0;
    } else if (pointerY + resizerSize - dx >= parentY + parentH) {
      resizerTop = parentY + parentH - resizerSize;
    } else {
      resizerTop = pointerY - dx;
    }

    const heightPrev = resizerTop - parentY;
    const heightNext = parentH - resizerTop - resizerSize;

    setValueNow((resizerTop / parentH) * 100);

    requestAnimationFrame(() => {
      previousElement.style.height = heightPrev + "px";
      nextElement.style.height = heightNext + "px";
    });
  };

  const onPointerEnd = () => {
    if (!refContainerEl.current) {
      return;
    }

    const resizerContainer = refContainerEl.current;
    const parent = resizerContainer.parentElement;

    if (!parent) {
      return;
    }

    parentY = null;
    parentH = null;

    parent.removeEventListener("mousemove", onPointerMove);
  };

  useEffect(() => {
    if (!refContainerEl.current) {
      return;
    }

    const resizerContainer = refContainerEl.current;

    resizerContainer.addEventListener("mousedown", onPointerStart);
    document.addEventListener("mouseup", onPointerEnd);

    return () => {
      resizerContainer.removeEventListener("mousedown", onPointerStart);
      resizerContainer.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("mouseup", onPointerEnd);
    };
  }, []);

  return (
    <StyledResizerLine
      ref={refContainerEl}
      role="separator"
      aria-valuenow={valueNow}
    >
      <img src={caretUp} alt="resizer arrow" />
      <img src={caretDown} alt="resizer arrow" />
    </StyledResizerLine>
  );
};

const StyledResizerLine = styled.div`
  width: 100%;
  height: ${resizerSize}px;
  cursor: grabbing;
  user-select: none;
  background: ${COLORS.activeCellBg};
  overflow: hidden;

  &:hover {
    opacity: 0.7;
  }

  img {
    display: block;
    box-sizing: content-box;
    width: 100%;
    height: 8px;
    background: ${COLORS.activeCellBg};
  }

  img:first-of-type {
    padding-top: 2px;
  }

  img:last-child {
    padding-bottom: 2px;
  }

  @media screen and (max-width: ${BREAKPOINTS.xl}) {
    display: none;
  }
`;
