import React from "react";
import { l10n } from "@/l10n/ru";
import { InputPatterns } from "@/components/Fields";
import { InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { IFieldProps } from "@/components/Form";

export const FieldSpeed: React.FC<IFieldProps<"speed">> = (
  props: IFieldProps<"speed">
) => {
  return (
    <>
      <FormField>
        <LabelField htmlFor="speed-change">{l10n.speedLabel}</LabelField>
        <InputField
          id="speed-change"
          type="number"
          pattern={InputPatterns.float}
          step="0.1"
          name="speedChange"
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
