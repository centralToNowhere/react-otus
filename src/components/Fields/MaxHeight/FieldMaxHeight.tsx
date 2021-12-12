import React from "react";
import { l10n } from "@/l10n/ru";
import { InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { InputPatterns } from "@/components/Fields";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { IFieldProps } from "@/components/Form";

export const FieldMaxHeight: React.FC<IFieldProps<"fieldHeight">> = (
  props: IFieldProps<"fieldHeight">
) => {
  return (
    <>
      <FormField>
        <LabelField htmlFor="field-height">{l10n.maxHeightLabel}</LabelField>
        <InputField
          id="field-height"
          type="number"
          pattern={InputPatterns.float}
          step="1"
          name="fieldHeight"
          value={props.value}
          autoComplete="off"
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <FieldError show={props.error.show} msg={props.error.msg} />
      </FormField>
    </>
  );
};
