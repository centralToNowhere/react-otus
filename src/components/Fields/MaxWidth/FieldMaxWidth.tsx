import React from "react";
import { l10n } from "@/l10n/ru";
import { InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { InputPatterns } from "@/components/Fields";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { IFieldProps } from "@/components/Form";

export const FieldMaxWidth: React.FC<IFieldProps<"fieldWidth">> = (props) => {
  return (
    <FormField>
      <LabelField htmlFor="field-width">{l10n.maxWidthLabel}</LabelField>
      <InputField
        id="field-width"
        type="number"
        pattern={InputPatterns.float}
        step="1"
        name="fieldWidth"
        autoFocus={true}
        value={props.value}
        autoComplete="off"
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <FieldError show={props.error.show} msg={props.error.msg} />
    </FormField>
  );
};
