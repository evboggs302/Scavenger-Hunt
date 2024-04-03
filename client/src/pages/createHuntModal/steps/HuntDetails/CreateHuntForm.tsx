import React, { useState } from "react";
import { Alert, Button, DatePicker, Form, Input, Typography } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import { FormItem } from "react-hook-form-antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateHuntMutation } from "./useCreateHuntMutation";
import { ApolloError } from "@apollo/client";
import { useCreateHuntResolver } from "./useCreateHuntResolver";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

type CreateHuntFormInputs = {
  name: string;
  dateRange: {
    start: string;
    end: string;
  };
  recall_msg?: string;
};

type CreateHuntProps = {
  closeModal: () => void;
  nextStep: () => void;
  setHuntId: (id: string) => void;
};

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current < dayjs().endOf("day");
};

export const CreateHuntForm = ({
  closeModal,
  nextStep,
  setHuntId,
}: CreateHuntProps) => {
  const [resolver] = useCreateHuntResolver();
  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<CreateHuntFormInputs>({
    mode: "onTouched",
    resolver,
  });
  const [formErr, setFormErr] = useState<string | null>(null);
  const [createHunt, { loading }] = useCreateHuntMutation();

  const onSubmit: SubmitHandler<CreateHuntFormInputs> = async (formData) => {
    try {
      const { data } = await createHunt(formData);
      setHuntId(data?.createHunt?._id as string);
      nextStep();
      // throw new Error("try try try");
    } catch (err) {
      if (err instanceof ApolloError) {
        setFormErr(err.message);
      } else {
        setFormErr("An unknown error occurred.");
      }
      reset();
    }
  };

  const nameErrMsg = formErrors.name?.message;
  const dateRangeErrMsg = formErrors.dateRange?.message;
  const recallMsgErrMsg = formErrors.recall_msg?.message;

  return (
    <Form
      name="create-hunt"
      onFinish={handleSubmit(onSubmit)}
      autoComplete="off">
      <Title level={5}>
        Fill out the below information to create a new scavenger hunt.
      </Title>
      {formErr && (
        <Form.Item>
          <Alert
            data-testid="create-hunt-alert-message"
            message={`${formErr} Please try again later.`}
            type="error"
          />
        </Form.Item>
      )}
      <FormItem control={control} name="name" label="Hunt name" required>
        <Input
          data-testid="create-hunt-firstname"
          status={nameErrMsg ? "error" : undefined}
          placeholder={`ie. "2012 Family Reunion"`}
        />
      </FormItem>
      <FormItem control={control} name="dateRange" label="Date range" required>
        <RangePicker
          data-testid="create-hunt-start"
          minDate={dayjs()}
          disabledDate={disabledDate}
          format="YYYY-MM-DD"
          needConfirm={false}
          status={dateRangeErrMsg ? "error" : undefined}
        />
      </FormItem>
      <FormItem
        control={control}
        name="recall_msg"
        label="Recall message"
        tooltip="The message sent to teams upon completing their hunt.">
        <Input
          data-testid="create-hunt-recall"
          status={recallMsgErrMsg ? "error" : undefined}
          placeholder={`Default: "You've completed your hunt."`}
        />
      </FormItem>
      <Button key="back" onClick={closeModal}>
        Cancel
      </Button>
      <Form.Item>
        <Button
          data-testid="create-hunt-submit"
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={!isValid || loading}>
          Create hunt
        </Button>
      </Form.Item>
    </Form>
  );
};
