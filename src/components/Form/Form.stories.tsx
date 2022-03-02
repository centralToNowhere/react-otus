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

export default {
  title: "Components/SettingsForm",
  component: Form,
  args: {
    fields: (
      <>
        <FieldMaxWidth
          formRawData={{
            rawMaxWidth: "600",
            rawMaxHeight: "400",
            rawCellSize: "40",
            highlight: false,
          }}
          formValidator={() => true}
          onRawChange={() => {
            // empty function
          }}
          onChange={() => {
            // empty function
          }}
        />
        <FieldMaxHeight
          formRawData={{
            rawMaxWidth: "600",
            rawMaxHeight: "400",
            rawCellSize: "40",
            highlight: false,
          }}
          formValidator={() => true}
          onRawChange={() => {
            // empty function
          }}
          onChange={() => {
            // empty function
          }}
        />
        <FieldCellSize
          formRawData={{
            rawMaxWidth: "600",
            rawMaxHeight: "400",
            rawCellSize: "40",
            highlight: false,
          }}
          formValidator={() => true}
          onRawChange={() => {
            // empty function
          }}
          onChange={() => {
            // empty function
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
          rawMaxWidth: "10",
          rawMaxHeight: "10",
          rawCellSize: "40",
          highlight: true,
        }}
        formValidator={() => true}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
      />
      <FieldMaxHeight
        formRawData={{
          rawMaxWidth: "10",
          rawMaxHeight: "10",
          rawCellSize: "40",
          highlight: true,
        }}
        formValidator={() => true}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
      />
      <FieldCellSize
        formRawData={{
          rawMaxWidth: "10",
          rawMaxHeight: "10",
          rawCellSize: "40",
          highlight: true,
        }}
        formValidator={() => true}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
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
        formValidator={() => true}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
      />
      <FieldMaxHeight
        formRawData={{
          rawMaxWidth: "600",
          rawMaxHeight: "400",
          rawCellSize: "1",
          highlight: true,
        }}
        formValidator={() => true}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
        }}
      />
      <FieldCellSize
        formRawData={{
          rawMaxWidth: "600",
          rawMaxHeight: "400",
          rawCellSize: "1",
          highlight: true,
        }}
        formValidator={() => true}
        onRawChange={() => {
          // empty function
        }}
        onChange={() => {
          // empty function
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
      />
    </>
  ),
  error: <p>{`${l10n.maxCellsAmount} (${maxCellsAmount}).`}</p>,
};
