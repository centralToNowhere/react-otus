import React from "react";
import { Story, Meta } from "@storybook/react";
import { Form, IFormProps } from "@/components/Form";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";
import {
  FieldCapacity,
  FieldCellSize,
  FieldMaxHeight,
  FieldMaxWidth,
  FieldSpeed,
} from "@/components/Fields";
import { ButtonGameControl } from "@/components/Buttons";
import { l10n } from "@/l10n/ru";
import { maxCellsAmount } from "@/Cell/Cell";
import {
  isValidCellSizeString,
  isValidNonNegativeNumericString,
  isValidPositiveNumericString,
} from "@/utils";

export default {
  title: "Components/SettingsForm",
  component: Form,
  args: {
    fields: (
      <>
        <FieldMaxWidth
          formRawData={{
            rawCellSize: "40",
            rawMaxWidth: "600",
            rawMaxHeight: "400",
            highlight: false,
          }}
          onRawChange={() => {
            // empty function
          }}
          onChange={() => {
            // empty function
          }}
          formValidators={[isValidPositiveNumericString()]}
          error={{
            show: false,
            msg: "maxWidth error",
          }}
        />
        <FieldMaxHeight
          formRawData={{
            rawCellSize: "40",
            rawMaxWidth: "600",
            rawMaxHeight: "400",
            highlight: false,
          }}
          formValidators={[isValidPositiveNumericString()]}
          error={{
            show: false,
            msg: "maxHeight error",
          }}
          onRawChange={() => {
            // empty function
          }}
          onChange={() => {
            // empty function
          }}
        />
        <FieldCellSize
          formRawData={{
            rawCellSize: "40",
            rawMaxWidth: "600",
            rawMaxHeight: "400",
            highlight: false,
          }}
          formValidators={[isValidCellSizeString()]}
          onRawChange={() => {
            // empty
          }}
          onChange={() => {
            // empty
          }}
          error={{
            show: false,
            msg: "cellSize error",
          }}
        />
        <FieldCapacity
          formRawData={{
            rawCapacity: "40",
          }}
          formValidators={[isValidNonNegativeNumericString()]}
          onRawChange={() => {
            // empty
          }}
          onChange={() => {
            // empty
          }}
          error={{
            show: false,
            msg: "capacity error",
          }}
        />
        <FieldSpeed
          formRawData={{
            rawSpeed: "1",
          }}
          onRawChange={() => {
            // empty function
          }}
          onChange={() => {
            // empty function
          }}
          formValidators={[isValidNonNegativeNumericString()]}
          error={{
            show: false,
            msg: "speed error",
          }}
        />
      </>
    ),
    buttons: (
      <>
        <ButtonGameControl
          type={"button"}
          onClick={() => {
            // empty
          }}
          name={"startButton"}
          content={l10n.buttonStart}
          disabled={false}
        />
        <ButtonGameControl
          type={"button"}
          onClick={() => {
            // empty
          }}
          name={"stopButton"}
          content={l10n.buttonStop}
        />
        <ButtonGameControl
          type={"reset"}
          onClick={() => {
            // empty
          }}
          name={"resetButton"}
          content={l10n.buttonReset}
        />
        <ButtonGameControl
          type={"button"}
          onClick={() => {
            // empty
          }}
          name={"generateRandomButton"}
          content={l10n.buttonGenerateRandom}
        />
      </>
    ),
    error: null,
  },
} as Meta;

const Template: Story<IFormProps> = (args) => (
  <Provider store={store}>
    <Form {...args} />
  </Provider>
);

export const FormDefault = Template;

export const FormErrorNoCells = Template.bind({});
FormErrorNoCells.args = {
  fields: (
    <>
      <FieldMaxWidth
        formRawData={{
          rawCellSize: "40",
          rawMaxWidth: "10",
          rawMaxHeight: "10",
          highlight: true,
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidPositiveNumericString()]}
        error={{
          show: false,
          msg: "maxWidth error",
        }}
      />
      <FieldMaxHeight
        formRawData={{
          rawMaxWidth: "10",
          rawMaxHeight: "10",
          rawCellSize: "40",
          highlight: true,
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidPositiveNumericString()]}
        error={{
          show: false,
          msg: "maxHeight error",
        }}
      />
      <FieldCellSize
        formRawData={{
          rawMaxWidth: "10",
          rawMaxHeight: "10",
          rawCellSize: "40",
          highlight: true,
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidCellSizeString()]}
        error={{
          show: false,
          msg: "cellSize error",
        }}
      />
      <FieldCapacity
        formRawData={{
          rawCapacity: "40",
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidNonNegativeNumericString()]}
        error={{
          show: false,
          msg: "capacity error",
        }}
      />
      <FieldSpeed
        formRawData={{
          rawSpeed: "1",
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidPositiveNumericString()]}
        error={{
          show: false,
          msg: "speed error",
        }}
      />
    </>
  ),
  error: <p>{l10n.minCellsAmount}</p>,
};

export const FormErrorMaxCellsAmountExceeded = Template.bind({});
FormErrorMaxCellsAmountExceeded.args = {
  fields: (
    <>
      <FieldMaxWidth
        formRawData={{
          rawMaxWidth: "600",
          rawMaxHeight: "400",
          rawCellSize: "1",
          highlight: true,
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidPositiveNumericString()]}
        error={{
          show: false,
          msg: "maxWidth error",
        }}
      />
      <FieldMaxHeight
        formRawData={{
          rawMaxWidth: "600",
          rawMaxHeight: "400",
          rawCellSize: "1",
          highlight: true,
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidPositiveNumericString()]}
        error={{
          show: false,
          msg: "maxHeight error",
        }}
      />
      <FieldCellSize
        formRawData={{
          rawMaxWidth: "600",
          rawMaxHeight: "400",
          rawCellSize: "1",
          highlight: true,
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidCellSizeString()]}
        error={{
          show: false,
          msg: "cellSize error",
        }}
      />
      <FieldCapacity
        formRawData={{
          rawCapacity: "40",
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidNonNegativeNumericString()]}
        error={{
          show: false,
          msg: "capacity error",
        }}
      />
      <FieldSpeed
        formRawData={{
          rawSpeed: "1",
        }}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
        formValidators={[isValidPositiveNumericString()]}
        error={{
          show: false,
          msg: "speed error",
        }}
      />
    </>
  ),
  error: <p>{`${l10n.maxCellsAmount} (${maxCellsAmount}).`}</p>,
};
