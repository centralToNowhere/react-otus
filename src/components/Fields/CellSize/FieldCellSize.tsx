import React from "react";
import { l10n } from "@/l10n/ru";
import { InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { InputPatterns } from "@/components/Fields";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { IFieldProps } from "@/components/Form";

export const FieldCellSize: React.FC<IFieldProps<"cellSize">> = (props) => {
  return (
    <FormField>
      <LabelField htmlFor="cell-size">{l10n.cellSizeLabel}</LabelField>
      <InputField
        id="cell-size"
        type="number"
        pattern={InputPatterns.number}
        step="1"
        name="cellSize"
        value={props.value}
        autoComplete="off"
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <FieldError show={props.error.show} msg={props.error.msg} />
    </FormField>
  );
};
