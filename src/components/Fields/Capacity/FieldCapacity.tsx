import React from "react";
import { l10n } from "@/l10n/ru";
import { InputField, LabelField } from "@/components/Fields";
import { FormField } from "@/components/Form/FormField";
import { FieldError } from "@/components/Fields/FieldError/FieldError";
import { IFieldProps } from "@/components/Form";

export const FieldCapacity: React.FC<IFieldProps<"capacity">> = (props) => {
  return (
    <FormField>
      <LabelField htmlFor="capacity-percentage">
        {l10n.capacityLabel}
      </LabelField>
      <p>{props.value} %</p>
      <InputField
        id="capacity-percentage"
        type="range"
        max="100"
        min="0"
        step="1"
        name="capacityPercentage"
        value={props.value}
        autoComplete="off"
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <FieldError show={props.error.show} msg={props.error.msg} />
    </FormField>
  );
};
