export function isTouchDevice(): boolean {
  return (
    "ontouchstart" in window ||
    window.navigator.maxTouchPoints > 0 ||
    (
      window.navigator as Navigator & {
        msMaxTouchPoints: number;
      }
    ).msMaxTouchPoints > 0
  );
}
