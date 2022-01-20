import React from "react";

// Задание второго уровня 2
// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить FIXME на правильный тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = React.ComponentType extends { defaultProps?: infer T } ? T | undefined : never;

// Hint: infer
export const getDefaultProps = (
  component: React.ComponentType
): FIXME => {
  return component.defaultProps;
};
