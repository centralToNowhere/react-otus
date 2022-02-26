import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BREAKPOINTS, COLORS } from "@/styles/ui-styled";

const resizerSize = 30;

export const FocusableSeparator: FC = () => {
  const [valueNow, setValueNow] = useState(50);
  const refContainerEl = React.useRef<HTMLDivElement | null>(null);
  const pointerDx = React.useRef<number | null>(null);

  useEffect(() => {
    let parentY: number | null = null,
      parentH: number | null = null;

    const onPointerStart = (e: MouseEvent) => {
      const pointerY = e.clientY;

      if (!refContainerEl.current) {
        return;
      }

      const resizerContainer = refContainerEl.current;
      const resizerRect = resizerContainer.getBoundingClientRect();

      pointerDx.current = pointerY - resizerRect.y;

      const parent = resizerContainer.parentElement as HTMLDivElement;

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
      const valueNow = Math.round((resizerTop / (parentH - resizerSize)) * 100);

      setValueNow(valueNow);

      previousElement.setAttribute("data-testh", String(valueNow));
      previousElement.style.height = heightPrev + "px";
      nextElement.setAttribute("data-testh", String(100 - valueNow));
      nextElement.style.height = heightNext + "px";
    };

    const onPointerEnd = () => {
      if (!refContainerEl.current) {
        return;
      }

      const resizerContainer = refContainerEl.current;
      const parent = resizerContainer.parentElement as HTMLDivElement;

      parentY = null;
      parentH = null;

      parent.removeEventListener("mousemove", onPointerMove);
    };

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
      <div className={"handle-icon"} />
    </StyledResizerLine>
  );
};

const StyledResizerLine = styled.div`
  width: 100%;
  height: ${resizerSize}px;
  cursor: grabbing;
  user-select: none;
  overflow: hidden;
  border-top: 2px solid ${COLORS.border};

  &:hover {
    opacity: 0.7;
  }

  .handle-icon {
    display: block;
    background: ${COLORS.border};
    width: 50px;
    margin: 10px auto 0 auto;
    height: 6px;
    border-radius: 10px;
  }

  @media screen and (max-width: ${BREAKPOINTS.xl}) {
    display: none;
  }
`;
