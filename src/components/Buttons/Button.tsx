import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/ui-styled";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const RIPPLE_CLASS = "ripple";
const RIPPLE_DURATION = "400ms";

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  const ripple = useRef<HTMLSpanElement>(null);

  const onAnimationEnd = (e: AnimationEvent) => {
    const span = e.currentTarget as HTMLSpanElement;

    if (span) {
      span.classList.remove(RIPPLE_CLASS);
    }
  };

  useEffect(() => {
    const span = ripple.current;

    if (span) {
      span.addEventListener("animationend", onAnimationEnd, false);
    }
  }, []);

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    const span = ripple.current;
    const diameter = Math.max(buttonRect.width, buttonRect.height);

    if (onClick) {
      onClick(e);
    }

    if (span) {
      span.style.width = ripple.current.style.height = `${diameter}px`;
      span.style.top = `${e.clientY - (buttonRect.top + diameter / 2)}px`;
      span.style.left = `${e.clientX - (buttonRect.left + diameter / 2)}px`;
      span.classList.add(RIPPLE_CLASS);
    }
  };

  return (
    <Component onClick={onClickHandler} {...props}>
      <span ref={ripple} />
      {children}
    </Component>
  );
};

const Component = styled.button`
  position: relative;
  overflow: hidden;
  background: inherit;
  line-height: 1.5;
  cursor: pointer;
  border-radius: 1.5rem;
  border: 2px solid ${COLORS.border};
  padding: 0.4rem 1.8rem;

  span {
    display: block;
    position: absolute;
  }

  .ripple {
    animation: ripple ${RIPPLE_DURATION} linear;
    background: ${COLORS.accentFade};
    border-radius: 50%;
  }

  @keyframes ripple {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
